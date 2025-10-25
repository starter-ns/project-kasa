// src/components/Footer.jsx
import whiteLogo from "../assets/white-logo.svg"; // one level up to /assets

export default function Footer() {
  return (
    <footer
      style={{
        background: "#000",
        color: "#fff",
        textAlign: "center",
        padding: "32px 16px",
      }}
    >
      <img
        src={whiteLogo}
        alt="Kasa"
        style={{ height: 30, marginBottom: 8 }}
      />
      <p>© {new Date().getFullYear()} Kasa. All rights reserved.</p>
    </footer>
  );
}
