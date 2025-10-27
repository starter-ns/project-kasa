import { useMemo, useRef, useState, useEffect } from "react";

// ✅ your icons from src/assets
import Vector from "../assets/Vector.svg";
import ArrowPrev from "../assets/arrow_previous.svg";
import ArrowNext from "../assets/arrow_forward.svg";
import StarRed from "../assets/ratingStar-red.svg";
import StarGray from "../assets/ratingStar-grey.svg";

// --- simple Star component (picks correct SVG) ---
function Star({ filled, size = 18 }) {
  return (
    <img
      src={filled ? StarRed : StarGray}
      alt="Rating star"
      width={size}
      height={size}
      style={{ display: "inline-block" }}
    />
  );
}

export default function RentalPropertyCard({
  title,
  location,
  description,
  imageUrl,
  rating,
  tags = [],
  equipments = [],
  hostName,
  hostPicture,
  pictures = [],
}) {
  const normalizeUrl = (path) => {
    if (!path) return "";
    const s = String(path).trim();
    if (!s) return "";
    if (/^https?:\/\//i.test(s)) return s;
    return `${import.meta.env.BASE_URL}${s.replace(/^\/+/, "")}`;
  };

  const slides = useMemo(() => {
    const arr =
      Array.isArray(pictures) && pictures.length > 0
        ? pictures
        : imageUrl
        ? [imageUrl]
        : [];
    return arr.map(normalizeUrl).filter(Boolean);
  }, [pictures, imageUrl]);

  const [index, setIndex] = useState(0);
  const total = slides.length;
  const r = Math.max(0, Math.min(5, Number(rating) || 0));

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // keyboard + swipe
  const boxRef = useRef(null);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [total]);

  const startX = useRef(0);
  const onTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) prev();
    if (dx < -50) next();
  };

  const [open, setOpen] = useState({ desc: false, equip: false });
  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  return (
    <article style={{ padding: 16, maxWidth: 360, margin: "0 auto" }}>
      {/* Slider */}
      <div
        ref={boxRef}
        tabIndex={0}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Property pictures"
        style={{
          width: 335,
          height: 255,
          borderRadius: 12,
          overflow: "hidden",
          margin: "12px 0",
          position: "relative",
          background: "#f6f6f6",
          outline: "none",
        }}
      >
        {total > 0 && (
          <>
            <img
              key={slides[index]}
              src={slides[index]}
              alt={`${title || "Property"} – image ${index + 1}`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* bottom shadow gradient */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(10,10,10,0) 42%, rgba(4,4,4,0.205) 99.99%, rgba(0,0,0,0.5) 100%)",
              }}
            />

            {/* slider arrows */}
            {total > 1 && (
              <>
                <button aria-label="Previous image" onClick={prev} style={bareArrow("left")}>
                  <img src={ArrowPrev} alt="Previous" style={{ width: 20, height: 20 }} />
                </button>
                <button aria-label="Next image" onClick={next} style={bareArrow("right")}>
                  <img src={ArrowNext} alt="Next" style={{ width: 20, height: 20 }} />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* Title + location */}
      <h1 style={{ color: "#FF6060", margin: "0 0 6px", fontWeight: 500, fontSize: 18, lineHeight: 1.25 }}>
        {title}
      </h1>
      <p style={{ margin: "0 0 12px", color: "#000", fontWeight: 500, fontSize: 14, lineHeight: "143%" }}>
        {location}
      </p>

      {/* Tags */}
      {Array.isArray(tags) && tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              style={{
                background: "#FF6060",
                color: "#fff",
                borderRadius: 10,
                padding: "6px 10px",
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Rating + host */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        {/* Rating stars (using pre-colored SVGs) */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} filled={n <= r} />
          ))}
        </div>

        {/* Host info */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {hostName && (
            <span style={{ fontSize: 14, fontWeight: 600, color: "#000", textAlign: "right" }}>
              {hostName}
            </span>
          )}
          {hostPicture && (
            <img
              src={normalizeUrl(hostPicture)}
              alt={hostName || "Host"}
              style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", display: "block" }}
            />
          )}
        </div>
      </div>

      {/* Accordions */}
      <Accordion
        title="Description"
        open={open.desc}
        onToggle={() => toggle("desc")}
        color="#FF6060"
        caretIcon={Vector}
      >
        {description || "—"}
      </Accordion>

      <Accordion
        title="Amenities"
        open={open.equip}
        onToggle={() => toggle("equip")}
        color="#FF6060"
        caretIcon={Vector}
      >
        {Array.isArray(equipments) && equipments.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {equipments.map((item, idx) => (
              <li key={`${item}-${idx}`} style={{ fontSize: 14, lineHeight: 1.4 }}>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          "—"
        )}
      </Accordion>
    </article>
  );
}

// --- Accordion subcomponent ---
function Accordion({ title, open, onToggle, color = "#FF6060", leftIcon, caretIcon, children }) {
  return (
    <section style={{ marginTop: 10 }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%",
          background: color,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "12px 14px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          gap: 10,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {leftIcon && <img src={leftIcon} alt="" style={{ width: 16, height: 16 }} />}
          {title}
        </span>

        {caretIcon && (
          <img
            src={caretIcon}
            alt=""
            style={{
              width: 12,
              height: 12,
              transform: `rotate(${open ? 180 : 0}deg)`,
              transition: "transform .2s",
            }}
          />
        )}
      </button>

      <div
        style={{
          maxHeight: open ? 600 : 0,
          overflow: "hidden",
          transition: "max-height .25s ease",
          background: "#f9f9f9",
          borderRadius: "0 0 8px 8px",
        }}
      >
        {open && (
          <div
            style={{
              padding: "12px 14px",
              color: "#000",
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "143%",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

// --- slider arrow buttons (simple + clean) ---
function bareArrow(side) {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 8,
    width: 28,
    height: 28,
    padding: 0,
    margin: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
