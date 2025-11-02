export default function Banner({ title, imageUrl }) {
  return (
    <section
      className="home-banner"
      aria-label={title}
    >
      {/* background image */}
      <img
        src={imageUrl}
        alt=""
        className="home-banner__img"
      />

      {/* dark overlay */}
      <div
        className="home-banner__overlay"
        aria-hidden="true"
      />

      {/* text container */}
      <div className="home-banner__text-wrap">
        <h1 className="home-banner__text">
          {title}
        </h1>
      </div>
    </section>
  );
}
