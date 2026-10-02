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
pass('selected work scroll span is compact',index.includes('#work{height:300svh}'));
pass('transform scene scroll span is compact',index.includes('.transform{min-height:155svh}'));
pass('brief wall padding is compact',index.includes('.brief-wall{padding:clamp(84px,10vw,150px) 0}'));
pass('brief wall intro gap is compact',index.includes('margin-bottom:46px'));
pass('brief wall grid tail is compact',index.includes('.brief-wall__grid{min-height:190vh}'));
pass('generative scene spacing is compact',index.includes('.generative-scene{padding:clamp(88px,11vw,168px) 0'));
pass('adaptive scene scroll span is compact',index.includes('.adaptive-demo{min-height:155vh}'));
pass('studio system spacing is compact',index.includes('.agent-scene{padding:clamp(88px,11vw,168px) 0}'));
pass('screen world scroll span is compact',index.includes('.screen-world{min-height:175vh}'));
pass('project access spacing is compact',index.includes('.project-pass-scene{padding:clamp(88px,10vw,150px) 0}'));
pass('post-agent process spacing is compact',index.includes('.agent-scene + .section{padding-block:clamp(72px,8vw,120px)}'));
pass('studio statement height is compact',index.includes('.studio-statement { min-height: 68svh;'));
pass('pre-screen capabilities spacing is compact',index.includes('.studio-statement + .section{padding-block:clamp(72px,8vw,120px)}'));
pass('floating screens stay visible through late scroll',index.includes("const visibility=Math.min(clamp(p/.12),clamp((1-p)/.08));"));
pass('global scroll trigger is 60 percent',index.includes('window.__kwinMotion={trigger:.60,register(fn){callbacks.add(fn);request()},request}'));
pass('general motion uses shared 60 percent trigger',index.includes('const viewportTrigger=window.__kwinMotion?.trigger??.60;'));
pass('screen world uses shared 60 percent trigger',index.includes('const entryLead=innerHeight*viewportTrigger,p=clamp((entryLead-r.top)/(entryLead+travel));'));

if(failures.length){
  console.error('\n'+failures.length+' release gate(s) failed.');
  process.exit(1);
}
console.log('\nAll Portal V2 preview release gates pass.');
