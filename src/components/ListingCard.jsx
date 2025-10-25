// src/components/ListingCard.jsx
import { Link } from "react-router-dom";

export default function ListingCard({ id, title, cover }) {
  return (
    <Link
      to={`/listing/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article
        style={{
          position: "relative",
          height: 180,
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "#FF6060", // your brand red base
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          transition: "transform .2s ease, box-shadow .2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
        }}
      >
        {/* Optional cover image */}
        {cover && (
          <img
            src={cover}
            alt={title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* your dark gradient overlay on top */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(10,10,10,0) 42%, rgba(4,4,4,0.205) 99.99%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* title text */}
        <div
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 12,
            color: "#fff",
            fontWeight: 700,
            lineHeight: 1.2,
            textShadow: "0 1px 2px rgba(0,0,0,.25)",
          }}
        >
          {title}
        </div>
      </article>
    </Link>
  );
}
