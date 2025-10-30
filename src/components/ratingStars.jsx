// src/components/RatingStars.jsx
import StarRed from "../assets/ratingStar-red.svg";
import StarGray from "../assets/ratingStar-grey.svg";

// one star (decides which icon to show)
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

// full row of 5 stars based on rating prop
export default function RatingStars({ rating }) {
  const r = Math.max(0, Math.min(5, Number(rating) || 0)); // normalize to 0..5

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= r} />
      ))}
    </div>
  );
}
