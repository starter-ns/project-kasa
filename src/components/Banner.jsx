// src/components/Banner.jsx
export default function Banner({ title, imageUrl, width = 335 }) {
  return (
    <section
      aria-label={title}
      style={{
        position: "relative",
        borderRadius: 10,
        overflow: "hidden",
        height: 111,
        width,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45))",
        }}
      />

      {/* Text */}
      <div style={{ position: "relative", zIndex: 1, paddingInline: 16 }}>
        <h1
          style={{
            margin: 0,
            alignItems: "center",
            color: "#fff",
            fontWeight: 700,
            lineHeight: 1.1,
            fontSize: 24,
            textShadow: "0 2px 8px rgba(0,0,0,.35)",
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
