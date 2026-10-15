import gsap from 'gsap';
const dialog=document.querySelector<HTMLDialogElement>('#scene-cinema');
const scenes=Array.from(document.querySelectorAll<HTMLElement>('.folio-event'));
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if(dialog && typeof dialog.showModal==='function'){
 const image=dialog.querySelector<HTMLImageElement>('.cinema-image')!;
 const content=dialog.querySelector<HTMLElement>('.cinema-content')!;
 const title=dialog.querySelector<HTMLElement>('#cinema-title')!;
 const english=dialog.querySelector<HTMLElement>('.cinema-english')!;
 const details=dialog.querySelector<HTMLElement>('.cinema-details')!;
 const prev=dialog.querySelector<HTMLButtonElement>('.cinema-prev')!;
 const next=dialog.querySelector<HTMLButtonElement>('.cinema-next')!;
 const close=dialog.querySelector<HTMLButtonElement>('.cinema-close')!;
 let current=0, busy=false, request=0, opener:HTMLElement|null=null;
 let timeline:gsap.core.Timeline|undefined;
 function populate(index:number){
  const scene=scenes[index], source=scene.querySelector<HTMLImageElement>('.folio-art>img')!;
  current=index;dialog!.dataset.scene=String(index);image.src=source.src;image.alt=source.alt;
  title.textContent=scene.querySelector('.event-hindi')!.textContent;
  english.textContent=scene.querySelector('h3')!.textContent;
  details.replaceChildren(...Array.from(scene.querySelectorAll('.event-description,.event-details')).map(el=>el.cloneNode(true)));
  prev.disabled=index===0;next.disabled=index===scenes.length-1;
  dialog!.querySelector('#cinema-status')!.textContent=english.textContent;
  return source;
 }
 function open(index:number,button:HTMLElement){
  if(busy)return;request++;opener=button;
  const source=populate(index), from=source.getBoundingClientRect();
  dialog!.showModal();document.documentElement.classList.add('cinema-open');dialog!.scrollTop=0;close.focus({preventScroll:true});
  if(reduced.matches)return;
  const to=image.getBoundingClientRect();
  busy=true;
  timeline=gsap.timeline({onComplete:()=>{busy=false;}})
   .fromTo(image,{x:from.left-to.left,y:from.top-to.top,scaleX:from.width/to.width,scaleY:from.height/to.height,opacity:.7},{x:0,y:0,scaleX:1,scaleY:1,opacity:1,duration:.9,ease:'power3.inOut'},0)
   .fromTo(content,{y:40,opacity:0},{y:0,opacity:1,duration:.65,ease:'power3.out'},.35);
 }
 function shut(){
  request++;timeline?.kill();busy=false;
  const finish=()=>{gsap.set([image,content],{clearProps:'all'});dialog!.close();document.documentElement.classList.remove('cinema-open');opener?.focus({preventScroll:true});};
  if(reduced.matches){finish();return;}
  const target=scenes[current].querySelector('.folio-art>img')!.getBoundingClientRect(), from=image.getBoundingClientRect();
  const visible=target.bottom>0&&target.top<innerHeight;
  busy=true;
  timeline=gsap.timeline({onComplete:()=>{busy=false;finish();}})
   .to(content,{opacity:0,y:15,duration:.2},0)
   .to(image,visible?{x:target.left-from.left,y:target.top-from.top,scaleX:target.width/from.width,scaleY:target.height/from.height,opacity:.3,duration:.55,ease:'power3.inOut'}:{opacity:0,scale:.97,duration:.3},0);
 }
 async function navigate(index:number){
  if(busy||index<0||index>=scenes.length)return;
  busy=true;const ticket=++request;const direction=index>current?1:-1;
  const src=scenes[index].querySelector<HTMLImageElement>('.folio-art>img')!.src;
  const preload=new Image();preload.src=src;await preload.decode().catch(()=>{});
  if(ticket!==request||!dialog!.open)return;
  if(reduced.matches){populate(index);busy=false;return;}
  timeline=gsap.timeline({onComplete:()=>{busy=false;}})
   .to([image,content],{opacity:0,x:-direction*35,duration:.24,ease:'power2.in'})
   .call(()=>{populate(index);content.scrollTop=0;dialog!.scrollTop=0;})
   .fromTo([image,content],{opacity:0,x:direction*50},{opacity:1,x:0,duration:.65,stagger:.08,ease:'power3.out'});
 }
 document.querySelectorAll<HTMLButtonElement>('[data-scene-open]').forEach(button=>{button.hidden=false;button.addEventListener('click',()=>open(Number(button.dataset.sceneOpen),button));});
 close.addEventListener('click',shut);
 dialog.addEventListener('cancel',e=>{e.preventDefault();shut();});
 dialog.addEventListener('close',()=>{document.documentElement.classList.remove('cinema-open');});
 prev.addEventListener('click',()=>navigate(current-1));next.addEventListener('click',()=>navigate(current+1));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();navigate(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();navigate(current-1);}});
 reduced.addEventListener('change',()=>{timeline?.progress(1);});
}
