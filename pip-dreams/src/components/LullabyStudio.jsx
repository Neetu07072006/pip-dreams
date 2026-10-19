
import { useEffect, useRef, useState } from "react";
import { Music, Play, Pause, RotateCcw, Moon, Sparkles } from "lucide-react";
import "./LullabyStudio.css";

const TRACK = "/sigmamusicart-merry-christmas-background-christmas-music-270005.mp3";

export default function LullabyStudio({ onPlaybackChange = () => {} }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [humsOn, setHumsOn] = useState(true);
  const [melody, setMelody] = useState(0);
  const [error, setError] = useState("");

  const melodies = ["Winter Lullaby", "Moonlight Dreams", "Starlight Waltz"];

  const stopLullaby = (reset = true) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      if (reset) audio.currentTime = 0;
    }
    setPlaying(false);
    onPlaybackChange(false);
  };

  const playLullaby = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setError("");
      if (audio.ended) audio.currentTime = 0;
      await audio.play();
      setPlaying(true);
      onPlaybackChange(true);
    } catch {
      setPlaying(false);
      onPlaybackChange(false);
      setError("Tap play again to allow the music to start.");
    }
  };

  const changeMelody = () => {
    setMelody((current) => (current + 1) % melodies.length);
    if (audioRef.current && playing) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      onPlaybackChange(false);
    };
  }, [onPlaybackChange]);

  const handleEnded = () => {
    setPlaying(false);
    onPlaybackChange(false);
  };

  return (
    <section className="lullaby-studio">
      <audio
        ref={audioRef}
        src={TRACK}
        preload="auto"
        onEnded={handleEnded}
        onPause={() => {
          if (audioRef.current?.ended) handleEnded();
        }}
      />

      <div className="lullaby-header">
        <div className="lullaby-icon"><Moon size={22} /></div>
        <div>
          <h2>Lullaby Studio</h2>
          <p>A little music for your midnight sky</p>
        </div>
      </div>

      <div className="lullaby-visual">
        <div className={`lullaby-moon ${playing ? "is-playing" : ""}`}>☾</div>
        <Sparkles className="lullaby-star star-one" size={18} />
        <Sparkles className="lullaby-star star-two" size={14} />
        <span className="lullaby-orbit orbit-one" />
        <span className="lullaby-orbit orbit-two" />
      </div>

      <div className="lullaby-track">
        <Music size={18} />
        <div>
          <strong>{melodies[melody]}</strong>
          <p>{playing ? "Playing softly beneath the stars" : "Ready when you are"}</p>
        </div>
      </div>

      {error && <p className="lullaby-error">{error}</p>}

      <div className="lullaby-controls">
        <button
          type="button"
          onClick={playing ? () => stopLullaby(false) : playLullaby}
          aria-label={playing ? "Pause lullaby" : "Play lullaby"}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
          {playing ? "Pause" : "Play lullaby"}
        </button>

        <button type="button" onClick={changeMelody} aria-label="Change displayed melody">
          <RotateCcw size={17} /> Change melody
        </button>

        <button
          type="button"
          className={humsOn ? "active" : ""}
          onClick={() => setHumsOn((value) => !value)}
          aria-pressed={humsOn}
        >
          <Moon size={17} /> Moon hums {humsOn ? "on" : "off"}
        </button>
      </div>

      <p className="lullaby-footnote">
        Let the music hold your thoughts for a little while.
      </p>
    </section>
  );
}
