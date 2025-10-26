// src/components/RentalPropertyCard.jsx
export default function RentalPropertyCard({
  title,
  location,
  description,
  imageUrl,
}) {
  return (
    <article style={{ padding: 16 }}>
      <div
        style={{
          width: 335,
          height: 255,
          borderRadius: 12,
          overflow: "hidden",
          margin: "12px 0",
          background: "#f6f6f6",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : null}
      </div>

      <h1
        style={{
          color: "#FF6060",
          marginBottom: 8,
          fontWeight: 500,
          fontSize: "18px",
        }}
      >
        {title}
      </h1>

      <p
        style={{
          marginTop: 0,
          color: "#000000",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "143%",
        }}
      >
        {location}
      </p>

      <p
        style={{
          marginTop: 0,
          color: "#000000",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "143%",
        }}
      >
        {description}
      </p>
    </article>
  );
}
