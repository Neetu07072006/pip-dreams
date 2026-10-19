import { useEffect,useRef,useState } from "react";
import confetti from "canvas-confetti";
import { motion,AnimatePresence,useReducedMotion } from "motion/react";
import { Music2,Lamp,Map,ArrowDown,Star,X,Heart,Orbit,ChevronRight,Sparkles,Check,Moon,RotateCcw,MoonStar,Package,Cloud,Wind,Radar,Gift,Fuel,Gauge,ScanLine,RefreshCw } from "lucide-react";
import Header from "./components/Header";
import CursorTrail from "./components/CursorTrail";
import LullabyStudio from "./components/LullabyStudio";
import "./App.css";
import "./components/LullabyStudio.css";

const projects=[
{title:"The Lullaby Lab",category:"Sound experiment · Project 01",image:"/pip_lullaby_box.png",description:"A pocket-sized sound studio where soft notes become blankets. Pip mixes moon-hums, tiny chimes, and a little bit of quiet until the whole room feels safe.",status:"Making magic",action:"Try the lullaby"},
{title:"Nightlight Collection",category:"Tiny comforts · Project 02",image:"/pip_dream_lantern.png",description:"A collection of tiny lights for the hours when the world feels too big. Each lantern keeps a little warmth for anyone who needs it.",status:"Glowing softly",action:"Find a light"},
{title:"Dream Delivery Routes",category:"Cloud logistics · Project 03",image:"/pip_avatar_cloud.png",description:"Pip maps secret cloud paths and delivers good dreams to sleepy windows, one little star at a time.",status:"In the clouds",action:"Follow the stars"}
];
const story=[
{icon:"🌙",title:"A little hello",text:"Somewhere between the last sunset and the first star, Pip opened a tiny observatory in the clouds. Armed with a warm nightcap and a pocket full of stardust, every evening begins with a single promise: nobody has to feel alone in the dark."},
{icon:"✨",title:"Collecting wonder",text:"Every stray light that drifts across the sleepy rooftops holds a forgotten wish. Pip catches them in glass jars, polishes them with moonbeams, and weaves them into lullabies that guide tired little dreamers back to sleep."},
{icon:"💤",title:"A softer night",text:"The observatory is never truly closed. For the restless, the curious, and anyone who needs an extra reason to smile, Pip keeps a lantern burning bright—proving that even the quietest midnight hours are full of magic."}
];
const wishColors=["#f3a1c4","#e5d8ff","#ffe8a8"];
const cozyQuotes=[
"Even the smallest light can make a big night feel gentle.",
"You don't have to shine brightly every day. A little glow is enough.",
"Somewhere, a star is keeping your place in the sky.",
"Rest is not falling behind. Even the moon takes its time.",
"You made it through today. Let that be enough for tonight.",
"A little warmth can turn an unfamiliar dark into home.",
"The stars never hurry, and somehow the sky still gets filled with wonder."
];
const cargoItems=[
{name:"Extra Fluffy Cumulus",icon:"☁️",description:"One cloud, freshly fluffed by the west wind. Ideal for exceptionally soft landings."},
{name:"Moonbeam Extract",icon:"🌙",description:"Three drops of moonlight, bottled just before midnight. Apply to a gloomy dream."},
{name:"Emergency Stardust",icon:"✨",description:"A tiny reserve of sparkle for dreams that need a little extra magic."},
{name:"Pocket-Sized Sunrise",icon:"🌅",description:"For sleepy windows that need a reminder that tomorrow can be kinder."}
];
const dispatches=[
"Delivering sweet dreams to a sleepy kitten.",
"A warm blanket is en route to the moon's far side.",
"Sector 7G: One tiny hope for a restless stargazer.",
"Cloud cargo detected: three giggles and a moon cookie.",
"Emergency sunshine dispatched to a rainy dream.",
"Pip is delivering a pocket-sized sunrise to window 12."
];

function ImageOrFallback({src,alt,className=""}){
const [failed,setFailed]=useState(false);
useEffect(()=>setFailed(false),[src]);
return failed?<div className={`image-fallback ${className}`} role="img" aria-label={alt}>🌙✨</div>:<img className={className} src={src} alt={alt} loading="lazy" onError={()=>setFailed(true)} style={{maxWidth:"100%",maxHeight:"100%",width:"100%",height:"100%",objectFit:"contain",display:"block"}}/>;
}

function SectionHeading({icon:Icon,eyebrow,title,subtitle}){
return <div className="section-heading"><div><p className="eyebrow"><Icon size={14}/> {eyebrow}</p><h2>{title}</h2></div><p>{subtitle}</p></div>;
}

function playMagicChime(muted){
if(muted)return;
let ctx;
try{
ctx=new (window.AudioContext||window.webkitAudioContext)();
[659.25,783.99,1046.5,1318.51].forEach((frequency,i)=>{
const start=ctx.currentTime+i*.075;
const osc=ctx.createOscillator(),gain=ctx.createGain();
osc.type="sine";
osc.frequency.value=frequency;
gain.gain.setValueAtTime(.0001,start);
gain.gain.exponentialRampToValueAtTime(.045,start+.025);
gain.gain.exponentialRampToValueAtTime(.0001,start+.55);
osc.connect(gain);
gain.connect(ctx.destination);
osc.start(start);
osc.stop(start+.58);
});
window.setTimeout(()=>{if(ctx.state!=="closed")ctx.close();},1100);
}catch{}
}

