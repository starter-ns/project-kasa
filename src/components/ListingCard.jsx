// src/components/ListingCard.jsx
import { Link } from "react-router-dom";

export default function ListingCard({ id, title }) {
  return (
    <Link
      to={`/listing/${id}`}
      style={{ textDecoration: "none" }}
    >
      <article
        style={{
          position: "relative",
          height: 180,
          borderRadius: 12,
          overflow: "hidden",
          // gradient background (light top → darker bottom)
          background:
            "linear-gradient(180deg, #ff7b7b 0%, #ff6060 45%, #e14e4e 100%)",
          // subtle depth + smooth hover
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

        {/* title at the bottom-left */}
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

        {/* focus ring for keyboard accessibility */}
        <span
          className="sr-only"
          style={{ position: "absolute", inset: 0 }}
        />
      </article>
    </Link>
  );
}
