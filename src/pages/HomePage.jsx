import { useEffect, useState } from "react";
import Banner from "../components/Banner.jsx";
import ListingCard from "../components/ListingCard.jsx";
import bannerPic from "../assets/bannerPic.jpg";
import "../styles/HomePage.scss";

export default function HomePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // works locally and when deployed under a base path
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load data.json");
        return r.json();
      })
      .then(setItems)
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  return (
    <section className="home">
      {/* hero / banner */}
      <div className="home__banner-wrapper">
        <Banner
          title="At home, everywhere, and anywhere"
          imageUrl={bannerPic}
        />
      </div>

      {/* listings */}
      <div className="home__cards-area">
        {items.length === 0 ? (
          <p className="home__empty">No listings found.</p>
        ) : (
          <div className="home__grid">
            {items.map((l) => {
              // pick a cover from common keys in your JSON
              const cover =
                (typeof l.cover === "string" && l.cover) ||
                (typeof l.image === "string" && l.image) ||
                (Array.isArray(l.pictures) && l.pictures[0]) ||
                "";

              return (
                <div className="home__card-wrapper" key={l.id}>
                  <ListingCard
                    id={l.id}
                    title={l.title}
                    cover={cover}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