function NightlightExperience({muted,onClose}){
const [quoteIndex,setQuoteIndex]=useState(()=>Math.floor(Math.random()*cozyQuotes.length));
const [revealCount,setRevealCount]=useState(1);
const [gameUnlocked,setGameUnlocked]=useState(false);
const [gameStarted,setGameStarted]=useState(false);
const [collected,setCollected]=useState(0);
const [wizardSleeping,setWizardSleeping]=useState(false);
const [burst,setBurst]=useState(0);
const [constellation,setConstellation]=useState(false);
const [wind,setWind]=useState(false);
const reducedMotion=useReducedMotion();
const windTimer=useRef(null);
useEffect(()=>()=>window.clearTimeout(windTimer.current),[]);

const revealLight=()=>{
const nextCount=revealCount+1;
setRevealCount(nextCount);
setQuoteIndex(current=>{
if(cozyQuotes.length<2)return current;
let next=current;
while(next===current)next=Math.floor(Math.random()*cozyQuotes.length);
return next;
});
setConstellation(true);
setWind(true);
setBurst(value=>value+1);
playMagicChime(muted);
confetti({particleCount:reducedMotion?8:30,spread:100,startVelocity:18,gravity:.6,ticks:90,origin:{x:.5,y:.55},colors:wishColors,scalar:.7});
window.clearTimeout(windTimer.current);
windTimer.current=window.setTimeout(()=>setWind(false),1100);
if(nextCount>=5)setGameUnlocked(true);
};

const collectStar=()=>{
if(wizardSleeping)return;
setCollected(value=>value+1);
playMagicChime(muted);
confetti({particleCount:14,spread:65,startVelocity:15,origin:{x:Math.random()*.6+.2,y:.45},colors:["#ffe8a8","#ffffff","#e5d8ff"],scalar:.6});
};

return <div className="nightlight-experience">
<div className="nightlight-topline"><span><Moon size={15}/> PIP'S NIGHTLIGHT</span><button className="nightlight-close" onClick={onClose} aria-label="Close nightlight"><X size={18}/></button></div>
<AnimatePresence mode="wait">
{!gameStarted?<motion.div key="reveal" className={`nightlight-scene ${constellation?"constellation-active":""} ${wind?"nightlight-wind":""}`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.3}}>
<div className="constellation-sky" aria-hidden="true"><svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid meet"><motion.path d="M42 60 L96 35 L137 77 L190 45 L228 91 L286 52 L304 118 L245 151 L190 125 L137 165 L82 127 L42 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" initial={{pathLength:0,opacity:0}} animate={{pathLength:constellation?1:0,opacity:constellation?.85:0}} transition={{duration:1.5}}/>{[[42,60],[96,35],[137,77],[190,45],[228,91],[286,52],[304,118],[245,151],[190,125],[137,165],[82,127]].map(([cx,cy],i)=><motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={i%3===0?3.5:2.4} fill="currentColor" initial={{opacity:0,scale:0}} animate={{opacity:constellation?1:.45,scale:constellation?1:.7}} transition={{delay:constellation?i*.07:0,duration:.4}}/>)}</svg></div>
<motion.div className="nightlight-glow" animate={reducedMotion?{}:{scale:[1,1.045,1],opacity:[.75,1,.75]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}}><span className="nightlight-moon">☾</span><span className="nightlight-lantern">✧</span></motion.div>
<div className="nightlight-floating-stars" key={burst} aria-hidden="true">{Array.from({length:12},(_,i)=><motion.span key={`${burst}-${i}`} initial={{opacity:0,x:0,y:0,scale:0}} animate={{opacity:[0,1,0],x:Math.cos(i*Math.PI/6)*(65+(i%3)*25),y:Math.sin(i*Math.PI/6)*(55+(i%4)*16),scale:[0,1,.4]}} transition={{duration:1.5,delay:i*.025}} style={{left:"50%",top:"50%"}}>✦</motion.span>)}</div>
<AnimatePresence mode="wait"><motion.div key={quoteIndex} className="nightlight-quote" initial={{opacity:0,y:12,rotateX:-12}} animate={{opacity:1,y:0,rotateX:0}} exit={{opacity:0,y:-10}} transition={{duration:.35}}><Sparkles size={18}/><p>“{cozyQuotes[quoteIndex]}”</p><span>A tiny note from the night sky</span></motion.div></AnimatePresence>
<div className={`nightlight-status ${burst?"nightlight-status-warm":""}`}><span className="nightlight-status-dot"/>Glowing softly</div>
<div className="nightlight-actions"><button className="nightlight-primary" onClick={revealLight}><Sparkles size={17}/> Find another light <ChevronRight size={16}/></button>{gameUnlocked&&<motion.button className="nightlight-game-button" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} onClick={()=>setGameStarted(true)}><Star size={17}/> Secret unlocked · Collect stars</motion.button>}</div>
<p className="nightlight-progress">{Math.min(revealCount,5)} / 5 lights discovered</p>
</motion.div>:<motion.div key="game" className="star-game" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.95}}>
<div className="star-game-heading"><MoonStar size={27}/><h3>{wizardSleeping?"Pip is fast asleep":"The Lantern Drop"}</h3><p>{wizardSleeping?"The little wizard is dreaming under the stars.":"Tap the floating stars to collect a little magic."}</p></div>
<div className={`star-game-sky ${wizardSleeping?"wizard-sleeping":""}`}>{Array.from({length:12},(_,i)=><motion.button key={i} className={`collectible-star star-position-${i%6}`} style={{left:`${8+(i*29)%84}%`,top:`${8+(i*37)%78}%`}} animate={reducedMotion||wizardSleeping?{}:{y:[0,-8,0],rotate:[0,12,-12,0]}} transition={{duration:2+i%3,repeat:Infinity,delay:i*.08}} onClick={collectStar} aria-label="Collect a star" disabled={wizardSleeping}>✦</motion.button>)}<div className="sleepy-wizard" role="img" aria-label={wizardSleeping?"Sleeping star wizard":"Star wizard"}>{wizardSleeping?"😴":"🧙🏻‍♂️"}</div></div>
<p className="star-score"><Star size={17}/> {collected} {collected===1?"star":"stars"} collected</p>
<div className="star-game-actions"><button className="nightlight-primary" onClick={()=>setWizardSleeping(value=>!value)}>{wizardSleeping?<Sparkles size={17}/>:<Moon size={17}/>} {wizardSleeping?"Wake Pip gently":"Tuck Pip into sleep"}</button><button className="nightlight-secondary" onClick={()=>{setCollected(0);setWizardSleeping(false);}}><RotateCcw size={16}/> Start over</button><button className="nightlight-secondary" onClick={()=>setGameStarted(false)}>Back to lantern</button></div>
</motion.div>}
</AnimatePresence>
</div>;
}

