// src/components/Footer.jsx
import whiteLogo from "../assets/white-logo.svg";
import "../styles/Footer.scss"; // 👈 add this line

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <img src={whiteLogo} alt="Kasa" className="footer__logo" />

        {/* the <br/> forces a line break on mobile; hidden on desktop via CSS */}
        <p className="footer__copy">
          © {new Date().getFullYear()} Kasa.<br />All rights reserved
        </p>
      </div>
    </footer>
  );
}
