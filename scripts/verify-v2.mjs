import fs from 'node:fs';
import path from 'node:path';

const root='site';
const failures=[];
const pass=(label,condition,detail='')=>{
  if(!condition) failures.push(label+(detail?`: ${detail}`:''));
  console.log(`${condition?'PASS':'FAIL'}  ${label}${detail?` — ${detail}`:''}`);
};
const exists=file=>fs.existsSync(path.join(root,file));
const read=file=>exists(file)?fs.readFileSync(path.join(root,file),'utf8'):'';

const requiredRoutes=['index.html','work.html','work/atelier.html','work/signal.html','services.html','studio.html','contact.html','404.html'];
const supportFiles=['assets/studio-v2.css','assets/studio-v2.js','robots.txt','sitemap.xml','site.webmanifest'];
for(const file of requiredRoutes) pass(`required route exists: ${file}`,exists(file));
for(const file of supportFiles) pass(`support file exists: ${file}`,exists(file));

const home=read('index.html');
const work=read('work.html');
const atelier=read('work/atelier.html');
const signal=read('work/signal.html');
const services=read('services.html');
const studio=read('studio.html');
const contact=read('contact.html');
const error404=read('404.html');
const robots=read('robots.txt');
const sitemap=read('sitemap.xml');
const sharedJs=read('assets/studio-v2.js');

const routeLinks=['/work.html','/services.html','/studio.html','/contact.html'];
for(const href of routeLinks) pass(`homepage primary route linked: ${href}`,home.includes(`href="${href}"`));
pass('homepage selected work deep-links to a case',home.includes('href="/work/atelier.html"')||home.includes('href="/work/signal.html"'));
pass('homepage keeps preview noindex',/name="robots"\s+content="noindex,nofollow"/i.test(home));
pass('homepage keeps shared 60 percent trigger',home.includes('window.__kwinMotion={trigger:.60'));
pass('homepage keeps one global scroll listener',(home.match(/addEventListener\(['"]scroll['"]/g)||[]).length===1);
pass('homepage keeps one global resize listener',(home.match(/addEventListener\(['"]resize['"]/g)||[]).length===1);
pass('homepage keeps reduced motion support',home.includes('prefers-reduced-motion'));

pass('work page is editorial project index',/Selected work|Work index|Selected projects/i.test(work));
pass('work page labels concept work transparently',/concept|self-initiated/i.test(work));
pass('work page links atelier case',work.includes('/work/atelier.html'));
pass('work page links signal case',work.includes('/work/signal.html'));

for(const [name,html] of [['atelier',atelier],['signal',signal]]){
  pass(`${name} case labels concept status`,/concept|self-initiated/i.test(html));
  for(const heading of ['Challenge','Context','Strategy','Design system','Experience','Build','Responsive']){
    pass(`${name} case includes ${heading}`,new RegExp(`>${heading}<`,'i').test(html)||new RegExp(heading,'i').test(html));
  }
  pass(`${name} case avoids invented metrics`,!/\b\d+%\b|revenue increased|conversion increased|award-winning|trusted by/i.test(html));
}

for(const service of ['Flagship Websites','Brand-to-Digital','Interactive Experiences','Digital Repositioning']) pass(`services includes ${service}`,services.includes(service));
pass('services page explains fit/problem/scope',/Who it is for/i.test(services)&&/Typical scope/i.test(services));
pass('studio owns independent senior model',/independent/i.test(studio)&&/senior/i.test(studio));
pass('studio does not claim large agency team',!/40-person|global team|large agency/i.test(studio));
pass('studio includes quality principles',/quality principles/i.test(studio));

for(const field of ['name="name"','name="email"','name="company"','name="website"','name="project"','name="change"','name="budget"','name="timing"']) pass(`contact has field ${field}`,contact.includes(field));
for(const band of ['€10k–€25k','€25k–€50k','€50k–€100k','€100k+','Not sure yet']) pass(`contact has budget band ${band}`,contact.includes(band));
pass('contact has validation/status semantics',contact.includes('aria-live="polite"')&&contact.includes('role="status"'));
pass('contact has duplicate-submit guard',/isSubmitting|dataset\.submitting|submitting/i.test(contact+sharedJs));
pass('contact does not fake success',!/message sent|sent successfully|thanks.*sent|inquiry received/i.test(contact+sharedJs));
pass('contact exposes honest delivery state',/not connected|not sent|delivery.*connected/i.test(contact+sharedJs));

pass('404 has branded recovery',/Kwin Studio/i.test(error404)&&/Back to home|Return home|Go home/i.test(error404));
pass('robots keeps preview blocked',/Disallow:\s*\//i.test(robots));
pass('sitemap names core routes',routeLinks.every(href=>sitemap.includes(href.replace('.html',''))||sitemap.includes(href)));

const pages=[['home',home],['work',work],['atelier',atelier],['signal',signal],['services',services],['studio',studio],['contact',contact],['404',error404]];
const titles=[];
for(const [name,html] of pages){
  if(!html) continue;
  const title=(html.match(/<title>([^<]+)<\/title>/i)||[])[1]||'';
  pass(`${name} has title`,Boolean(title));
  pass(`${name} has meta description`,/name="description"\s+content="[^"]+"/i.test(html));
  if(name!=='404') pass(`${name} remains noindex during preview`,/name="robots"\s+content="noindex,nofollow"/i.test(html));
  if(title) titles.push(title);
}
pass('page titles are unique',new Set(titles).size===titles.length,`${titles.length} titles checked`);

if(sharedJs){
  let parseError='';
  try{new Function(sharedJs)}catch(error){parseError=error.message}
  pass('shared V2 JavaScript parses',!parseError,parseError);
  pass('shared V2 JavaScript does not hijack wheel',!sharedJs.includes("addEventListener('wheel'")&&!sharedJs.includes('addEventListener("wheel"'));
}

if(failures.length){
  console.error(`\n${failures.length} V2 release gate(s) failed.`);
  process.exit(1);
}
console.log('\nAll Kwin Studio V2 release gates pass.');