function DreamDeliveryExperience({onClose,muted}){
const [step,setStep]=useState(0);
const [pipSleeping,setPipSleeping]=useState(false);
const [gust,setGust]=useState(false);
const [cargoOpen,setCargoOpen]=useState(false);
const [selectedCargo,setSelectedCargo]=useState(null);
const [delivered,setDelivered]=useState(false);
const [scans,setScans]=useState(0);
const [fuel,setFuel]=useState(68);
const [fluff,setFluff]=useState(76);
const [dispatch,setDispatch]=useState(()=>dispatches[Math.floor(Math.random()*dispatches.length)]);
const [radarPing,setRadarPing]=useState(0);
const [ticketOpen,setTicketOpen]=useState(false);
const [scratchProgress,setScratchProgress]=useState(0);
const [scratching,setScratching]=useState(false);
const [receipt,setReceipt]=useState("");
const [logs,setLogs]=useState(["SYSTEM READY · Waiting for a star-route request..."]);
const reducedMotion=useReducedMotion();
const gustTimer=useRef(null);
const sectors=["Sector 7G","Moon Dock 2","Cloud Lane 9","Stardust Bay","Sleepy Valley","Comet Crossing"];
const statuses=[
{label:"Package picked up from the Milky Way",icon:"🌌",detail:"Cargo secured. Stardust bubble wrap applied."},
{label:"Passing the sleepy moon",icon:"🌙",detail:"A quick wave to the moon. No delays reported."},
{label:"Navigating a cloud maze",icon:"☁️",detail:"Autopilot corrected for a minor fluff-related detour."},
{label:"Out for dream delivery",icon:"🛷",detail:"Pip is approaching your window. Please keep your dreams unlocked."},
{label:"Dream delivered successfully!",icon:"💝",detail:"One fresh, cozy dream delivered. Signature: a sleepy smile."}
];
useEffect(()=>()=>window.clearTimeout(gustTimer.current),[]);
const addLog=message=>setLogs(prev=>[message,...prev].slice(0,4));
const togglePipSleep=()=>{
setPipSleeping(value=>!value);
playMagicChime(muted);
};
const advance=()=>{
if(step<statuses.length-1){
const next=step+1;
setStep(next);
setScans(value=>value+1);
setGust(true);
addLog(`ROUTE UPDATE · ${statuses[next].label}`);
playMagicChime(muted);
confetti({particleCount:reducedMotion?8:22,spread:85,startVelocity:14,origin:{x:.5,y:.5},colors:wishColors,scalar:.7});
window.clearTimeout(gustTimer.current);
gustTimer.current=window.setTimeout(()=>setGust(false),900);
if(next===statuses.length-1)setDelivered(true);
}else{
setStep(0);
setDelivered(false);
setScans(0);
addLog("NEW ROUTE · Pip is ready for another delivery.");
}
};
const pingSector=()=>{
const sector=sectors[Math.floor(Math.random()*sectors.length)];
const message=dispatches[Math.floor(Math.random()*dispatches.length)];
setDispatch(message);
setRadarPing(value=>value+1);
setScans(value=>value+1);
addLog(`${sector.toUpperCase()} · ${message}`);
playMagicChime(muted);
confetti({particleCount:reducedMotion?5:12,spread:70,origin:{x:.72,y:.42},colors:wishColors,scalar:.55});
};
const openTicket=()=>{
const receipts=[
"DELIVERY RECEIPT #PIP-07G · One fresh dream, carefully wrapped in moonlight.",
"CARGO NOTE · Two spoonfuls of courage and one emergency cloud cookie.",
"PIP'S PROMISE · Tomorrow gets another chance to be wonderful.",
"ROUTE COMPLETE · One sleepy kitten received 3 hugs and a cloud-shaped pillow.",
"CUSTOMS DECLARATION · 100% stardust, 0% grown-up worries."
];
setReceipt(receipts[Math.floor(Math.random()*receipts.length)]);
setScratchProgress(0);
setTicketOpen(true);
};
const scratch=()=>{if(scratching)setScratchProgress(value=>Math.min(100,value+13));};
const finishScratch=()=>{
setScratching(false);
if(scratchProgress>=35){
confetti({particleCount:reducedMotion?8:26,spread:85,colors:wishColors,scalar:.7});
playMagicChime(muted);
}
};
const fuelLabel=fuel<25?"Running on moon crumbs":fuel>80?"Zoomies engaged":"Cruising among the stars";
const fluffLabel=fluff<25?"A little bumpy":fluff>80?"Marshmallow mode":"Cloud-soft landing";
return <div className={`delivery-experience ${pipSleeping?"pip-sleeping":""}`}>
<div className="delivery-topline"><span><Package size={16}/> PIP'S DREAM DISPATCH</span><button className="nightlight-close" onClick={onClose} aria-label="Close delivery tracker"><X size={18}/></button></div>
<div className="delivery-scene">
<div className="delivery-coordinates"><Radar size={14}/><span>RA 03h 24m</span><span>·</span><span>Dec +42°</span><span>·</span><span>SECTOR {String(7+step).padStart(2,"0")}</span></div>
<div className="dispatch-radar-panel">
<div className="dispatch-radar"><div className="radar-ring radar-ring-one"/><div className="radar-ring radar-ring-two"/><div className="radar-ring radar-ring-three"/><div className="radar-crosshair radar-crosshair-x"/><div className="radar-crosshair radar-crosshair-y"/><motion.div className="radar-sweep" animate={reducedMotion?{}:{rotate:360}} transition={{duration:5,repeat:Infinity,ease:"linear"}}/>{[{x:24,y:33},{x:68,y:25},{x:72,y:66},{x:39,y:75},{x:52,y:48}].map((point,i)=><motion.button key={`${radarPing}-${i}`} className={`radar-point ${i===radarPing%5?"radar-point-active":""}`} style={{left:`${point.x}%`,top:`${point.y}%`}} onClick={pingSector} aria-label={`Ping delivery sector ${i+1}`} animate={reducedMotion?{}:{scale:[1,1.25,1],opacity:[.7,1,.7]}} transition={{duration:1.8,repeat:Infinity,delay:i*.2}}/>)}<span className="radar-center">PIP</span></div>
<div className="dispatch-terminal"><p className="terminal-label"><ScanLine size={13}/> DREAM DISPATCH TERMINAL <span className="terminal-live">LIVE</span></p><AnimatePresence mode="wait"><motion.p key={dispatch} className="terminal-message" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.2}}>{dispatch}</motion.p></AnimatePresence><div className="terminal-log">{logs.map((log,i)=><p key={`${log}-${i}`}><span>›</span> {log}</p>)}</div><button className="nightlight-secondary" onClick={pingSector}><Radar size={15}/> Ping another sector</button></div>
</div>
<motion.div className={`delivery-art ${gust?"delivery-gust":""}`} animate={reducedMotion?{}:{y:pipSleeping?[0,2,0]:[0,-6,0],rotate:gust?[-2,2,0]:0,scale:1+(fluff-50)/1500}} transition={{y:{duration:pipSleeping?4:3,repeat:Infinity},rotate:{duration:.5},scale:{duration:.25}}}><ImageOrFallback src="/pip_avatar_cloud.png" alt="Pip flying through the stars with a dream package"/><motion.span className="delivery-orbit" aria-hidden="true" animate={reducedMotion?{}:{rotate:360}} transition={{duration:18,repeat:Infinity,ease:"linear"}}>✦ · ☾ · ✧</motion.span>{pipSleeping&&<motion.span className="pip-zzz" aria-hidden="true" initial={{opacity:0,y:8,scale:.7}} animate={{opacity:[0,1,0],y:-35,x:12,scale:1}} transition={{duration:2.2,repeat:Infinity,ease:"easeOut"}}>Zzz</motion.span>}{gust&&<motion.span className="delivery-wind" initial={{opacity:0,x:-60}} animate={{opacity:[0,1,0],x:160}} transition={{duration:.8}}>〰 〰 ✧</motion.span>}</motion.div>
<div className="delivery-status-card" aria-live="polite"><div className="delivery-status-icon">{pipSleeping?"💤":statuses[step].icon}</div><div className="delivery-status-copy"><span className="delivery-kicker">LIVE PACKAGE TRACKER</span><AnimatePresence mode="wait"><motion.div key={`${step}-${pipSleeping}`} className="delivery-status-text" initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.2}}><h3>{pipSleeping?"Fast asleep":statuses[step].label}</h3><p>{pipSleeping?"Pip is snoozing under the starlight. The dream route can wait a little.":statuses[step].detail}</p></motion.div></AnimatePresence></div></div>
<div className="delivery-progress"><div className="delivery-progress-track"><motion.span animate={{width:`${step/(statuses.length-1)*100}%`}} transition={{duration:.45}}/></div><div className="delivery-progress-labels"><span>Picked up</span><span>Delivered</span></div></div>
{delivered&&<motion.p className="delivery-dispatch-note" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}><Wind size={16}/> Dispatch note: minor stardust turbulence. One cloud sneezed. All dreams arrived safely.</motion.p>}
</div>
<div className="cargo-controls">
<div className="cargo-control-heading"><Gauge size={16}/><div><strong>Cloud-cart diagnostics</strong><p>Tune Pip's dream delivery vehicle.</p></div></div>
<label className="cargo-slider-label" htmlFor="stardust-fuel" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px",width:"100%"}}><span style={{display:"inline-flex",alignItems:"center",gap:"8px"}}><Fuel size={15}/> Stardust Fuel</span><strong>{fuel}%</strong></label><input id="stardust-fuel" type="range" min="0" max="100" value={fuel} onChange={e=>setFuel(Number(e.target.value))}/><p className="cargo-slider-hint">{fuelLabel}</p>
<label className="cargo-slider-label" htmlFor="cloud-fluff" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px",width:"100%"}}><span style={{display:"inline-flex",alignItems:"center",gap:"8px"}}><Cloud size={15}/> Cloud Fluffiness</span><strong>{fluff}%</strong></label><input id="cloud-fluff" type="range" min="0" max="100" value={fluff} onChange={e=>setFluff(Number(e.target.value))}/><p className="cargo-slider-hint">{fluffLabel}</p>
<div className="cargo-meter-row"><span>Vehicle readiness</span><strong>{Math.round((fuel+fluff)/2)}%</strong></div><div className="cargo-meter"><span style={{width:`${(fuel+fluff)/2}%`}}/></div>
</div>
<div className="delivery-actions"><button className="nightlight-primary" onClick={togglePipSleep}>{pipSleeping?<Sparkles size={17}/>:<MoonStar size={17}/>} {pipSleeping?"Wake Pip Up ☀️":"Follow the stars ✨"}</button><button className="nightlight-secondary" onClick={advance}>{step===statuses.length-1?<RotateCcw size={17}/>:<Package size={17}/>} {step===statuses.length-1?"Track another dream":"Advance delivery"} <ChevronRight size={16}/></button><button className="nightlight-secondary" onClick={()=>setCargoOpen(value=>!value)}><Gift size={16}/> {cargoOpen?"Hide cargo":"Inspect cargo"} ({cargoItems.length})</button><button className="nightlight-secondary" onClick={openTicket}><Sparkles size={16}/> Scratch a dream ticket</button></div>
{cargoOpen&&<motion.div className="delivery-cargo" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}}><p className="delivery-cargo-heading"><Cloud size={15}/> PIP'S WHIMSICAL INVENTORY</p><div className="delivery-cargo-grid">{cargoItems.map(item=><button key={item.name} className={`delivery-cargo-item ${selectedCargo?.name===item.name?"selected":""}`} onClick={()=>{setSelectedCargo(item);playMagicChime(muted);}}><span>{item.icon}</span><strong>{item.name}</strong></button>)}</div>{selectedCargo&&<motion.div key={selectedCargo.name} className="delivery-cargo-detail" initial={{opacity:0,y:5}} animate={{opacity:1,y:0}}><strong>{selectedCargo.icon} {selectedCargo.name}</strong><p>{selectedCargo.description}</p></motion.div>}</motion.div>}
{ticketOpen&&<div className="dream-ticket-wrap"><div className="dream-ticket-heading"><Gift size={17}/><strong>Secret dream ticket</strong><button onClick={()=>setTicketOpen(false)} aria-label="Close dream ticket"><X size={16}/></button></div><div className={`dream-ticket ${scratchProgress>=35?"ticket-revealed":""}`} onPointerDown={()=>setScratching(true)} onPointerMove={scratch} onPointerUp={finishScratch} onPointerCancel={finishScratch} role="button" tabIndex={0} aria-label="Scratch the ticket to reveal a dispatch receipt"><div className="ticket-receipt"><Sparkles size={22}/><p>{receipt}</p><small>Signed with a sleepy smile — Pip ☾</small></div>{scratchProgress<35&&<div className="ticket-cover" style={{opacity:Math.max(.08,1-scratchProgress/100)}}><span>✦ ✧ ✦</span><strong>SCRATCH HERE</strong><small>Drag your pointer across the stardust</small></div>}</div><p className="ticket-help">{scratchProgress>=35?"Ticket revealed! Your dream receipt is ready.":"Press and drag across the golden stardust to reveal your receipt."}</p><button className="nightlight-secondary" onClick={openTicket}><RefreshCw size={14}/> New ticket</button></div>}
<p className="delivery-footnote"><Sparkles size={13}/> {scans} scanner {scans===1?"ping":"pings"} logged · Dreams delivered with care.</p>
</div>;
}

