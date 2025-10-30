// src/components/RentalPropertyCard.jsx
import { useMemo, useRef, useState, useEffect } from "react";

import Vector from "../assets/Vector.svg";
import ArrowPrev from "../assets/arrow_previous.svg";
import ArrowNext from "../assets/arrow_forward.svg";

import RatingStars from "./ratingStars.jsx";
import Accordion from "./accordion.jsx";

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
  // build correct asset URLs
  const normalizeUrl = (path) => {
    if (!path) return "";
    const s = String(path).trim();
    if (!s) return "";
    if (/^https?:\/\//i.test(s)) return s;
    return `${import.meta.env.BASE_URL}${s.replace(/^\/+/, "")}`;
  };

  // slideshow images (array)
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

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // keyboard nav + swipe for slider
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

  // accordions open state
  const [open, setOpen] = useState({ desc: false, equip: false });
  const toggle = (key) =>
    setOpen((o) => ({
      ...o,
      [key]: !o[key],
    }));

  return (
    <article style={{ padding: 16, maxWidth: 360, margin: "0 auto" }}>
      {/* Image slider */}
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

            {/* bottom gradient overlay */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(10,10,10,0) 42%, rgba(4,4,4,0.205) 99.99%, rgba(0,0,0,0.5) 100%)",
              }}
            />

            {/* arrows only if >1 image */}
            {total > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={prev}
                  style={bareArrow("left")}
                >
                  <img
                    src={ArrowPrev}
                    alt="Previous"
                    style={{ width: 20, height: 20 }}
                  />
                </button>

                <button
                  aria-label="Next image"
                  onClick={next}
                  style={bareArrow("right")}
                >
                  <img
                    src={ArrowNext}
                    alt="Next"
                    style={{ width: 20, height: 20 }}
                  />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* Title + location */}
      <h1
        style={{
          color: "#FF6060",
          margin: "0 0 6px",
          fontWeight: 500,
          fontSize: 18,
          lineHeight: 1.25,
        }}
      >
        {title}
      </h1>

      <p
        style={{
          margin: "0 0 12px",
          color: "#000",
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "143%",
        }}
      >
        {location}
      </p>

      {/* Tags */}
      {Array.isArray(tags) && tags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 12,
          }}
        >
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

      {/* Rating + host row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        {/* Rating using the extracted component */}
        <RatingStars rating={rating} />

        {/* Host info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {hostName && (
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#000",
                textAlign: "right",
              }}
            >
              {hostName}
            </span>
          )}

          {hostPicture && (
            <img
              src={normalizeUrl(hostPicture)}
              alt={hostName || "Host"}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
              }}
            />
          )}
        </div>
      </div>

      {/* Description accordion */}
      <Accordion
        title="Description"
        open={open.desc}
        onToggle={() => toggle("desc")}
        color="#FF6060"
        // left icon OFF for now (since you removed leftIcon usage in your version)
        // but we still pass caret arrow icon:
        caretIcon={Vector}
      >
        {description || "—"}
      </Accordion>

      {/* Amenities accordion */}
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
              <li
                key={`${item}-${idx}`}
                style={{
                  fontSize: 14,
                  lineHeight: 1.4,
                }}
              >
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
