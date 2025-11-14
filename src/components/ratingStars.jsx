import StarRed from "../assets/ratingStar-red.svg";
import StarGray from "../assets/ratingStar-grey.svg";
import "../styles/components/RatingStars.scss";

function Star({ filled, size = 18 }) {
  return (
    <img
      src={filled ? StarRed : StarGray}
      alt="Rating star"
      width={size}
      height={size}
      className="rating-stars__star"
    />
  );
}

export default function RatingStars({ rating }) {
  const r = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= r} />
      ))}
    </div>
  );
}
