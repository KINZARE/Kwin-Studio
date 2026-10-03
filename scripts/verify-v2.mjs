import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'site/index.html','site/styles.css','site/a11y.css','site/app.js','site/work/index.html',
  'site/work/portal-v2/index.html','site/work/adaptive-brand-system/index.html',
  'site/work/spatial-interface-study/index.html','site/services/index.html',
  'site/studio/index.html','site/contact/index.html','site/404.html',
  'site/robots.txt','site/sitemap.xml','site/site.webmanifest','site/favicon.svg'
];
const failures=[];
const pass=(label,condition,detail='')=>{
  console.log(`${condition?'PASS':'FAIL'}  ${label}${detail?` — ${detail}`:''}`);
  if(!condition) failures.push(label+(detail?`: ${detail}`:''));
};
const read=(p)=>fs.existsSync(path.join(root,p))?fs.readFileSync(path.join(root,p),'utf8'):'';

for(const file of required) pass(`exists: ${file}`,fs.existsSync(path.join(root,file)));

const pages = required.filter(f=>f.endsWith('.html'));
for(const file of pages){
  const html=read(file);
  if(!html) continue;
  pass(`${file}: lang=en`,/<html[^>]+lang="en"/i.test(html));
  pass(`${file}: viewport fit`,/viewport-fit=cover/i.test(html));
  pass(`${file}: title`,/<title>[^<]{8,}<\/title>/i.test(html));
  pass(`${file}: meta description`,/<meta name="description" content="[^"]{40,}"/i.test(html));
  pass(`${file}: preview noindex`,/<meta name="robots" content="noindex,nofollow"/i.test(html));
  pass(`${file}: canonical`,/<link rel="canonical" href="https:\/\/kwin-studio-preview\.onrender\.com\//i.test(html));
  pass(`${file}: shared css`,/href="(?:\.\.\/)*styles\.css"/i.test(html));
  pass(`${file}: shared js`,/src="(?:\.\.\/)*app\.js"/i.test(html));
  pass(`${file}: skip link`,/class="skip-link"/i.test(html));
  pass(`${file}: main landmark`,/<main\b/i.test(html));
  pass(`${file}: exactly one h1`,(html.match(/<h1\b/gi)||[]).length===1);
  pass(`${file}: primary nav`,/aria-label="Primary navigation"/i.test(html));
}

const css=read('site/styles.css');
pass('CSS has brand accent token',css.includes('--accent:#d7ff38'));
pass('CSS has warm paper token',css.includes('--paper:#f0ede6'));
pass('CSS has 320 mobile handling',css.includes('@media (max-width: 520px)'));
pass('CSS has tablet handling',css.includes('@media (max-width: 840px)'));
pass('CSS has reduced-motion handling',css.includes('prefers-reduced-motion: reduce'));
const a11y=read('site/a11y.css');
pass('CSS exposes a global visible focus ring',a11y.includes(':focus-visible{outline:'));
pass('Mobile menu trigger meets touch target baseline',a11y.includes('min-width:48px')&&a11y.includes('min-height:48px'));
pass('CSS avoids glassmorphism blur',!css.includes('backdrop-filter'));
pass('CSS avoids giant fixed min widths',!/(min-width:\s*(?:[5-9]\d\d|\d{4,})px)/.test(css));

const js=read('site/app.js');
pass('A11y stylesheet is loaded by shared JS',js.includes('/a11y.css'));
pass('JS parses',(()=>{try{new Function(js);return true}catch{return false}})());
pass('JS uses IntersectionObserver',js.includes('IntersectionObserver'));
pass('JS exposes Escape-close nav',js.includes("event.key === 'Escape'"));
pass('JS handles reduced motion',js.includes("prefers-reduced-motion: reduce"));
pass('JS uses one scroll listener',(js.match(/addEventListener\(['"]scroll['"]/g)||[]).length===1);
pass('JS has no wheel interception',!js.includes("addEventListener('wheel'"));

const home=read('site/index.html');
pass('Home positioning present',home.includes('Digital experiences for ambitious brands.'));
pass('Home core promise present',home.includes('unmistakable digital experiences'));
pass('Home has flagship work section',home.includes('id="work"'));
pass('Home has Strategy Design Build',home.includes('>Strategy<')&&home.includes('>Design<')&&home.includes('>Build<'));
pass('Home has Think Design Build Launch',home.includes('Think. Design. Build. Launch.'));
pass('Home labels concept work',/Self-initiated|Concept study/i.test(home));
pass('Home has no fake trust language',!/(trusted by|award-winning|\bclients include\b)/i.test(home));

const work=read('site/work/index.html');
pass('Work index labels self-initiated work',work.includes('Self-initiated'));
pass('Work links all cases',work.includes('/work/portal-v2/')&&work.includes('/work/adaptive-brand-system/')&&work.includes('/work/spatial-interface-study/'));

for(const file of ['site/work/portal-v2/index.html','site/work/adaptive-brand-system/index.html','site/work/spatial-interface-study/index.html']){
  const html=read(file);
  pass(`${file}: challenge`,/id="challenge"/i.test(html));
  pass(`${file}: strategy`,/id="strategy"/i.test(html));
  pass(`${file}: system`,/id="system"/i.test(html));
  pass(`${file}: responsive`,/id="responsive"/i.test(html));
  pass(`${file}: outcome`,/id="outcome"/i.test(html));
  pass(`${file}: transparent status`,/Self-initiated|Concept study/i.test(html));
}

const services=read('site/services/index.html');
for(const term of ['Flagship Websites','Brand-to-Digital','Interactive Experiences','Digital Repositioning']) pass(`Services includes ${term}`,services.includes(term));

const studio=read('site/studio/index.html');
pass('Studio claims independent model',/independent/i.test(studio));
pass('Studio avoids fake team size',!/(40-person|team of \d+|\d+ employees)/i.test(studio));

const contact=read('site/contact/index.html');
for(const field of ['name="name"','name="email"','name="company"','name="website"','name="project"','name="change"','name="budget"','name="timing"']) pass(`Contact field ${field}`,contact.includes(field));
pass('Contact has live status region',/role="status"[^>]+aria-live="polite"/i.test(contact));
pass('Contact does not fake delivery',!/(message sent|sent successfully|thanks.*sent)/i.test(contact));
pass('Contact transparently blocks unconnected delivery',/delivery.*not connected|email delivery.*not connected/i.test(contact));
pass('Contact script has duplicate-submit guard',contact.includes('submitting'));
pass('Contact script has validation',contact.includes('reportValidity'));

const sitemap=read('site/sitemap.xml');
for(const route of ['<loc>https://kwin-studio-preview.onrender.com/</loc>','/work/</loc>','/services/</loc>','/studio/</loc>','/contact/</loc>']) pass(`Sitemap includes ${route}`,sitemap.includes(route));

const robots=read('site/robots.txt');
pass('Preview robots blocks crawling',/Disallow:\s*\//.test(robots));

if(failures.length){
  console.error(`\n${failures.length} Kwin Studio V2 gate(s) failed.`);
  process.exit(1);
}
console.log('\nAll Kwin Studio V2 static release gates pass.');
