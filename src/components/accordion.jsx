// src/components/Accordion.jsx
export default function Accordion({
  title,
  open,
  onToggle,
  color = "#FF6060",
  leftIcon,
  caretIcon,
  children,
}) {
  return (
    <section style={{ marginTop: 10 }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%",
          background: color,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "12px 14px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          gap: 10,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {leftIcon && (
            <img
              src={leftIcon}
              alt=""
              style={{ width: 16, height: 16 }}
            />
          )}
          {title}
        </span>

        {caretIcon && (
          <img
            src={caretIcon}
            alt=""
            style={{
              width: 12,
              height: 12,
              transform: `rotate(${open ? 180 : 0}deg)`,
              transition: "transform .2s",
            }}
          />
        )}
      </button>

      <div
        style={{
          maxHeight: open ? 600 : 0,
          overflow: "hidden",
          transition: "max-height .25s ease",
          background: "#f9f9f9",
          borderRadius: "0 0 8px 8px",
        }}
      >
        {open && (
          <div
            style={{
              padding: "12px 14px",
              color: "#000",
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "143%",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
