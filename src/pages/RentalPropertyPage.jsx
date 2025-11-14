import { useMemo, useRef, useState, useEffect } from "react";

import Vector from "../assets/Vector.svg";
import ArrowPrev from "../assets/arrow_previous.svg";
import ArrowNext from "../assets/arrow_forward.svg";

import RatingStars from "../components/RatingStars.jsx";
import Accordion from "../components/Accordion.jsx";

import "../styles/pages/RentalPropertyPage.scss";

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
    <article className="rental-card">
      {/* Image slider */}
      <div
        ref={boxRef}
        tabIndex={0}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Property pictures"
        className="rental-card__slider"
      >
        {total > 0 && (
          <>
            <img
              key={slides[index]}
              src={slides[index]}
              alt={`${title || "Property"} – image ${index + 1}`}
              className="rental-card__slider-img"
            />

            {/* bottom gradient overlay */}
            <div
              aria-hidden="true"
              className="rental-card__slider-gradient"
            />

            {/* arrows only if >1 image */}
            {total > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={prev}
                  className="rental-card__slider-arrow rental-card__slider-arrow--left"
                >
                  <img
                    src={ArrowPrev}
                    alt="Previous"
                    className="rental-card__slider-arrow-icon"
                  />
                </button>

                <button
                  aria-label="Next image"
                  onClick={next}
                  className="rental-card__slider-arrow rental-card__slider-arrow--right"
                >
                  <img
                    src={ArrowNext}
                    alt="Next"
                    className="rental-card__slider-arrow-icon"
                  />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* title / location / tags / host / rating block */}
      <div className="rental-card__row">
        {/* LEFT SIDE: title / location / tags */}
        <div className="rental-card__info-left">
          <h1 className="rental-card__title">{title}</h1>

          <p className="rental-card__location">{location}</p>

          {Array.isArray(tags) && tags.length > 0 && (
            <div className="rental-card__tags">
              {tags.map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="rental-card__tag-pill"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: host info + stars */}
        <div className="rental-card__info-right">
          <div className="rental-card__host">
            {hostName && (
              <span className="rental-card__host-name">
                {hostName}
              </span>
            )}

            {hostPicture && (
              <img
                src={normalizeUrl(hostPicture)}
                alt={hostName || "Host"}
                className="rental-card__host-avatar"
              />
            )}
          </div>

          <div className="rental-card__rating">
            <RatingStars rating={rating} />
          </div>
        </div>
      </div>


      {/* Description + Amenities accordions */}
      <div className="rental-card__accordion-row">
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
            <ul className="rental-card__equip-list">
              {equipments.map((item, idx) => (
                <li
                  key={`${item}-${idx}`}
                  className="rental-card__equip-item"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            "—"
          )}
        </Accordion>
      </div>

    </article>
  );
}
