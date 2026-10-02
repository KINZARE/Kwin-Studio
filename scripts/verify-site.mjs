import fs from 'node:fs';

const index=fs.readFileSync('site/index.html','utf8');
const contact=fs.readFileSync('site/contact.html','utf8');

const failures=[];
const pass=(label,condition,detail='')=>{
  if(!condition) failures.push(label+(detail ? ': '+detail : ''));
  console.log((condition?'PASS':'FAIL')+'  '+label+(detail ? ' — '+detail : ''));
};

const legacyTerms=['SALON','Boekuna','Bocuna','Bukuna','Beauty & appointments','appointments','salons:'];
for(const term of legacyTerms){
  const escaped=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  pass('legacy term absent: '+term,!new RegExp(escaped,'i').test(index));
}

const h1=(index.match(/<h1\b/gi)||[]).length;
pass('homepage has exactly one H1',h1===1,'found '+h1);

const ids=[...index.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
const duplicateIds=[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))];
pass('no duplicate homepage IDs',duplicateIds.length===0,duplicateIds.join(', '));

const idSet=new Set(ids);
const hashes=[...index.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]).filter(Boolean);
const missingHashes=[...new Set(hashes.filter(h=>h!=='top'&&!idSet.has(h)))];
pass('all internal hash links resolve',missingHashes.length===0,missingHashes.join(', '));

const inlineScripts=[...index.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
const scriptErrors=[];
for(const [i,src] of inlineScripts.entries()){
  try{ new Function(src); } catch(error){ scriptErrors.push('script '+(i+1)+': '+error.message); }
}
pass('all inline scripts parse',scriptErrors.length===0,scriptErrors.join(' | '));

const wheel=(index.match(/addEventListener\(['"]wheel['"]/g)||[]).length;
const scroll=(index.match(/addEventListener\(['"]scroll['"]/g)||[]).length;
const resize=(index.match(/addEventListener\(['"]resize['"]/g)||[]).length;
pass('no wheel interception',wheel===0,'found '+wheel);
pass('single shared scroll listener',scroll===1,'found '+scroll);
pass('single shared resize listener',resize===1,'found '+resize);

pass('reduced motion support present',index.includes('prefers-reduced-motion'));
pass('homepage preview remains noindex',/name="robots"\s+content="noindex,nofollow"/i.test(index));
pass('contact preview remains noindex',/name="robots"\s+content="noindex,nofollow"/i.test(contact));
pass('contact does not fake success',!/message sent|sent successfully|thanks.*sent/i.test(contact));

const classCount=name=>(index.match(new RegExp('class="[^"]*\\b'+name+'\\b[^"]*"','g'))||[]).length;
const brief=classCount('brief-card');
const floats=classCount('float-screen');
const studyImages=classCount('study-art');
const agentLines=classCount('agent-line');
const designPanels=classCount('design-stack__panel');
pass('exploration wall has at least 12 surfaces',brief>=12,'found '+brief);
pass('screen world has at least 14 floating surfaces',floats>=14,'found '+floats);
pass('at least 6 original study images are integrated',studyImages>=6,'found '+studyImages);
pass('studio system has 8 stages',agentLines===8,'found '+agentLines);
pass('design workbench has at least 7 secondary panels',designPanels>=7,'found '+designPanels);
pass('project access artifact present',index.includes('PROJECT ACCESS / 2026'));
pass('adaptive modes are present',index.includes('Fast overview')&&index.includes('Brand story')&&index.includes('Decision mode'));
pass('new project visual variants are styled',index.includes('.project__visual--mono {')&&index.includes('.project__visual--acid {'));

pass('mobile breakpoint covered',index.includes('@media(max-width:520px)')||index.includes('@media (max-width: 520px)'));
pass('tablet breakpoint covered',index.includes('@media(max-width:820px)')||index.includes('@media (max-width: 820px)'));

if(failures.length){
  console.error('\n'+failures.length+' release gate(s) failed.');
  process.exit(1);
}
console.log('\nAll Portal V2 preview release gates pass.');
