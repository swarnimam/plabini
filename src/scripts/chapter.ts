import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ignoreMobileResize:true});
const media=gsap.matchMedia();
const envelope=document.querySelector<HTMLDetailsElement>('#wedding-envelope');
let letterTimeline: gsap.core.Timeline | undefined;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function refresh(){requestAnimationFrame(()=>ScrollTrigger.refresh());}
let changingLetter=false;
const summary=envelope?.querySelector('summary');
summary?.addEventListener('click',event=>{
 if(!envelope || reduced.matches)return;
 event.preventDefault();
 if(changingLetter)return;
 changingLetter=true;
 letterTimeline?.revert();
 const startHeight=envelope.getBoundingClientRect().height;
 const opening=!envelope.open;
 // Measure the native end state, then animate the container to it. The native
 // details control remains the no-script and reduced-motion fallback.
 envelope.open=opening;
 const targetHeight=envelope.getBoundingClientRect().height;
 if(!opening)envelope.open=true;
 gsap.set(envelope,{height:startHeight,overflow:'clip'});
 const letter=envelope.querySelector('.letter-paper');
 letterTimeline=gsap.timeline({onComplete:()=>{
  if(!opening)envelope.open=false;
  gsap.set(envelope,{clearProps:'height,overflow'});
  changingLetter=false;refresh();
 }});
 letterTimeline.to(envelope,{height:targetHeight,duration:opening?1.5:.8,ease:'power3.inOut'},0);
 if(opening){
  letterTimeline.fromTo(letter,{y:-150,scale:.82,rotationX:-18,opacity:0,clipPath:'inset(0 0 100% 0)'},{y:0,scale:1,rotationX:0,opacity:1,clipPath:'inset(0 0 0% 0)',duration:1.25,ease:'power3.inOut'},.2)
   .fromTo(envelope.querySelectorAll('.letter-paper>p,.letter-paper>a,.letter-ganesha,.letter-divider'),{y:18,opacity:0},{y:0,opacity:1,stagger:.04,duration:.5,ease:'power2.out'},.9);
 }else letterTimeline.to(letter,{y:-110,scale:.85,opacity:0,duration:.65,ease:'power2.in'},0);
});
envelope?.addEventListener('toggle',()=>{if(!changingLetter)refresh();});
reduced.addEventListener('change',()=>{letterTimeline?.revert();changingLetter=false;if(envelope)gsap.set(envelope,{clearProps:'height,overflow'});refresh();});
media.add('(prefers-reduced-motion: no-preference)',()=>{
 document.documentElement.dataset.motion='on';
 const desktop=matchMedia('(min-width:800px)').matches;
 const intro=gsap.timeline();
 intro.fromTo('.door-left',{opacity:1,rotationY:0},{opacity:0,rotationY:-105,duration:1.8,ease:'power3.inOut'},0)
  .fromTo('.door-right',{opacity:1,rotationY:0},{opacity:0,rotationY:105,duration:1.8,ease:'power3.inOut'},0)
  .from('.hero-copy h1>span',{yPercent:80,opacity:0,rotationX:-25,stagger:.15,duration:1.4,ease:'power3.out'},.2);
 const hero=gsap.timeline({scrollTrigger:{trigger:'.opening',start:'top top',end:'bottom top',scrub:.6}});
 hero.to('.hero-scenery',{scale:1.28,yPercent:16,ease:'none'},0).to('.hero-copy',{y:130,scale:.86,opacity:.12,ease:'none'},0);
 gsap.utils.toArray<HTMLElement>('.folio-event').forEach((event,i)=>{
  const art=event.querySelector('.folio-art'), sheet=event.querySelector('.folio-sheet'), copy=event.querySelector('.event-main');
  const dir=i%2?-1:1;
  const scene=gsap.timeline({scrollTrigger:{trigger:event,start:'top 92%',end:desktop?'top 12%':'top 8%',scrub:.45,invalidateOnRefresh:true}});
  scene.fromTo(sheet,{rotationY:dir*(desktop?12:5),rotationZ:dir*3,y:100,scale:.88},{rotationY:0,rotationZ:0,y:0,scale:1,ease:'power2.out'},0)
   .fromTo(art,{clipPath:'inset(16% 18% 16% 18% round 180px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'power2.inOut'},0)
   .fromTo(copy,{x:dir*(desktop?65:0),y:35,opacity:.45},{x:0,y:0,opacity:1,ease:'power2.out'},.15);
  const image=event.querySelector('.folio-art>img');
  if(image)gsap.fromTo(image,{scale:1.3,yPercent:-5},{scale:1.05,yPercent:5,ease:'none',scrollTrigger:{trigger:art,start:'top bottom',end:'bottom top',scrub:true}});

 });
 gsap.utils.toArray<HTMLElement>('[data-reveal],.letter-heading h2,.celebration-intro h2').forEach(el=>gsap.from(el,{y:55,opacity:.2,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',toggleActions:'play none none reverse'}}));
 gsap.utils.toArray<SVGPathElement>('.draw-path').forEach((p,i)=>gsap.fromTo(p,{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:1.8,delay:i*.15,scrollTrigger:{trigger:p,start:'top 85%'}}));
 gsap.fromTo('.city-type',{xPercent:-7},{xPercent:7,ease:'none',scrollTrigger:{trigger:'.city-scene',start:'top bottom',end:'bottom top',scrub:true}});
 return()=>{document.documentElement.dataset.motion='off';};
});
document.fonts.ready.then(refresh);
window.addEventListener('load',refresh,{once:true});
document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach(img=>img.addEventListener('load',refresh,{once:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden)gsap.ticker.sleep();else{gsap.ticker.wake();ScrollTrigger.update();}});
// A restrained optical response for fine pointers; touch uses the scroll timeline.
media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{
 const cleanups:Array<()=>void>=[];
 document.querySelectorAll<HTMLElement>('.folio-art').forEach(art=>{
  const glint=art.querySelector<HTMLElement>('.art-glint');
  const rx=gsap.quickTo(art,'rotationX',{duration:.65,ease:'power3.out'});
  const ry=gsap.quickTo(art,'rotationY',{duration:.65,ease:'power3.out'});
  const move=(event:PointerEvent)=>{const r=art.getBoundingClientRect();rx(-(event.clientY-r.top-r.height/2)/r.height*5);ry((event.clientX-r.left-r.width/2)/r.width*7);if(glint)gsap.to(glint,{opacity:.75,xPercent:(event.clientX-r.left)/r.width*25-12.5,duration:.5,overwrite:true});};
  const leave=()=>{rx(0);ry(0);if(glint)gsap.to(glint,{opacity:0,duration:.6,overwrite:true});};
  art.addEventListener('pointermove',move);art.addEventListener('pointerleave',leave);
  cleanups.push(()=>{art.removeEventListener('pointermove',move);art.removeEventListener('pointerleave',leave);});
 });
 return()=>cleanups.forEach(cleanup=>cleanup());
});
