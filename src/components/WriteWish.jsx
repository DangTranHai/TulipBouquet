import { useEffect, useMemo, useRef, useState } from "react";
import "./WriteWish.css";

export default function WriteWish() {

  const [message, setMessage] = useState("");
  const [flowerText, setFlowerText] = useState("");
  const [music, setMusic] = useState("1");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [phase, setPhase] = useState("editing");

  const timersRef = useRef([]);

  const musicList = useMemo(
    () => ({
      "1": { src: "/neulucdo.mp3", label: "🎵 🪻" },
      "2": { src: "/tulip.mp4", label: "🎶 🌹" },
      "3": { src: "/neucothemcohoi.mp4", label: "🎹 🌷" },
    }),
    []
  );

  const sha256Hex = async (text) => {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    const bytes = Array.from(new Uint8Array(buf));
    return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const createLink = async () => {

    if (!message) {
      alert("Vui lòng nhập lời chúc!");
      return;
    }


    if (!password) {
      alert("Vui lòng nhập mật khẩu!");
      return;
    }

    const encodedMsg = encodeURIComponent(message);
    const encodedFlower = encodeURIComponent(flowerText);

    let url =
      window.location.origin +
      `/?msg=${encodedMsg}&flowerText=${encodedFlower}&music=${music}`;

    try {
      const hash = await sha256Hex(password);
      url += `&pwh=${hash}`;
    } catch {}

    setLink(url);
    setPhase("sealing");

    timersRef.current.forEach((t) => clearTimeout(t));

    timersRef.current = [
      window.setTimeout(() => setPhase("flying"), 900),
      window.setTimeout(() => setPhase("sent"), 1900),
    ];
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const copyLink = async () => {
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
      alert("Đã copy link!");
    } catch {}
  };

  const handleNewWish = () => {
    setMessage("");
    setFlowerText("");
    setPassword("");
    setLink("");
    setPhase("editing");
  };

  return (

    <div className={`composer-page phase-${phase}`}>

      <div className="composer-shell">

        <div className="composer-stage">

          {phase === "editing" && (

            <div className="composer-card">

              <div className="paper-title">
                🌸 Gửi lời chúc 8/3 🌸
              </div>

              <textarea
                className="wish-input"
                placeholder="Nhập lời chúc trong thư..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="composer-controls">

                <input
                  className="pwd-input"
                  type="password"
                  placeholder="Tạo mật khẩu mở thư..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <select
                  className="music-select"
                  value={music}
                  onChange={(e) => setMusic(e.target.value)}
                >
                  {Object.entries(musicList).map(([id, item]) => (
                    <option key={id} value={id}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <button
                  className="send-btn"
                  onClick={createLink}
                >
                  Niêm phong & gửi
                </button>

              </div>

            </div>

          )}

          {(phase === "sealing" || phase === "flying" || phase === "sent") && (
            <div style={{height:0}}></div>
          )}

          <div className="envelope">

            <div className="env-back"/>

            <div className="paper">

              <div className="paper-inner">

                <div className="paper-title">
                  🌸 Gửi lời chúc 8/3 🌸
                </div>

                <div
                  style={{
                    fontSize:"16px",
                    color:"#333",
                    whiteSpace:"pre-line",
                    minHeight:"80px",
                    opacity:phase==="editing"?0:1
                  }}
                >
                  {message}
                </div>

                {phase === "sealing" && (
                  <div className="composer-hint">
                    Đang niêm phong...
                  </div>
                )}

                {phase === "flying" && (
                  <div className="composer-hint">
                    Lá thư đang bay đến người nhận...
                  </div>
                )}

                {phase === "sent" && (
                  <div className="composer-hint">
                    Xong! Copy link và gửi cho người ấy nhé.
                  </div>
                )}

              </div>

            </div>

            <div className="env-front"/>
            <div className="env-flap"/>

          </div>

          {phase === "sent" && link && (

            <div className="result">

              <div className="result-title">
                🔗 Link gửi người nhận
              </div>

              <div className="result-actions">

                <a
                  className="result-link"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link}
                </a>

                <button
                  className="copy-btn"
                  onClick={copyLink}
                >
                  Copy
                </button>

                <button
                  className="copy-btn"
                  onClick={handleNewWish}
                  style={{
                    background:"#ff2d7a",
                    color:"#fff"
                  }}
                >
                  Tạo thư mới
                </button>

              </div>

              <div className="result-note">
                Người nhận cần nhập đúng mật khẩu để xem thư.
              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}