import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Listing() {
  const { id } = useParams(); // string
  const [listing, setListing] = useState(undefined); // undefined = loading; null = not found

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load data.json");
        return r.json();
      })
      .then((all) => {
        const found = all.find((x) => String(x.id) === String(id));
        setListing(found ?? null);
      })
      .catch((err) => {
        console.error(err);
        setListing(null);
      });
  }, [id]);

  if (listing === undefined) return <p>Loading…</p>;
  if (listing === null) return <p>Listing not found.</p>;

  return (
    <article style={{ padding: 16 }}>
      <h1 style={{ color: "#ff6060", marginBottom: 8 }}>{listing.title}</h1>
      <p style={{ marginTop: 0, color: "#666" }}>{listing.location}</p>
      <div style={{ height: 320, borderRadius: 12, overflow: "hidden", margin: "12px 0", background: "#f6f6f6" }}>
        <img
          src={listing.pictures?.[0] || listing.cover}
          alt={listing.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <p>{listing.description}</p>
    </article>
  );
}
