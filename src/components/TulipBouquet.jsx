import "./TulipBouquet.css";
import { useMemo, useRef, useEffect } from "react";

export default function TulipBouquet() {

  const params = new URLSearchParams(window.location.search);

  const flowerText = params.get("flowerText") || "💖";
  const music = params.get("music");

  const audioRef = useRef(null);

  const musicList = useMemo(
    () => ({
      "1": { src: "/neulucdo.mp3" },
      "2": { src: "/tulip.mp4" },
      "3": { src: "/neucothemcohoi.mp4" },
    }),
    []
  );

  const musicSrc = musicList[music]?.src ?? "/neucothemcohoi.mp4";

  // tự phát nhạc khi vào trang
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(()=>{});
    }
  }, []);

  const particles = new Array(40).fill(0);

  return (
    <div className="night-scene">

      <div className="stars"></div>

      {/* TEXT */}
      <div className="glow-text">
        🌷 {flowerText} 🌷
      </div>

      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        controls
        autoPlay
        style={{
          position:"absolute",
          top:"20px",
          right:"20px",
          zIndex:10
        }}
      />

      <svg className="flower-svg" viewBox="0 0 800 500">

        {/* stems */}
        <path d="M400 450 C390 330 380 280 370 220" className="stem"/>
        <path d="M400 450 C420 330 430 260 450 210" className="stem"/>
        <path d="M400 450 C350 340 330 280 300 220" className="stem"/>
        <path d="M400 450 C460 340 500 260 520 220" className="stem"/>
        <path d="M400 450 C400 320 400 250 400 200" className="stem"/>

        {/* leaves */}
        <path d="M380 360 C320 340 310 380 380 400" className="leaf"/>
        <path d="M420 360 C480 340 490 380 420 400" className="leaf"/>
        <path d="M350 300 C290 290 300 330 350 340" className="leaf"/>
        <path d="M450 300 C510 290 500 330 450 340" className="leaf"/>

        {/* flowers */}
        <g transform="translate(370,210)">
          <circle cx="0" cy="0" r="12" className="center"/>
          <ellipse cx="0" cy="-20" rx="25" ry="35" className="petal"/>
          <ellipse cx="-25" cy="0" rx="25" ry="30" className="petal"/>
          <ellipse cx="25" cy="0" rx="25" ry="30" className="petal"/>
          <ellipse cx="0" cy="20" rx="22" ry="25" className="petal"/>
        </g>

        <g transform="translate(450,200)">
          <circle cx="0" cy="0" r="12" className="center"/>
          <ellipse cx="0" cy="-20" rx="25" ry="35" className="petal"/>
          <ellipse cx="-25" cy="0" rx="25" ry="30" className="petal"/>
          <ellipse cx="25" cy="0" rx="25" ry="30" className="petal"/>
          <ellipse cx="0" cy="20" rx="22" ry="25" className="petal"/>
        </g>

        <g transform="translate(300,220)">
          <circle cx="0" cy="0" r="12" className="center"/>
          <ellipse cx="0" cy="-20" rx="25" ry="35" className="petal"/>
          <ellipse cx="-25" cy="0" rx="25" ry="30" className="petal"/>
          <ellipse cx="25" cy="0" rx="25" ry="30" className="petal"/>
          <ellipse cx="0" cy="20" rx="22" ry="25" className="petal"/>
        </g>

        <g transform="translate(520,220)">
          <circle cx="0" cy="0" r="12" className="center"/>
          <ellipse cx="0" cy="-20" rx="25" ry="35" className="petal"/>
          <ellipse cx="-25" cy="0" rx="25" ry="30" className="petal"/>
          <ellipse cx="25" cy="0" rx="25" ry="30" className="petal"/>
          <ellipse cx="0" cy="20" rx="22" ry="25" className="petal"/>
        </g>

        <g transform="translate(400,190)">
          <circle cx="0" cy="0" r="12" className="center"/>
          <ellipse cx="0" cy="-20" rx="25" ry="35" className="petal"/>
          <ellipse cx="-25" cy="0" rx="25" ry="30" className="petal"/>
          <ellipse cx="25" cy="0" rx="25" ry="30" className="petal"/>
          <ellipse cx="0" cy="20" rx="22" ry="25" className="petal"/>
        </g>

      </svg>

      {/* particles */}
      <div className="particles">
        {particles.map((_,i)=>(
          <span
            key={i}
            style={{
              left:Math.random()*100+"%",
              animationDelay:i*0.25+"s"
            }}
          />
        ))}
      </div>

    </div>
  );
}