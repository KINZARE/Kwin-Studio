import fs from 'node:fs';

const file='site/index.html';
let html=fs.readFileSync(file,'utf8');
const replace=(from,to,label)=>{
  if(html.includes(to)) return;
  if(!html.includes(from)) throw new Error(`Homepage patch target missing: ${label}`);
  html=html.replace(from,to);
};

replace('<a href="#work">Work</a>','<a href="/work.html">Work</a>','desktop Work route');
replace('<a href="#services">Services</a>','<a href="/services.html">Services</a>','desktop Services route');
replace('<a href="#studio">Studio</a>','<a href="/studio.html">Studio</a>','desktop Studio route');
// The same legacy anchors occur once more in mobile navigation.
replace('<a href="#work">Work</a>','<a href="/work.html">Work</a>','mobile Work route');
replace('<a href="#services">Services</a>','<a href="/services.html">Services</a>','mobile Services route');
replace('<a href="#studio">Studio</a>','<a href="/studio.html">Studio</a>','mobile Studio route');
replace('<a class="text-link" href="#work">View work <span>↓</span></a>','<a class="text-link" href="/work.html">View work <span>↗</span></a>','hero Work CTA');

replace('<div class="project__meta"><span>Concept</span><span>Strategy</span><span>Experience design</span><span>2026</span></div>','<div class="project__meta"><span>Concept</span><span>Strategy</span><span>Experience design</span><span>2026</span></div><a class="text-link" href="/work/atelier.html">View concept case <span>↗</span></a>','Atelier case link');
replace('<div class="project__meta"><span>Interface study</span><span>UX/UI</span><span>Interactive</span><span>2026</span></div>','<div class="project__meta"><span>Interface study</span><span>UX/UI</span><span>Interactive</span><span>2026</span></div><a class="text-link" href="/work/signal.html">View concept case <span>↗</span></a>','Signal case link');

// Add the flagship-studio category without removing wording protected by the Portal V2 regression suite.
replace('<p class="hero__intro">KWIN Studio designs and builds premium websites for ambitious businesses — from strategy and UX to art direction, development and launch.</p>','<p class="hero__intro">KWIN Studio is an independent digital flagship studio that designs and builds premium websites for ambitious businesses — from strategy and UX to art direction, development and launch.</p>','hero positioning');

fs.writeFileSync(file,html);
console.log('Kwin Studio V2 homepage patch applied or already present.');
