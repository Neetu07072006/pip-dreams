
import { useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { Radar, Sparkles, Wind, X, RotateCcw } from "lucide-react";
import "./DreamDispatch.css";

const sectors = [
  { id: "7G", message: "Delivering sweet dreams to a sleepy kitten." },
  { id: "3M", message: "A little courage is on its way to a nervous dreamer." },
  { id: "9L", message: "Moonbeam parcel dispatched to a window above the clouds." },
  { id: "2B", message: "Emergency fluff delivery! One cloud needs extra pillows." },
  { id: "5Q", message: "A forgotten wish has been found and is heading home." }
];

export default function DreamDispatch({ onClose }) {
  const [sectorIndex, setSectorIndex] = useState(0);
  const [fuel, setFuel] = useState(72);
  const [fluff, setFluff] = useState(85);
  const [launched, setLaunched] = useState(false);
  const [log, setLog] = useState("Awaiting delivery coordinates...");
  const sector = sectors[sectorIndex];

  const scan = () => {
    const next = (sectorIndex + 1 + Math.floor(Math.random() * (sectors.length - 1))) % sectors.length;
    setSectorIndex(next);
    setLaunched(true);
    setLog(`Sector ${sectors[next].id}: ${sectors[next].message}`);
    if (navigator.vibrate) navigator.vibrate(25);
    confetti({
      particleCount: 24,
      spread: 65,
      origin: { y: 0.6 },
      colors: ["#f3a1c4", "#e5d8ff", "#ffe8a8"]
    });
  };

  return (
    <section className="dream-dispatch">
      <header className="dispatch-header">
        <div>
          <span className="dispatch-eyebrow"><Radar size={15} /> PIP'S CLOUD LOGISTICS</span>
          <h2>Dream Dispatch</h2>
        </div>
        <button className="dispatch-close" onClick={onClose} aria-label="Close dispatch"><X size={19} /></button>
      </header>

      <div className="dispatch-radar">
        <div className="radar-grid" />
        <motion.div
          className="radar-sweep"
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        {Array.from({ length: 8 }, (_, i) => (
          <motion.span
            key={i}
            className={`radar-blip blip-${i}`}
            animate={{ opacity: [0.25, 1, 0.45], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.8 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
        <div className="radar-center">✦</div>
        <span className="radar-coordinate">RA 03h 24m · DEC +42°</span>
      </div>

      <div className="dispatch-status">
        <span className="dispatch-live-dot" />
        {launched ? `ACTIVE DELIVERY · SECTOR ${sector.id}` : "RADAR ONLINE · STANDING BY"}
      </div>

      <motion.div
        className="dispatch-log"
        key={sectorIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="dispatch-log-label">LATEST DISPATCH</span>
        <p>{log}</p>
      </motion.div>

      <div className="dispatch-controls">
        <label>
          <span><Sparkles size={15} /> Stardust fuel <b>{fuel}%</b></span>
          <input type="range" min="0" max="100" value={fuel} onChange={e => setFuel(Number(e.target.value))} />
        </label>
        <label>
          <span><Wind size={15} /> Cloud fluffiness <b>{fluff}%</b></span>
          <input type="range" min="0" max="100" value={fluff} onChange={e => setFluff(Number(e.target.value))} />
        </label>
      </div>

      <motion.div
        className="dispatch-cloud"
        animate={{ y: [0, -4 - fluff / 20, 0], scale: [1, 1 + fluff / 1000, 1] }}
        transition={{ duration: Math.max(1.2, 3 - fluff / 60), repeat: Infinity, ease: "easeInOut" }}
      >
        ☁️ <span>Pip's dream cargo</span> ✨
      </motion.div>

      <button className="dispatch-launch" onClick={scan}>
        <Radar size={17} /> {launched ? "Scan next sector" : "Find a delivery"} 
      </button>
      <button className="dispatch-reset" onClick={() => {
        setSectorIndex(0);
        setFuel(72);
        setFluff(85);
        setLaunched(false);
        setLog("Awaiting delivery coordinates...");
      }}>
        <RotateCcw size={14} /> Reset route
      </button>
    </section>
  );
}
