import { NavLink } from "react-router-dom";
import logo from "../assets/phoneLogo.svg";
import "../styles/Header.scss"; // 👈 import stylesheet

export default function Header() {
  return (
    <header className="site-header">
      <NavLink to="/" aria-label="Kasa home" className="site-header__brand">
        <img src={logo} alt="Kasa" className="site-header__logo" />
      </NavLink>

      <nav className="site-header__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "site-header__link" + (isActive ? " site-header__link--active" : "")
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            "site-header__link" + (isActive ? " site-header__link--active" : "")
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
