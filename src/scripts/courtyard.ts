import * as THREE from 'three';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const canvas=document.querySelector<HTMLCanvasElement>('#courtyard')!;
const world=canvas.parentElement!;
let renderer:THREE.WebGLRenderer | SVGRenderer | undefined;
const software=new URLSearchParams(location.search).get('renderer')==='svg';
try {
 renderer=software?new SVGRenderer():new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'low-power'});
 if(software){canvas.hidden=true;world.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');}
 if(renderer instanceof THREE.WebGLRenderer) renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.25:1.5));
 renderer.setSize(innerWidth,innerHeight);
 if(renderer instanceof THREE.WebGLRenderer) renderer.outputColorSpace=THREE.SRGBColorSpace;
 if(renderer instanceof THREE.WebGLRenderer){renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;}
 const scene=new THREE.Scene();scene.background=new THREE.Color('#123732');scene.fog=new THREE.FogExp2('#123732',.023);
 const camera=new THREE.PerspectiveCamera(innerWidth<700?65:52,innerWidth/innerHeight,.1,150);
 const stone=new THREE.MeshStandardMaterial({color:'#506b5d',roughness:.8,metalness:.12});
 const dark=new THREE.MeshStandardMaterial({color:'#173e32',roughness:.7});
 const gold=new THREE.MeshStandardMaterial({color:'#b08b4e',metalness:.75,roughness:.32});
 const ivory=new THREE.MeshStandardMaterial({color:'#b7b59b',roughness:.6});
 const lightmat=new THREE.MeshBasicMaterial({color:'#ffe4a0'});
 scene.add(new THREE.HemisphereLight('#e6e0b9','#0b241f',2.5));
 const sun=new THREE.DirectionalLight('#ffe2ad',3);sun.position.set(-8,18,10);scene.add(sun);
 const fill=new THREE.PointLight('#dfb566',35,35,2);fill.position.set(0,5,-12);scene.add(fill);
 function mesh(g:THREE.BufferGeometry,m:THREE.Material,x:number,y:number,z:number,parent:THREE.Object3D=scene){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);parent.add(o);return o;}
 function box(w:number,h:number,d:number,m:THREE.Material,x:number,y:number,z:number,parent?:THREE.Object3D){return mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,parent);}
 box(40,.3,85,dark,0,-.3,-20);
 // A geometric stone promenade, water channel and paired arcades establish real spatial depth.
 for(let j=0;j<24;j++){box(5.7,.07,1.7,stone,0,-.1,13-j*2);for(const s of [-1,1])box(.055,.08,1.8,gold,s*2.85,0,13-j*2);}
 const water=new THREE.MeshStandardMaterial({color:'#1f6659',metalness:.75,roughness:.14,transparent:true,opacity:.88});
 box(1.35,.08,38,water,0,.01,-18);
 for(const s of [-1,1])box(.1,.1,38,gold,s*.74,.06,-18);
 function arch(x:number,z:number,scale=1){
 const group=new THREE.Group();group.position.set(x,0,z);group.scale.setScalar(scale);scene.add(group);
 for(const s of [-1,1]){mesh(new THREE.CylinderGeometry(.25,.33,4.8,24),stone,s*3,2.55,0,group);for(let k=0;k<12;k++){const angle=k*Math.PI/6;mesh(new THREE.CylinderGeometry(.025,.025,4.3,5),gold,s*3+Math.cos(angle)*.27,2.6,Math.sin(angle)*.27,group);}box(.9,.23,.96,gold,s*3,.2,0,group);box(.87,.17,.9,gold,s*3,4.85,0,group);box(.74,.12,.8,ivory,s*3,.55,0,group);}
 const shape=new THREE.Shape();shape.moveTo(-3.31,4.9);shape.absarc(0,4.9,3.31,Math.PI,0,true);shape.lineTo(2.69,4.9);shape.absarc(0,4.9,2.69,0,Math.PI,false);shape.closePath();
 const arc=mesh(new THREE.ExtrudeGeometry(shape,{depth:.65,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:1,steps:1,curveSegments:28}),stone,0,0,-.32,group);
 const curve=new THREE.EllipseCurve(0,4.9,2.76,2.76,0,Math.PI,false,0);const pts=curve.getPoints(48).map(p=>new THREE.Vector3(p.x,p.y,.36));
 const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:'#dab579'}));group.add(line);
 box(7,.25,.95,gold,0,8.1,0,group);box(7.3,.15,1,stone,0,8.35,0,group);
 return group;
 }
 for(let j=0;j<8;j++){arch(0,8-j*7);for(const side of [-1,1]){box(.24,.25,7.1,gold,side*3.03,5.15,4.5-j*7);box(1.6,.5,1.6,stone,side*4.65,.1,8-j*7);const pot=mesh(new THREE.CylinderGeometry(.5,.3,.6,16),gold,side*4.65,.65,8-j*7);mesh(new THREE.SphereGeometry(.65,20,14),dark,side*4.65,1.5,8-j*7);}}
 // Small lamps are architectural light sources, not free-floating decorative particles.
 const lamps:THREE.Mesh[]=[];
 for(let j=0;j<14;j++)for(const side of [-1,1]){const x=side*2.35,z=8-j*3.4;mesh(new THREE.CylinderGeometry(.2,.12,.18,12),gold,x,.15,z);const flame=mesh(new THREE.SphereGeometry(.065,8,6),lightmat,x,.3,z);flame.scale.y=2.4;lamps.push(flame);}
 const canopy=new THREE.Group();scene.add(canopy);canopy.position.z=-39;
 const textile=new THREE.MeshStandardMaterial({color:'#8e252a',roughness:.85,side:THREE.DoubleSide});
 for(const side of [-1,1]){box(.25,5,.25,gold,side*2.2,2.5,0,canopy);box(.25,5,.25,gold,side*2.2,2.5,-4,canopy);for(let i=0;i<9;i++){const drape=box(.19,4.7,.1,textile,side*(2.2-i*.06),2.5,.13+Math.sin(i)*.12,canopy);}}
 box(4.8,.16,4.8,textile,0,5,-2,canopy);box(5,.22,5,ivory,0,.1,-2,canopy);
 // Detailed coffer rhythm replaces billboard layers: every camera move changes occlusion and scale.
 for(let j=0;j<8;j++)for(let k=-2;k<=2;k++){box(.035,.035,6.9,gold,k*1.1,8.05,4.5-j*7);}
 if(software) scene.traverse(o=>{if(o instanceof THREE.Mesh && o.material instanceof THREE.MeshStandardMaterial){const m=o.material;o.material=new THREE.MeshLambertMaterial({color:m.color,side:m.side,transparent:m.transparent,opacity:m.opacity});}});
 // Layered screens and inset wall panels give the arcade enclosure and crafted detail.
 for(let j=0;j<7;j++)for(const side of [-1,1]){
 const z=4.5-j*7;box(.25,5.1,6.7,dark,side*5.2,2.5,z);
 for(let k=0;k<12;k++){box(.06,3.5,.035,gold,side*5.02,2.6,z-2.75+k*.5);}
 for(let k=0;k<7;k++){box(.06,.035,5.5,gold,side*5.01,1.1+k*.5,z);}
 box(.6,.16,6.8,stone,side*5.1,4.5,z);
 }
 // Recessed paving details and round brass inlays remain geometry, not a background image.
 for(let j=0;j<20;j++)for(const side of [-1,1]){const ring=mesh(new THREE.TorusGeometry(.24,.015,5,24),gold,side*1.6,.005,12-j*2);ring.rotation.x=-Math.PI/2;}
 if(software)scene.add(new THREE.AmbientLight('#b7c9b6',.5));
 const target=new THREE.Vector3();let progress=0;let targetProgress=0;let frame=0;let last=0;let lowCount=0;
 const sections=[...document.querySelectorAll<HTMLElement>('.scene')];
 const poses=[[0,3.3,20,0,3.7,-7],[.45,3.2,2,0,3.7,-15],[1.8,2.8,-9,0,3.3,-24],[-1.6,3,-16,0,3,-29],[1.3,2.5,-23,0,3,-37],[0,2.6,-31,0,2.7,-42],[0,3,-34,0,3,-42]];
 const colors=['#123732','#173d32','#183b30','#182e42','#4c4423','#461d25','#1b352e'];
 function readScroll(){last=0;const y=scrollY;let idx=0;for(let i=0;i<sections.length;i++)if(sections[i].offsetTop<=y)idx=i;const current=sections[idx],next=sections[idx+1];const amount=next?THREE.MathUtils.clamp((y-current.offsetTop)/(next.offsetTop-current.offsetTop),0,1):0;targetProgress=Math.min(poses.length-1,idx+amount);}
 function render(t:number){frame=requestAnimationFrame(render);if(document.hidden)return;if(software && Math.abs(progress-targetProgress)<.001 && last>0)return;if(t-last<(software?100:30))return;const elapsed=t-last;last=t;if(elapsed>65)lowCount++;if(lowCount===30){if(renderer instanceof THREE.WebGLRenderer)renderer.setPixelRatio(1);lowCount++;}progress=reduced.matches?0:THREE.MathUtils.lerp(progress,targetProgress,.075);const i=Math.min(poses.length-1,Math.floor(progress)),j=Math.min(i+1,poses.length-1),f=progress-i;const a=poses[i],b=poses[j];camera.position.set(THREE.MathUtils.lerp(a[0],b[0],f),THREE.MathUtils.lerp(a[1],b[1],f),THREE.MathUtils.lerp(a[2],b[2],f));target.set(THREE.MathUtils.lerp(a[3],b[3],f),THREE.MathUtils.lerp(a[4],b[4],f),THREE.MathUtils.lerp(a[5],b[5],f));camera.lookAt(target);const col=new THREE.Color(colors[i]).lerp(new THREE.Color(colors[j]),f);scene.background=col;(scene.fog as THREE.FogExp2).color.copy(col);if(!reduced.matches)lamps.forEach((l,k)=>l.scale.y=2.3+Math.sin(t*.003+k)*.2);renderer!.render(scene,camera);world.classList.add('ready');}
 addEventListener('scroll',readScroll,{passive:true});addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.fov=innerWidth<700?65:52;camera.updateProjectionMatrix();renderer!.setSize(innerWidth,innerHeight);readScroll();});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);world.classList.remove('ready');});
 readScroll();frame=requestAnimationFrame(render);
} catch(error){console.warn('The illustrated courtyard fallback is active.',error);if(renderer instanceof THREE.WebGLRenderer)renderer.dispose();}
if(!reduced.matches){gsap.from('.arrival-copy',{opacity:0,y:25,duration:1.5,ease:'power2.out'});document.querySelectorAll('.celebration').forEach((section,i)=>{gsap.from(section.querySelector('.event-art'),{rotationY:i%2?-20:20,rotationZ:i%2?5:-5,y:110,x:i%2?60:-60,opacity:.15,scale:.86,ease:'none',scrollTrigger:{trigger:section,start:'top 95%',end:'top 25%',scrub:1}});});}
document.querySelector('.letter')?.addEventListener('toggle',()=>ScrollTrigger.refresh());
