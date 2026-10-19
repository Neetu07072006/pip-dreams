
import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const starRef = useRef(null);

  useEffect(() => {
    const star = starRef.current;
    if (!star) return;

    const particles = [];
    const colors = [
      "#fbbf24",
      "#f59e0b",
      "#fcd34d",
      "#fff4bd",
      "#f9a8d4",
      "#ec4899",
      "#e9d5ff",
      "#c4b5fd",
      "#ffffff",
    ];

    let lastSpark = 0;

    const move = (e) => {
      // Keep the golden star directly attached to the cursor.
      star.style.left = `${e.clientX}px`;
      star.style.top = `${e.clientY}px`;

      // Create glitter frequently while the cursor moves.
      const now = performance.now();
      if (now - lastSpark < 12) return;
      lastSpark = now;

      const spark = document.createElement("span");
      const isLarge = Math.random() > 0.72;

      spark.className = "pip-glitter-particle";
      spark.textContent = isLarge
        ? Math.random() > 0.5 ? "✦" : "✧"
        : Math.random() > 0.5 ? "·" : "✧";

      spark.style.left = `${e.clientX + (Math.random() - 0.5) * 22}px`;
      spark.style.top = `${e.clientY + (Math.random() - 0.5) * 22}px`;
      spark.style.color =
        colors[Math.floor(Math.random() * colors.length)];

      spark.style.fontSize = isLarge
        ? `${16 + Math.random() * 12}px`
        : `${9 + Math.random() * 10}px`;

      spark.style.setProperty(
        "--dx",
        `${(Math.random() - 0.5) * 90}px`
      );
      spark.style.setProperty(
        "--dy",
        `${(Math.random() - 0.5) * 90}px`
      );

      document.body.appendChild(spark);
      particles.push(spark);

      spark.addEventListener(
        "animationend",
        () => {
          spark.remove();
          const index = particles.indexOf(spark);
          if (index !== -1) particles.splice(index, 1);
        },
        { once: true }
      );
    };

    window.addEventListener("pointermove", move);

    return () => {
      window.removeEventListener("pointermove", move);
      particles.forEach((particle) => particle.remove());
    };
  }, []);

  return (
    <>
      <style>{`
        .pip-glitter-particle {
          position: fixed;
          z-index: 2147483646;
          pointer-events: none;
          line-height: 1;
          text-shadow:
            0 0 6px currentColor,
            0 0 12px currentColor;
          filter: drop-shadow(0 0 5px currentColor);
          will-change: transform, opacity;
          animation: pip-glitter-fade 900ms ease-out forwards;
        }

        @keyframes pip-glitter-fade {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.3) rotate(0deg);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform:
              translate(var(--dx), var(--dy))
              scale(0.1)
              rotate(180deg);
          }
        }
      `}</style>

      <div
        ref={starRef}
        style={{
          position: "fixed",
          left: "-50px",
          top: "-50px",
          zIndex: 2147483647,
          pointerEvents: "none",
          fontSize: "36px",
          lineHeight: 1,
          color: "#fbbf24",
          textShadow: "0 0 10px #f59e0b, 0 0 24px #f472b6",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      >
        ✦
      </div>
    </>
  );
}
