// Natural scroll, independent readable HTML and a complete static fallback.
const root = document.documentElement;
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
const constrained = Boolean(connection?.saveData || ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 2);
let motion = !preference.matches;
const running = new Set<Animation>();
function animate(el: Element, frames: Keyframe[], options: KeyframeAnimationOptions) {
  if (!motion) return;
  const animation = el.animate(frames, options);
  running.add(animation);
  animation.onfinish = () => { running.delete(animation); animation.cancel(); };
}
const opening = document.querySelector<HTMLElement>('.opening');
const heroImage = document.querySelector<HTMLElement>('.hero-scenery>img');
const scenes = Array.from(document.querySelectorAll<HTMLElement>('.event,[data-scroll-scene]'));
let heroVisible=true, frame=0, lastFrame=0;
const canvas=document.querySelector<HTMLCanvasElement>('#silk-canvas');
const ctx=canvas?.getContext('2d');
let width=0,height=0,pointerX=0,pointerY=0;
function resizeCanvas(){
  if(!canvas||!opening||!ctx)return;
  width=opening.clientWidth;height=opening.clientHeight;
  const ratio=Math.min(devicePixelRatio||1,constrained?1:1.5);
  canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
  ctx.setTransform(ratio,0,0,ratio,0,0);
}
function draw(time:number){
  frame=0;
  if(!motion||!heroVisible||document.hidden||!ctx||!canvas)return;
  frame=requestAnimationFrame(draw);
  if(time-lastFrame<33)return;
  lastFrame=time;ctx.clearRect(0,0,width,height);
  const t=time*.00022;
  // A small number of silk-like luminous curves; no sprites or image textures.
  for(let i=0;i<(constrained?12:20);i++){
    const phase=i*.14;const sway=Math.sin(t+phase)*width*.07;
    const left=i%2===0;
    const edge=left?width*.06:width*.94;
    const bend=left?width*.21:width*.79;
    ctx.beginPath();ctx.moveTo(edge+Math.sin(t+phase)*35,-40);
    ctx.bezierCurveTo(bend+sway+pointerX,height*.2,edge-sway,height*.63,edge+Math.cos(t+phase)*60+pointerX,height+40);
    ctx.strokeStyle=`rgba(255,${170+i*3},${95+i*3},${.08+i*.009})`;ctx.lineWidth=.7;ctx.stroke();
    const y=((t*.055+phase*.8)%1)*height;
    ctx.beginPath();ctx.arc(edge+Math.sin(y/height*6+t)*width*.06+pointerX,y+pointerY,1.1,0,Math.PI*2);ctx.fillStyle='rgba(255,222,161,.6)';ctx.fill();
  }
}
function startCanvas(){if(!frame&&motion&&heroVisible&&!document.hidden)frame=requestAnimationFrame(draw);}
function stopCanvas(){cancelAnimationFrame(frame);frame=0;ctx?.clearRect(0,0,width,height);}
function syncMotion(){
  root.dataset.motion=motion?'on':'off';
  if(!motion){running.forEach(a=>a.cancel());running.clear();stopCanvas();if(heroImage)heroImage.style.transform='';}
  else startCanvas();
}
syncMotion();resizeCanvas();
preference.addEventListener('change',()=>{motion=!preference.matches;syncMotion();updateScroll();});
window.addEventListener('resize',resizeCanvas,{passive:true});
opening?.addEventListener('pointermove',event=>{if(event.pointerType==='mouse'){pointerX=(event.clientX/innerWidth-.5)*20;pointerY=(event.clientY/innerHeight-.5)*10;}},{passive:true});
opening?.addEventListener('pointerleave',()=>{pointerX=0;pointerY=0;});
// The typography stays above all scenery throughout the entrance and scroll.
if(heroImage)animate(heroImage,[{transform:'scale(1.35)'},{transform:'scale(1.09)'}],{duration:2300,easing:'cubic-bezier(.15,.6,.2,1)'});
document.querySelectorAll('.hero-copy h1>span').forEach((el,i)=>animate(el,[{opacity:.4,transform:`translateY(${i?30:-30}px)`,letterSpacing:'.03em'},{opacity:1,transform:'translateY(0)',letterSpacing:'-.045em'}],{duration:1600,delay:i*100,easing:'cubic-bezier(.2,.7,.2,1)'}));
if('IntersectionObserver' in window){
 const visible=new IntersectionObserver(entries=>{entries.forEach(entry=>{
  entry.target.classList.toggle('is-visible',entry.isIntersecting);
  if(entry.target===opening){heroVisible=entry.isIntersecting;if(heroVisible)startCanvas();else stopCanvas();}
 });},{threshold:0});
 document.querySelectorAll('.opening,.event,.celebration-ribbon').forEach(el=>visible.observe(el));
 const reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target;
  if(el.hasAttribute('data-path-scene'))el.querySelectorAll('.draw-path').forEach((path,i)=>animate(path,[{strokeDasharray:'1',strokeDashoffset:'1'},{strokeDasharray:'1',strokeDashoffset:'0'}],{duration:2200,delay:i*130,easing:'ease-out'}));
  else if(el.classList.contains('scene-art')){
    const art=el.querySelector('.ceremony-illustration');
    if(art)animate(art,[{opacity:.2,transform:'translateY(50px) scale(.78)',clipPath:'inset(12% 6% 0 6%)'},{opacity:1,transform:'translateY(0) scale(1)',clipPath:'inset(0% 0% 0% 0%)'}],{duration:1800,easing:'cubic-bezier(.16,1,.3,1)'});
    if(el.classList.contains('scene-blessings'))el.querySelectorAll('.ceremony-flower').forEach((flower,i)=>animate(flower,[{translate:`${i%2?60:-60}px -95px`,opacity:0,scale:'.5'},{translate:'0 0',opacity:1,scale:'1'}],{duration:1800,delay:250+i*150,easing:'cubic-bezier(.2,.7,.2,1)'}));
    if(el.classList.contains('scene-sunshine'))el.querySelectorAll('.turmeric-stroke').forEach(stroke=>animate(stroke,[{strokeDasharray:'1',strokeDashoffset:'1'},{strokeDasharray:'1',strokeDashoffset:'0'}],{duration:1900,easing:'cubic-bezier(.2,.7,.2,1)'}));
    if(el.classList.contains('scene-forever'))el.querySelectorAll('.fire-rise').forEach(flame=>animate(flame,[{scale:'1 .15',opacity:.3},{scale:'1 1',opacity:1}],{duration:2300,easing:'cubic-bezier(.2,.7,.2,1)'}));
  }
  else animate(el,[{opacity:.45,transform:'translateY(30px)'},{opacity:1,transform:'translateY(0)'}],{duration:1000,easing:'cubic-bezier(.2,.7,.2,1)'});
  reveal.unobserve(el);
 });},{threshold:.2});
 document.querySelectorAll('[data-reveal],[data-path-scene],.scene-art').forEach(el=>reveal.observe(el));
}
let pending=false;
function updateScroll(){
 pending=false;if(!motion)return;
 const vh=innerHeight;
 if(opening&&heroImage&&heroVisible){const top=opening.getBoundingClientRect().top;heroImage.style.transform=`translateY(${Math.max(0,-top)*.12}px) scale(1.09)`;}
 scenes.forEach(scene=>{const r=scene.getBoundingClientRect();if(r.top>vh||r.bottom<0)return;const progress=Math.max(0,Math.min(1,(vh-r.top)/(vh+r.height)));scene.style.setProperty('--scene-progress',progress.toFixed(3));});
}
window.addEventListener('scroll',()=>{if(!pending&&motion){pending=true;requestAnimationFrame(updateScroll);}},{passive:true});
document.addEventListener('visibilitychange',()=>{root.dataset.background=String(document.hidden);running.forEach(a=>document.hidden?a.pause():a.play());if(document.hidden)stopCanvas();else startCanvas();});
updateScroll();
