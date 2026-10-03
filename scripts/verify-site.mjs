import fs from 'node:fs';

const index=fs.readFileSync('site/index.html','utf8');
const contact=fs.readFileSync('site/contact.html','utf8');
const shared=fs.readFileSync('site/assets/studio-v2.js','utf8');
const failures=[];
const pass=(label,condition,detail='')=>{if(!condition)failures.push(label+(detail?`: ${detail}`:''));console.log(`${condition?'PASS':'FAIL'}  ${label}${detail?` — ${detail}`:''}`)};

const legacyTerms=['SALON','Boekuna','Bocuna','Bukuna','Beauty & appointments','salons:'];
for(const term of legacyTerms) pass(`legacy term absent: ${term}`,!index.toLowerCase().includes(term.toLowerCase()));
pass('homepage has exactly one H1',(index.match(/<h1\b/gi)||[]).length===1);
const ids=[...index.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
pass('no duplicate homepage IDs',new Set(ids).size===ids.length);
const inlineScripts=[...index.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
const errors=[];for(const [i,src] of inlineScripts.entries()){try{new Function(src)}catch(error){errors.push(`script ${i+1}: ${error.message}`)}}
pass('all homepage inline scripts parse',errors.length===0,errors.join(' | '));
pass('no wheel interception',(index.match(/addEventListener\(['"]wheel['"]/g)||[]).length===0);
pass('single shared homepage scroll listener',(index.match(/addEventListener\(['"]scroll['"]/g)||[]).length===1);
pass('single shared homepage resize listener',(index.match(/addEventListener\(['"]resize['"]/g)||[]).length===1);
pass('reduced motion support present',index.includes('prefers-reduced-motion'));
pass('global scroll trigger remains 60 percent',index.includes('window.__kwinMotion={trigger:.60'));
pass('native scrolling remains intentional',index.includes('Native scrolling is intentional'));
pass('Portal V2 spatial gateway remains',index.includes('id="portal-v2-spatial-css"')&&index.includes('gateway-aperture'));
pass('mobile premium pass remains',index.includes('id="mobile-premium-pass"'));
pass('taste refinement pass remains',index.includes('id="taste-refinement-pass"'));
pass('release performance pass remains',index.includes('id="release-performance-pass"'));
pass('session-scoped loader remains',index.includes("sessionStorage.getItem('kwin-loader-seen')"));
pass('touch does not depend on hover',index.includes('.brief-card__reveal{transform:none!important'));
pass('mobile snap tracks remain',index.includes('scroll-snap-type:x mandatory'));
pass('homepage preview remains noindex',/name="robots"\s+content="noindex,nofollow"/i.test(index));
pass('homepage links real V2 routes',['/work.html','/services.html','/studio.html','/contact.html'].every(route=>index.includes(`href="${route}"`)));
pass('homepage deep-links concept cases',index.includes('/work/atelier.html')&&index.includes('/work/signal.html'));
pass('homepage keeps honest concept labels',index.includes('Selected directions')&&index.includes('<span>Concept</span>'));
pass('homepage positions flagship studio',index.includes('independent digital flagship studio'));

pass('contact preview remains noindex',/name="robots"\s+content="noindex,nofollow"/i.test(contact));
pass('contact language is English',contact.startsWith('<!doctype html><html lang="en">'));
pass('contact has labelled primary navigation',contact.includes('aria-label="Primary navigation"'));
pass('contact has dedicated mobile-first shared design layer',contact.includes('/assets/studio-v2.css'));
pass('contact fields avoid mobile zoom',/font-size:16px/.test(fs.readFileSync('site/assets/studio-v2.css','utf8')));
pass('contact has qualification bands',contact.includes('€10k–€25k')&&contact.includes('€100k+'));
pass('contact uses accessible status',contact.includes('role="status"')&&contact.includes('aria-live="polite"'));
pass('contact has duplicate submission guard',shared.includes('isSubmitting')&&shared.includes('dataset.submitting'));
pass('contact never fakes delivery success',!/message sent|sent successfully|thanks.*sent|inquiry received/i.test(contact+shared));
pass('contact explicitly reports unconnected delivery',/not connected|not sent/i.test(contact+shared));
let sharedError='';try{new Function(shared)}catch(error){sharedError=error.message}
pass('shared V2 script parses',!sharedError,sharedError);
pass('shared script does not intercept wheel',!shared.includes("addEventListener('wheel'")&&!shared.includes('addEventListener("wheel"'));

if(failures.length){console.error(`\n${failures.length} release gate(s) failed.`);process.exit(1)}
console.log('\nAll Kwin Studio release gates pass.');