export default function App(){
const [night,setNight]=useState(true);
const [muted,setMuted]=useState(false);
const [musicNeedsInteraction,setMusicNeedsInteraction]=useState(false);
const [studioPlaying,setStudioPlaying]=useState(false);
const [selectedProject,setSelectedProject]=useState(null);
const [lullabyActive,setLullabyActive]=useState(false);
const [nightlightActive,setNightlightActive]=useState(false);
const [deliveryActive,setDeliveryActive]=useState(false);
const [activeChapter,setActiveChapter]=useState(0);
const [chapterDirection,setChapterDirection]=useState(1);
const [guestName,setGuestName]=useState("");
const [guestMessage,setGuestMessage]=useState("");
const [noteSent,setNoteSent]=useState(false);
const [guests,setGuests]=useState(()=>{try{const data=JSON.parse(localStorage.getItem("pip-guests")||"[]");return Array.isArray(data)?data:[];}catch{return [];}});
const [dreams,setDreams]=useState(()=>{try{return Number(localStorage.getItem("pip-dream-count")||0);}catch{return 0;}});
const [secret,setSecret]=useState(false);
const secretClicks=useRef(0);
const audioRef=useRef(null);
const noteTimer=useRef(null);
const reducedMotion=useReducedMotion();
const sharedTransition=reducedMotion?{duration:0}:{type:"spring",stiffness:260,damping:28};
useEffect(()=>{try{localStorage.setItem("pip-guests",JSON.stringify(guests));localStorage.setItem("pip-dream-count",String(dreams));}catch{}},[guests,dreams]);
useEffect(()=>()=>window.clearTimeout(noteTimer.current),[]);
const closeProject=()=>{
setSelectedProject(null);
setLullabyActive(false);
setNightlightActive(false);
setDeliveryActive(false);
setStudioPlaying(false);
};
useEffect(()=>{
const onKeyDown=e=>{
if(e.key==="Escape"){closeProject();setSecret(false);}
if(e.altKey&&e.key.toLowerCase()==="b"){setSecret(true);confetti({particleCount:80,spread:90,origin:{y:.65},colors:wishColors});}
};
window.addEventListener("keydown",onKeyDown);
return()=>window.removeEventListener("keydown",onKeyDown);
},[]);
useEffect(()=>{
const audio=audioRef.current;
if(!audio)return;
audio.volume=.3;
if(muted||studioPlaying){audio.pause();setMusicNeedsInteraction(false);return;}
audio.play().then(()=>setMusicNeedsInteraction(false)).catch(()=>setMusicNeedsInteraction(true));
},[muted,studioPlaying]);
const startMusic=async()=>{
const audio=audioRef.current;
if(!audio||muted||studioPlaying)return;
try{audio.volume=.3;await audio.play();setMusicNeedsInteraction(false);}catch{setMusicNeedsInteraction(true);}
};
useEffect(()=>{
if(muted||studioPlaying)return;
const unlockMusic=()=>{
const audio=audioRef.current;
if(audio?.paused&&!muted&&!studioPlaying)audio.play().then(()=>setMusicNeedsInteraction(false)).catch(()=>setMusicNeedsInteraction(true));
};
window.addEventListener("pointerdown",unlockMusic);
window.addEventListener("keydown",unlockMusic);
return()=>{window.removeEventListener("pointerdown",unlockMusic);window.removeEventListener("keydown",unlockMusic);};
},[muted,studioPlaying]);
const handleStudioPlayback=playing=>setStudioPlaying(Boolean(playing));
const playChime=()=>playMagicChime(muted);
const makeWish=()=>{
setDreams(n=>n+1);
confetti({particleCount:45,spread:65,origin:{y:.72},colors:wishColors,shapes:["star"]});
if(navigator.vibrate)navigator.vibrate(35);
};
const handleLogoClick=()=>{
if(++secretClicks.current>=5){secretClicks.current=0;setSecret(true);confetti({particleCount:100,spread:100,shapes:["star"],colors:wishColors});}
};
const changeChapter=index=>{
const next=(index+story.length)%story.length;
if(next===activeChapter)return;
setChapterDirection(next>activeChapter?1:-1);
setActiveChapter(next);
playChime();
};
const submitGuestbook=e=>{
e.preventDefault();
if(!guestName.trim()||!guestMessage.trim())return;
setGuests(prev=>[{name:guestName.trim(),message:guestMessage.trim(),id:Date.now()},...prev].slice(0,20));
setGuestName("");
setGuestMessage("");
setNoteSent(true);
confetti({particleCount:65,spread:75,origin:{x:.72,y:.65},shapes:["star"],colors:[...wishColors,"#ffffff"],scalar:1.1});
playChime();
if(navigator.vibrate)navigator.vibrate(35);
window.clearTimeout(noteTimer.current);
noteTimer.current=window.setTimeout(()=>setNoteSent(false),2600);
};
const openProject=project=>{
setSelectedProject(project);
setLullabyActive(false);
setNightlightActive(false);
setDeliveryActive(false);
setStudioPlaying(false);
};
return <main className={`observatory ${night?"night-mode":"day-mode"}`}>
<CursorTrail/>
<audio ref={audioRef} src="/pip-dreamy-music.mp3" loop preload="auto"/>
{musicNeedsInteraction&&!muted&&!studioPlaying&&<button className="music-start-button" onClick={startMusic}>♪ Start dreamy music</button>}
<div className="star-field" aria-hidden="true">{Array.from({length:32},(_,i)=><span key={i} className="tiny-star" style={{left:`${i*37%100}%`,top:`${i*53%100}%`,animationDelay:`${i%7*.4}s`}}>✦</span>)}</div>
<Header night={night} setNight={setNight} muted={muted} setMuted={setMuted} onLogoClick={handleLogoClick}/>
<section className="hero" id="home">
<motion.div className="hero-copy" initial={reducedMotion?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
<p className="eyebrow"><Orbit size={14}/> A SMALL CORNER OF THE UNIVERSE</p><h1>Where little dreams<br/>meet the <em>moonlight.</em></h1><p className="hero-description">Welcome to Pip's Midnight Observatory — a cozy little world of soft lights, sleepy stars, and tiny wonders made with love.</p>
<div className="hero-actions"><a href="#projects" className="primary-button">Explore the dreams <Sparkles size={16}/></a><button className="secondary-button" onClick={makeWish}><Star size={16}/> Make a wish</button></div><p className="dream-counter"><span>✦</span> {dreams} little {dreams===1?"wish":"wishes"} made here</p>
</motion.div>
<motion.div className="hero-art" animate={reducedMotion?{}:{y:[0,-10,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><span className="hero-sparkle sparkle-one">✦</span><span className="hero-sparkle sparkle-two">✧</span><span className="hero-sparkle sparkle-three">✦</span><div className="hero-image-frame"><ImageOrFallback src="/pip_portrait.png" alt="Pip, the tiny dream keeper"/></div><div className="hero-note"><span>☾</span><div><strong>Pip's little promise</strong><small>There's always room for one more dream.</small></div></div></motion.div>
<a className="scroll-cue" href="#projects"><ArrowDown size={15}/> WANDER A LITTLE</a>
</section>
<section className="projects-section section-wrap" id="projects">
<SectionHeading icon={Lamp} eyebrow="THE DREAM COLLECTION" title={<>Little things, <em>big magic.</em></>} subtitle={<>Made under the stars.<br/>Kept close to the heart.</>}/>
<div className="project-grid">{projects.map((project,index)=><motion.article className="project-card" key={project.title} initial={reducedMotion?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{delay:index*.12,duration:.5}}><button className="project-card-open" onClick={()=>openProject(project)} aria-label={`Open ${project.title}`}><motion.div className="project-card-image" layoutId={`project-image-${project.title}`} transition={sharedTransition}><ImageOrFallback src={project.image} alt={project.title}/></motion.div><div className="project-card-body"><p className="project-category">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p><span className="card-link">Step inside <ChevronRight size={15}/></span></div></button></motion.article>)}</div>
</section>
<section className="story-section section-wrap" id="story">
<SectionHeading icon={Map} eyebrow="A TALE FROM THE CLOUDS" title={<>Every star has <em>a story.</em></>} subtitle={<>A little about this<br/>dreamy place.</>}/>
<div className="story-slider"><AnimatePresence mode="wait" initial={false}><motion.article key={activeChapter} className="story-card story-slide" initial={reducedMotion?false:{opacity:0,x:chapterDirection*45,scale:.97}} animate={{opacity:1,x:0,scale:1}} exit={reducedMotion?{opacity:0}:{opacity:0,x:chapterDirection*-45,scale:.98}} transition={{duration:reducedMotion?0:.35,ease:"easeInOut"}}><motion.span className="story-icon" whileHover={reducedMotion?{}:{scale:1.2,rotate:-8}} transition={{type:"spring",stiffness:300,damping:12}}>{story[activeChapter].icon}</motion.span><span className="story-number">CHAPTER {String(activeChapter+1).padStart(2,"0")}</span><h3>{story[activeChapter].title}</h3><p>{story[activeChapter].text}</p><div className="story-slide-footer"><span>✦ A little more magic, one page at a time</span><span>{String(activeChapter+1).padStart(2,"0")} / {String(story.length).padStart(2,"0")}</span></div></motion.article></AnimatePresence><div className="story-controls"><button className="story-arrow" onClick={()=>changeChapter(activeChapter-1)} aria-label="Previous chapter"><ChevronRight className="story-previous-icon" size={19}/><span>Previous</span></button><div className="story-dots" aria-label="Choose a chapter">{story.map((chapter,index)=><button key={chapter.title} className={`story-dot ${index===activeChapter?"active":""}`} onClick={()=>changeChapter(index)} aria-label={`Go to chapter ${index+1}: ${chapter.title}`} aria-current={index===activeChapter?"step":undefined}>{index===activeChapter&&<span>✦</span>}</button>)}</div><button className="story-arrow story-next" onClick={()=>changeChapter(activeChapter+1)} aria-label="Next chapter"><span>Next chapter</span><ChevronRight size={19}/></button></div></div>
</section>
<section className="guestbook-section section-wrap" id="guestbook">
<div className="guestbook-intro"><p className="eyebrow"><Music2 size={14}/> LEAVE A LITTLE LIGHT</p><h2>Leave a note<br/>for the <em>night sky.</em></h2><p>Every visitor adds a little warmth to the observatory. Leave Pip a tiny hello.</p><span className="guestbook-heart">♡</span></div>
<div className="guestbook-panel"><form onSubmit={submitGuestbook} className="guestbook-form"><label htmlFor="guest-name">Your name</label><input id="guest-name" value={guestName} onChange={e=>setGuestName(e.target.value)} placeholder="A sleepy stargazer..." maxLength={50} required/><label htmlFor="guest-message">A little message</label><textarea id="guest-message" value={guestMessage} onChange={e=>setGuestMessage(e.target.value)} placeholder="A wish, a thought, a tiny hello..." maxLength={240} rows={3} required/><button className="primary-button guestbook-submit" type="submit" aria-live="polite">{noteSent?<>Note caught in the stars! <Check size={16}/></>:<>Leave your note <Heart size={15}/></>}</button></form><div className="guest-notes" aria-live="polite">{guests.length===0?<p className="empty-notes">The sky is waiting for its first little note. ✦</p>:guests.slice(0,4).map(guest=><motion.article className="guest-note" key={guest.id} initial={reducedMotion?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.35}}><span>✦</span><div><strong>{guest.name}</strong><p>{guest.message}</p></div></motion.article>)}</div></div>
</section>
<footer className="site-footer"><button className="footer-brand" onClick={handleLogoClick}>✦ Pip's Midnight Observatory</button><p>Made of stardust, soft thoughts, and a little bit of magic.</p><p className="footer-dream-counter">✨ {dreams+guests.length} little moments in the observatory</p><span>☾ ✧ ✦ ✧ ☽</span></footer>
<AnimatePresence>
{selectedProject&&<motion.div className={`project-modal-overlay ${nightlightActive?"nightlight-overlay":""} ${deliveryActive?"delivery-overlay":""}`} role="presentation" onClick={closeProject} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reducedMotion?0:.25}}><motion.section className={`project-modal ${nightlightActive?"nightlight-project-modal":""} ${deliveryActive?"delivery-project-modal":""}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={e=>e.stopPropagation()} initial={reducedMotion?false:{opacity:0,scale:.94,y:12}} animate={{opacity:1,scale:1,y:0}} exit={reducedMotion?{opacity:0}:{opacity:0,scale:.96,y:10}} transition={{duration:reducedMotion?0:.3,ease:"easeOut"}}>
{!nightlightActive&&!deliveryActive&&<button className="project-modal-close" onClick={closeProject} aria-label="Close project"><X size={18}/></button>}
{selectedProject.title==="The Lullaby Lab"&&lullabyActive?<div className="project-modal-content lullaby-modal-content"><LullabyStudio onPlaybackChange={handleStudioPlayback}/></div>:selectedProject.title==="Nightlight Collection"&&nightlightActive?<NightlightExperience muted={muted} onClose={closeProject}/>:selectedProject.title==="Dream Delivery Routes"&&deliveryActive?<DreamDeliveryExperience muted={muted} onClose={closeProject}/>:<>
<p className="project-modal-eyebrow">{selectedProject.category}</p><motion.div className="project-modal-image" layoutId={`project-image-${selectedProject.title}`} transition={sharedTransition}><ImageOrFallback src={selectedProject.image} alt={selectedProject.title}/></motion.div><div className="project-modal-content"><h2 id="project-modal-title">{selectedProject.title}</h2><p className="project-modal-description">{selectedProject.description}</p><div className={`project-modal-status ${selectedProject.title==="Nightlight Collection"?"nightlight-status-pulse":""}`}><span className="status-dot"/>{selectedProject.status}</div><button className="project-modal-action" onClick={()=>{if(selectedProject.title==="The Lullaby Lab")setLullabyActive(true);else if(selectedProject.title==="Nightlight Collection"){setNightlightActive(true);playMagicChime(muted);}else{setDeliveryActive(true);playMagicChime(muted);}}}>{selectedProject.action} <Sparkles size={15}/></button></div>
</>}
</motion.section></motion.div>}
{secret&&<motion.div className="secret-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSecret(false)}><motion.div className="secret-card" initial={reducedMotion?false:{scale:.7,rotate:-4}} animate={{scale:1,rotate:0}} exit={{opacity:0,scale:.9}} onClick={e=>e.stopPropagation()}><button className="project-modal-close" onClick={()=>setSecret(false)} aria-label="Close secret"><X size={18}/></button><span className="secret-star">✦</span><h2>You found Pip's secret!</h2><p>You are officially a Keeper of Little Dreams. Keep being wonderfully curious. ♡</p><button className="primary-button" onClick={()=>{setSecret(false);makeWish();}}>Make a wish <Sparkles size={15}/></button></motion.div></motion.div>}
</AnimatePresence>
</main>;
}