import { Link } from "react-router-dom";
import "../styles/ListingCard.scss";

export default function ListingCard({ id, title, cover }) {
  return (
    <Link
      to={`/listing/${id}`}
      className="listing-card-link"
    >
      <article className="listing-card">
        {cover && (
          <img
            src={cover}
            alt={title}
            className="listing-card__image"
          />
        )}

        <div className="listing-card__gradient" />

        <div className="listing-card__title">
          {title}
        </div>
      </article>
    </Link>
  );
}
