import { Link } from "react-router-dom";

export default function ListingCard({ id, title, cover }) {
  return (
    <Link
      to={`/listing/${id}`}
      style={{
        display: "block",        // make the link take width/height
        width: 335,
        height: 255,
        margin: "0 auto",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <article
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "#FF6060",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          transition: "transform .2s ease, box-shadow .2s ease",
        }}
      >
        {cover && (
          <img
            src={cover}
            alt={title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(10, 10, 10, 0) 42%, rgba(4, 4, 4, 0.205) 99.99%, rgba(0, 0, 0, 0.5) 100%)'

          }}
        />
        <div
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 12,
            color: "#FFF",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {title}
        </div>
      </article>
    </Link>
  );
}
