import { useState } from "react";
import Vector from "../assets/Vector.svg";
import aboutBanner from "../assets/aboutPageBanner.jpg";
import "../styles/AboutPage.scss";

export default function AboutPage() {
  // each panel has its own open/closed state
  const [open, setOpen] = useState({
    reliability: false,
    respect: false,
    service: false,
    security: false,
  });

  // flip just one key
  const toggle = (key) => {
    setOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <main className="about">
      {/* banner image */}
      <section className="about__banner" aria-label="About Kasa">
        <img
          src={aboutBanner}
          alt=""
          className="about__banner-img"
        />
      </section>

      {/* accordion list */}
      <section className="about__accordions">
        <AboutAccordion
          title="Reliability"
          isOpen={open.reliability}
          onToggle={() => toggle("reliability")}
          caretIcon={Vector}
        >
          <p>
            Les annonces postées sur Kasa garantissent une fiabilité totale.
            Les photos sont conformes aux logements, et toutes les informations
            sont régulièrement vérifiées par nos équipes.
          </p>
        </AboutAccordion>

        <AboutAccordion
          title="Respect"
          isOpen={open.respect}
          onToggle={() => toggle("respect")}
          caretIcon={Vector}
        >
          <p>
            La bienveillance fait partie des valeurs fondatrices de Kasa.
            Tout comportement discriminatoire ou de perturbation du voisinage
            entraînera une exclusion de notre plateforme.
          </p>
        </AboutAccordion>

        <AboutAccordion
          title="Service"
          isOpen={open.service}
          onToggle={() => toggle("service")}
          caretIcon={Vector}
        >
          <p>
            La bienveillance fait partie des valeurs fondatrices de Kasa.
            Tout comportement discriminatoire ou de perturbation du voisinage
            entraînera une exclusion de notre plateforme.
          </p>
        </AboutAccordion>

        <AboutAccordion
          title="Security"
          isOpen={open.security}
          onToggle={() => toggle("security")}
          caretIcon={Vector}
        >
          <p>
            La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes
            que pour les voyageurs, chaque logement correspond aux critères de
            sécurité établis par nos services. En laissant une note aussi bien
            à l'hôte qu'au locataire, cela permet à nos équipes de vérifier
            que les standards sont bien respectés. Nous organisons également
            des ateliers sur la sécurité domestique pour nos hôtes.
          </p>
        </AboutAccordion>
      </section>
    </main>
  );
}

// one accordion block
// pseudo-code example

function AboutAccordion({ title, isOpen, onToggle, children }) {
  return (
    <div className={`about-acc ${isOpen ? "about-acc--open" : ""}`}>
      <button
        className="about-acc__header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="about-acc__title">{title}</span>
        <img
          src={Vector}
          alt=""
          className={`about-acc__caret ${
            isOpen ? "about-acc__caret--open" : ""
          }`}
        />
      </button>

      {/* 👇 ALWAYS rendered, class controls animation */}
      <div className="about-acc__panel">
  {children}
</div>

    </div>
  );
}

