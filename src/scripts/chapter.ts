// Progressive enhancement: content is readable before scripts, without scripts,
// and with reduced motion. Natural scrolling remains in control throughout.
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let motion = !preference.matches;
const animations = new Set<Animation>();
const ease = 'cubic-bezier(.16,1,.3,1)';
function play(el: Element | null, frames: Keyframe[], duration=1300, delay=0){
  if(!el || !motion) return;
  const a=el.animate(frames,{duration,delay,easing:ease,fill:'backwards'});
  animations.add(a);a.onfinish=()=>{animations.delete(a);a.cancel();};
}
function sync(){document.documentElement.dataset.motion=motion?'on':'off';if(!motion){animations.forEach(a=>a.cancel());animations.clear();}}
sync();preference.addEventListener('change',()=>{motion=!preference.matches;sync();});
// The architectural opening parts around the names, never in front of them.
for(const [selector,direction] of [['.door-left',-1],['.door-right',1]] as const){play(document.querySelector(selector),[{opacity:1,transform:'perspective(1200px) rotateY(0deg)'},{opacity:1,offset:.35},{opacity:0,transform:`perspective(1200px) rotateY(${direction*100}deg)`}],1900);}
play(document.querySelector('.hero-copy'),[{opacity:.35,transform:'translateY(35px)'},{opacity:1,transform:'translateY(0)'}],1700);
const envelope=document.querySelector<HTMLDetailsElement>('#wedding-envelope');
envelope?.addEventListener('toggle',()=>{if(envelope.open)play(envelope.querySelector('.letter-paper'),[{opacity:.2,transform:'perspective(1000px) translateY(-40px) rotateX(-18deg)',clipPath:'inset(0 0 85% 0)'},{opacity:1,transform:'perspective(1000px) translateY(0) rotateX(0deg)',clipPath:'inset(0 0 0% 0)'}],1250);});
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target as HTMLElement;
  if(el.classList.contains('folio-event')){
   const index=Number(el.dataset.chapter), side=index%2?-1:1;
   // Full invitation pages arrive and settle; the illustrated gatefold opens.
   play(el.querySelector('.folio-sheet'),[{opacity:.2,transform:`translate3d(${side*85}px,95px,0) rotate(${side*7}deg) rotateY(${side*16}deg) scale(.86)`},{opacity:1,transform:'translate3d(0,0,0) rotate(0deg) rotateY(0deg) scale(1)'}],1550);
   for(const [leaf,dir] of [['.leaf-left',-1],['.leaf-right',1]] as const)play(el.querySelector(leaf),[{opacity:1,transform:'rotateY(0deg)'},{opacity:1,offset:.35},{opacity:0,transform:`rotateY(${dir*110}deg)`}],1450,220);
   play(el.querySelector('.event-main'),[{opacity:.25,transform:'translateY(30px)'},{opacity:1,transform:'translateY(0)'}],1200,170);
   play(el.querySelector('.folio-art>img'),[{transform:'scale(1.18)'},{transform:'scale(1)'}],2200);
  }else if(el.hasAttribute('data-path-scene')){
   el.querySelectorAll('.draw-path').forEach((p,i)=>play(p,[{strokeDasharray:'1',strokeDashoffset:'1'},{strokeDasharray:'1',strokeDashoffset:'0'}],2200,i*150));
  }else play(el,[{opacity:.3,transform:'translateY(40px)'},{opacity:1,transform:'translateY(0)'}],1300);
  observer.unobserve(el);
 });},{threshold:.08});
 document.querySelectorAll('.folio-event,[data-reveal],[data-path-scene],.letter-heading,.envelope,.celebration-intro h2').forEach(el=>observer.observe(el));
}
document.addEventListener('visibilitychange',()=>animations.forEach(a=>document.hidden?a.pause():a.play()));
