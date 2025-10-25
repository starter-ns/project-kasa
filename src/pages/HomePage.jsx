import { useEffect, useState } from "react";
import Banner from "../components/Banner.jsx";
import ListingCard from "../components/ListingCard.jsx";
import bannerPic from "../assets/bannerPic.jpg";

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
    <section style={{ display: "grid", gap: 24, padding: "0" }}>
      <Banner title="At home, everywhere, and anywhere" imageUrl={bannerPic} height={220} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
          padding: "24px 0",
        }}
      >
        {items.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>No listings found.</p>
        ) : (
          items.map((l) => (
            <ListingCard key={l.id} id={l.id} title={l.title} />
          ))
        )}
      </div>
    </section>
  );
}
