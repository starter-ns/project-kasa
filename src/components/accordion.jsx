import "../styles/Accordion.scss";

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
    <section className="accordion">
      <button
        className="accordion__button"
        onClick={onToggle}
        aria-expanded={open}
        style={{ background: color }}
      >
        <span className="accordion__left">
          {leftIcon && (
            <img
              src={leftIcon}
              alt=""
              className="accordion__left-icon"
            />
          )}
          {title}
        </span>

        {caretIcon && (
          <img
            src={caretIcon}
            alt=""
            className={`accordion__caret ${open ? "accordion__caret--open" : ""}`}
          />
        )}
      </button>

      <div
        className="accordion__panel-wrapper"
        style={{ maxHeight: open ? 600 : 0 }}
      >
        {open && (
          <div className="accordion__panel">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
