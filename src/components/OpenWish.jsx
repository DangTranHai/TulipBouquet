import "./OpenWish.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OpenWish() {

  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);

  const message = params.get("msg");
  const music = params.get("music");
  const pwh = params.get("pwh");

  const musicList = useMemo(
    () => ({
      "1": { src: "/neulucdo.mp3", label: "🎵🪻" },
      "2": { src: "/tulip.mp4", label: "🎶 🌹" },
      "3": { src: "/neucothemcohoi.mp4", label: "🎹 🌷" },
    }),
    []
  );

  const audioRef = useRef(null);

  const [phase, setPhase] = useState("arriving");
  const [unlocked, setUnlocked] = useState(!pwh);
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState("");

  const pwdRef = useRef(null);

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("closed"), 900);
    return () => clearTimeout(t);
  }, []);

  const doOpen = async () => {
    setPhase("opening");

    window.setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      setPhase("opened");
    }, 900);
  };

  const openLetter = async () => {
    if (phase !== "closed") return;

    if (!unlocked) {
      setShowPrompt(true);
      return;
    }

    doOpen();
  };

  const sha256Hex = async (text) => {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    const bytes = Array.from(new Uint8Array(buf));

    return bytes
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const tryUnlock = async () => {
    setError("");

    const value = pwdRef.current?.value ?? "";

    try {
      const hex = await sha256Hex(value);

      if (hex === pwh) {
        setUnlocked(true);
        setShowPrompt(false);
        doOpen();
      } else {
        setError("Mật khẩu không đúng");
      }
    } catch {
      setError("Không thể xác thực");
    }
  };

  const musicSrc = musicList[music]?.src ?? "/neucothemcohoi.mp4";

  return (
    <div className={`receiver-page phase-${phase}`}>

      <div className="receiver-sky" aria-hidden="true">
        <div className="receiver-sparkle s1" />
        <div className="receiver-sparkle s2" />
        <div className="receiver-sparkle s3" />
      </div>

      <div className="receiver-stage">

        <div className="receiver-header">

          <div className="receiver-badge">
            💌 Bạn có một lá thư
          </div>

          <div className="receiver-sub">
            {phase === "arriving" && "Phong bì đang bay tới…"}
            {phase === "closed" && "Chạm vào phong bì để mở thư."}
            {phase === "opening" && "Đang mở thư…"}
            {phase === "opened" && "Chúc bạn một ngày 8/3 thật rực rỡ."}
          </div>

        </div>

        <button
          type="button"
          className="envelope receiver-envelope"
          onClick={openLetter}
          aria-label="Mở phong bì thư"
        >

          <div className="env-back" />

          <div className="paper">

            <div className="paper-inner">

              <div className="paper-title">
                🌸 Happy Women's Day 🌸
              </div>

              <div className="paper-message">
                {unlocked
                  ? message || "Bạn quên nhập lời chúc rồi nè."
                  : "Nhập mật khẩu để xem nội dung."}
              </div>

              {unlocked && (
                <div className="paper-audio">

                  <div className="audio-label">
                    Nhạc trong thư
                  </div>

                  <audio
                    ref={audioRef}
                    src={musicSrc}
                    loop
                    controls
                    preload="auto"
                  />

                </div>
              )}

              {phase === "opened" && (
                <div style={{ marginTop: "16px", textAlign: "center" }}>
                  <button
                    className="tulip-btn"
                    onClick={() => navigate("/tulip")}
                  >
                    🌷 Tặng Ngọc 1 bó hoa (Bấm vèo) 💖
                  </button>
                </div>
              )}

            </div>
          </div>

          <div className="env-front" />
          <div className="env-flap" />

          <div className="seal" aria-hidden="true">
            ❤
          </div>

        </button>

        {showPrompt && (
          <div
            className="lock-overlay"
            role="dialog"
            aria-modal="true"
          >

            <div className="lock-card">

              <div className="lock-title">
                Nhập mật khẩu để mở thư
              </div>

              <input
                className="lock-input"
                type="password"
                ref={pwdRef}
                placeholder="Mật khẩu"
              />

              {error && (
                <div className="lock-error">
                  {error}
                </div>
              )}

              <div className="lock-actions">

                <button
                  className="lock-btn"
                  onClick={tryUnlock}
                >
                  Mở thư
                </button>

                <button
                  className="lock-cancel"
                  onClick={() => setShowPrompt(false)}
                >
                  Hủy
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}