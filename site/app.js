(()=>{
  'use strict';
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const header=document.querySelector('[data-site-header]');
  const trigger=document.querySelector('[data-menu-trigger]');
  const menu=document.querySelector('[data-mobile-menu]');
  const focusable='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  let previousFocus=null;

  const setMenu=(open)=>{
    if(!trigger||!menu)return;
    trigger.setAttribute('aria-expanded',String(open));
    trigger.setAttribute('aria-label',open?'Close menu':'Open menu');
    menu.hidden=!open;
    document.body.classList.toggle('menu-open',open);
    if(open){
      previousFocus=document.activeElement;
      const first=menu.querySelector(focusable);
      first?.focus();
    }else if(previousFocus instanceof HTMLElement){
      previousFocus.focus();
    }
  };
  trigger?.addEventListener('click',()=>setMenu(trigger.getAttribute('aria-expanded')!=='true'));
  menu?.addEventListener('click',(event)=>{if(event.target.closest('a'))setMenu(false)});
  document.addEventListener('keydown',(event)=>{
    if(event.key === 'Escape'&&trigger?.getAttribute('aria-expanded')==='true'){setMenu(false);return;}
    if(event.key!=='Tab'||!menu||menu.hidden)return;
    const nodes=[...menu.querySelectorAll(focusable)].filter((node)=>node instanceof HTMLElement);
    if(!nodes.length)return;
    const first=nodes[0],last=nodes[nodes.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });

  const reveals=[...document.querySelectorAll('[data-reveal]')];
  if(reducedMotion.matches){reveals.forEach((node)=>node.classList.add('is-visible'));}
  else if('IntersectionObserver' in window){
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});
    },{rootMargin:'0px 0px -12% 0px',threshold:.08});
    reveals.forEach((node)=>observer.observe(node));
  }else{reveals.forEach((node)=>node.classList.add('is-visible'));}

  let ticking=false;
  const updateScroll=()=>{
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    document.documentElement.style.setProperty('--scroll-progress',String(scrollY/max));
    header?.classList.toggle('is-scrolled',scrollY>24);
    ticking=false;
  };
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll);}},{passive:true});
  updateScroll();
})();
