(()=>{
  const body=document.body;
  const header=document.querySelector('.header');
  const trigger=document.querySelector('[data-menu-trigger]');
  const menu=document.querySelector('[data-mobile-menu]');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setMenu=(open,{returnFocus=false}={})=>{
    if(!trigger||!menu)return;
    menu.hidden=!open;
    trigger.textContent=open?'Close':'Menu';
    trigger.setAttribute('aria-expanded',String(open));
    trigger.setAttribute('aria-label',open?'Close menu':'Open menu');
    body.classList.toggle('menu-open',open);
    if(open)requestAnimationFrame(()=>menu.querySelector('a')?.focus());
    else if(returnFocus)trigger.focus();
  };
  trigger?.addEventListener('click',()=>setMenu(menu.hidden));
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{
    if(!menu||menu.hidden)return;
    if(event.key==='Escape'){setMenu(false,{returnFocus:true});return}
    if(event.key==='Tab'){
      const items=[trigger,...menu.querySelectorAll('a[href]')].filter(Boolean);
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
  });
  let raf=0;
  const onScroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;header?.classList.toggle('is-scrolled',scrollY>16)})};
  addEventListener('scroll',onScroll,{passive:true});
  onScroll();
  if(!reduce&&'IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{rootMargin:'0px 0px -12%'});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  }else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));

  const form=document.querySelector('[data-inquiry-form]');
  if(!form)return;
  const status=form.querySelector('[data-form-status]');
  const submit=form.querySelector('[type="submit"]');
  const copyButton=form.querySelector('[data-copy-inquiry]');
  let isSubmitting=false;
  const setStatus=(message,state='idle')=>{if(status){status.textContent=message;status.dataset.state=state}};
  const clearErrors=()=>form.querySelectorAll('[data-error-for]').forEach(el=>el.textContent='');
  const validate=()=>{
    clearErrors();
    let valid=true;
    form.querySelectorAll('[required]').forEach(field=>{
      const value=field.value.trim();
      let message='';
      if(!value)message='This field is required.';
      else if(field.type==='email'&&!/^\S+@\S+\.\S+$/.test(value))message='Enter a valid email address.';
      field.setAttribute('aria-invalid',message?'true':'false');
      const error=form.querySelector(`[data-error-for="${field.name}"]`);
      if(error)error.textContent=message;
      if(message)valid=false;
    });
    return valid;
  };
  const serialize=()=>{
    const data=new FormData(form);
    return ['Kwin Studio project inquiry',...['name','email','company','website','project','change','budget','timing'].map(key=>`${key[0].toUpperCase()+key.slice(1)}: ${data.get(key)||'—'}`)].join('\n');
  };
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(isSubmitting)return;
    if(!validate()){setStatus('Check the highlighted fields and try again.','error');form.querySelector('[aria-invalid="true"]')?.focus();return}
    isSubmitting=true;form.dataset.submitting='true';if(submit)submit.disabled=true;
    setStatus('Checking secure delivery…','processing');
    setTimeout(()=>{
      isSubmitting=false;delete form.dataset.submitting;if(submit)submit.disabled=false;
      setStatus('Not sent — secure email delivery is not connected on this preview yet. You can copy the inquiry below and keep it safe.','error');
    },360);
  });
  copyButton?.addEventListener('click',async()=>{
    if(!validate()){setStatus('Complete the required fields before copying the inquiry.','error');return}
    try{await navigator.clipboard.writeText(serialize());setStatus('Inquiry copied to your clipboard. It has not been sent.','idle')}
    catch{setStatus('Copy failed in this browser. Select the form text manually before leaving.','error')}
  });
})();
