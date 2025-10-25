// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import logo from "../assets/phoneLogo.svg"; // note: path goes up one level from components → assets

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
      }}
    >
      <NavLink
        to="/"
        aria-label="Kasa home"
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <img src={logo} alt="Kasa" style={{ height: 46.88, width: 145 }} />
      </NavLink>

      <nav style={{ display: "flex", gap: 16 }}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
            color: "#000",
            fontWeight: 500,
            fontSize: 12,
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
            color: "#000",
            fontWeight: 500,
            fontSize: 12,
          })}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
