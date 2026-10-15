import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/** Image-based 2.5D: authored views and a transparent architectural foreground.
 * No primitive WebGL scene and no alternate low-fidelity software renderer. */
const world = document.querySelector<HTMLElement>('.world')!;
const entrance = document.querySelector<HTMLElement>('.journey-entrance')!;
const corridor = document.querySelector<HTMLElement>('.journey-corridor')!;
const mandap = document.querySelector<HTMLElement>('.journey-mandap')!;
const portal = document.querySelector<HTMLElement>('.journey-portal')!;
const shade = document.querySelector<HTMLElement>('.world-shade')!;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = gsap.utils.clamp(0, 1);
const smooth = (value: number) => { const t=clamp(value); return t*t*(3-2*t); };
let frame = 0;
let stops = { invitation: 0, story: 0, corridor: 0, mandap: 0, wedding: 0, venue: 0 };
const top = (selector:string) => document.querySelector<HTMLElement>(selector)!.getBoundingClientRect().top + scrollY;
function measure() {
  stops = {invitation:top('#invitation'),story:top('#story'),corridor:top('.corridor-vista'),mandap:top('.mandap-arrival'),wedding:top('#shubh-vivah'),venue:top('#venue')};
  schedule();
}
function paint() {
  frame=0;
  const y=scrollY, h=innerHeight;
  const entering=smooth((y-h*.13)/Math.max(1,stops.invitation-h*.13));
  const arriving=smooth((y-(stops.mandap-h*.65))/Math.max(1,h*.8));
  const passage=clamp((y-stops.invitation)/Math.max(1,stops.mandap-stops.invitation));
  const finale=clamp((y-stops.mandap)/Math.max(1,stops.venue+h-stops.mandap));
  // A new view is not revealed until its image has loaded; the entrance stays behind it.
  const corridorImage=corridor.querySelector('img')!;
  const mandapImage=mandap.querySelector('img')!;
  corridor.style.opacity=String(corridorImage.complete && corridorImage.naturalWidth && entering>0 ? 1 : 0);
  corridor.style.maskImage=entering>=.99?'none':`radial-gradient(ellipse ${Math.max(.1,entering*160)}% ${Math.max(.1,entering*160)}% at 50% 46%, #000 72%, transparent 100%)`;
  mandap.style.opacity=String(mandapImage.complete && mandapImage.naturalWidth ? arriving : 0);
  if(reduced.matches){
    corridor.style.maskImage='none';corridor.style.opacity=String(corridorImage.complete && corridorImage.naturalWidth && entering>.5 ? 1 : 0);
    entrance.style.transform=corridor.style.transform=mandap.style.transform='none';
    portal.style.opacity='0';
  }else{
    entrance.style.transform=`scale(${1+entering*.18})`;
    corridor.style.transform=`scale(${1.04+passage*.17}) translate3d(${Math.sin(passage*Math.PI)*-.6}%,${passage*-.8}%,0)`;
    mandap.style.transform=`scale(${1.035+finale*.10})`;
    portal.style.transform=`translateZ(${entering*650}px)`;
    portal.style.opacity=String((1-smooth((entering-.45)/.55))*.95);
  }
  // Let the architecture breathe in the two short, content-free transitions.
  const vista=1-smooth(Math.abs(y+h*.5-(stops.corridor+h*.34))/(h*.75));
  const mandapVista=1-smooth(Math.abs(y+h*.5-(stops.mandap+h*.44))/(h*.85));
  shade.style.opacity=String(1-Math.max(vista,mandapVista)*.72);
  world.dataset.scene=arriving>.5?'mandap':entering>.5?'corridor':'entrance';
}
function schedule(){if(!frame)frame=requestAnimationFrame(paint);}
addEventListener('scroll',schedule,{passive:true});
addEventListener('resize',measure);
addEventListener('pageshow',measure);
reduced.addEventListener('change',schedule);
world.querySelectorAll('img').forEach(img=>img.addEventListener('load',schedule));
new ResizeObserver(measure).observe(document.querySelector('main')!);
document.fonts.ready.then(measure);
measure();

// Move each illustrated invitation as a single sheet: its art and text share edges.
const media=gsap.matchMedia();
media.add('(prefers-reduced-motion: no-preference)',()=>{
 gsap.from('.arrival-copy',{autoAlpha:0,y:18,duration:1.25,ease:'power2.out'});
 document.querySelectorAll<HTMLElement>('.event-sheet').forEach((sheet,i)=>{
  gsap.from(sheet,{rotationY:i%2?-9:9,rotationZ:i%2?2:-2,y:80,opacity:.25,scale:.94,ease:'none',scrollTrigger:{trigger:sheet.parentElement,start:'top 95%',end:'top 30%',scrub:.65}});
 });
});
document.querySelector('.letter')?.addEventListener('toggle',()=>{measure();ScrollTrigger.refresh();});
