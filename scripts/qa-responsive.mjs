import { chromium } from 'playwright';

const base='http://127.0.0.1:4173';
const widths=[320,375,390,430,768,1440];
const routes=['/','/work/','/work/portal-v2/','/work/adaptive-brand-system/','/work/spatial-interface-study/','/services/','/studio/','/contact/','/privacy/','/404.html'];
const failures=[];
const pass=(label,condition,detail='')=>{
  console.log(`${condition?'PASS':'FAIL'}  ${label}${detail?` — ${detail}`:''}`);
  if(!condition) failures.push(label+(detail?`: ${detail}`:''));
};

const browser=await chromium.launch({headless:true});
try{
  for(const width of widths){
    const context=await browser.newContext({viewport:{width,height:900}});
    const page=await context.newPage();
    const runtimeErrors=[];
    page.on('pageerror',error=>runtimeErrors.push(error.message));
    page.on('console',msg=>{if(msg.type()==='error')runtimeErrors.push(msg.text());});

    for(const route of routes){
      runtimeErrors.length=0;
      const response=await page.goto(base+route,{waitUntil:'networkidle'});
      pass(`${width}px ${route}: HTTP response`,Boolean(response&&response.status()<400),response?String(response.status()):'no response');
      const metrics=await page.evaluate(()=>({
        innerWidth,
        clientWidth:document.documentElement.clientWidth,
        scrollWidth:Math.max(document.documentElement.scrollWidth,document.body?.scrollWidth||0),
        mainText:(document.querySelector('main')?.innerText||'').trim().length,
        brokenImages:[...document.images].filter(img=>img.complete&&img.naturalWidth===0).map(img=>img.getAttribute('src')),
      }));
      pass(`${width}px ${route}: exact viewport`,metrics.innerWidth===width,`innerWidth=${metrics.innerWidth}`);
      pass(`${width}px ${route}: no horizontal overflow`,metrics.scrollWidth<=metrics.clientWidth+1,`${metrics.scrollWidth}/${metrics.clientWidth}`);
      pass(`${width}px ${route}: main content present`,metrics.mainText>40,`chars=${metrics.mainText}`);
      pass(`${width}px ${route}: images load`,metrics.brokenImages.length===0,metrics.brokenImages.join(', '));

      const headings=page.locator('h1,h2,h3:visible');
      const headingCount=await headings.count();
      const clippedHeadings=[];
      for(let i=0;i<headingCount;i++){
        const el=headings.nth(i);
        const box=await el.boundingBox();
        if(box&&(box.x<-2||box.x+box.width>width+2))clippedHeadings.push((await el.innerText()).trim().replace(/\s+/g,' ').slice(0,90));
      }
      pass(`${width}px ${route}: headings fit viewport`,clippedHeadings.length===0,clippedHeadings.join(' | '));

      if(width<=840){
        const trigger=page.locator('[data-menu-trigger]');
        const menu=page.locator('[data-mobile-menu]');
        pass(`${width}px ${route}: mobile menu trigger visible`,await trigger.isVisible().catch(()=>false));
        const triggerBox=await trigger.boundingBox().catch(()=>null);
        pass(`${width}px ${route}: mobile trigger touch target`,Boolean(triggerBox&&triggerBox.width>=44&&triggerBox.height>=44),triggerBox?`${Math.round(triggerBox.width)}x${Math.round(triggerBox.height)}`:'missing');
        if(await trigger.isVisible().catch(()=>false)){
          await trigger.click();
          pass(`${width}px ${route}: mobile menu opens`,await trigger.getAttribute('aria-expanded')==='true'&&await menu.isVisible().catch(()=>false));
          await page.keyboard.press('Escape');
          pass(`${width}px ${route}: Escape closes menu`,await trigger.getAttribute('aria-expanded')==='false'&&!(await menu.isVisible().catch(()=>true)));
        }
      }else{
        pass(`${width}px ${route}: desktop nav visible`,await page.locator('.primary-nav').isVisible().catch(()=>false));
      }

      if(route==='/contact/'){
        const controls=page.locator('input:visible,select:visible,textarea:visible,button:visible');
        const count=await controls.count();
        let clipped=0;
        for(let i=0;i<count;i++){
          const box=await controls.nth(i).boundingBox();
          if(box&&(box.x<-2||box.x+box.width>width+2))clipped++;
        }
        pass(`${width}px contact: form controls fit`,clipped===0,`clipped=${clipped}`);
      }

      pass(`${width}px ${route}: no runtime errors`,runtimeErrors.length===0,runtimeErrors.join(' | '));
    }

    await page.goto(base+'/',{waitUntil:'networkidle'});
    await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
    const reveals=page.locator('[data-reveal]');
    const revealCount=await reveals.count();
    for(let i=0;i<revealCount;i++){
      await reveals.nth(i).evaluate((el)=>{
        const rect=el.getBoundingClientRect();
        const target=Math.max(0,window.scrollY+rect.top-(window.innerHeight-rect.height)/2);
        window.scrollTo(0,target);
      });
      await page.waitForTimeout(140);
    }
    const hiddenReveal=await page.evaluate(()=>[...document.querySelectorAll('[data-reveal]')].filter(el=>getComputedStyle(el).opacity==='0').map(el=>(el.textContent||'').trim().replace(/\s+/g,' ').slice(0,70)));
    pass(`${width}px home: scroll reveals complete`,hiddenReveal.length===0,hiddenReveal.join(' | '));

    if(width===390){
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.reload({waitUntil:'networkidle'});
      const reducedHidden=await page.evaluate(()=>[...document.querySelectorAll('[data-reveal]')].filter(el=>getComputedStyle(el).opacity==='0').length);
      pass('390px home: reduced motion keeps content visible',reducedHidden===0,`hidden=${reducedHidden}`);
      await page.emulateMedia({reducedMotion:'no-preference'});

      await page.goto(base+'/contact/',{waitUntil:'networkidle'});
      await page.fill('#name','QA User');
      await page.fill('#email','qa@example.com');
      await page.selectOption('#project',{label:'Flagship website'});
      await page.fill('#change','Responsive release QA only. Do not send externally.');
      await page.selectOption('#budget',{label:'€25k–€50k'});
      await page.selectOption('#timing',{label:'Within 1–2 months'});
      await page.locator('button[type="submit"]').click();
      const status=(await page.locator('[data-form-status]').innerText()).toLowerCase();
      pass('390px contact: preview submit is honest',status.includes('not connected')&&status.includes('not sent'),status);
    }

    await context.close();
  }
}finally{
  await browser.close();
}

if(failures.length){
  console.error(`\n${failures.length} responsive browser gate(s) failed.`);
  for(const failure of failures)console.error(`- ${failure}`);
  process.exit(1);
}
console.log('\nAll exact responsive browser QA gates pass.');
