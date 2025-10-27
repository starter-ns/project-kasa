// src/pages/Listing.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RentalPropertyCard from "./RentalPropertyCard.jsx";

export default function ListingPage() {
  const { id } = useParams(); // string
  const [listing, setListing] = useState(undefined); // undefined = loading; null = not found

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load data.json");
        return r.json();
      })
      .then((all) => {
        const raw = all.find((x) => String(x.id) === String(id)) || null;
        setListing(raw);
      })
      .catch(() => setListing(null));
  }, [id]);

  if (listing === undefined) return <p>Loading…</p>;
  if (listing === null) return <p>Listing not found.</p>;

  // very light “parsing” inline (no extra files)
  const imageUrl =
    (Array.isArray(listing.pictures) && listing.pictures[0]) ||
    listing.cover ||
    listing.image ||
    "";

  return (
  <RentalPropertyCard
    title={listing.title}
    location={listing.location}
    description={listing.description}
    imageUrl={
      (Array.isArray(listing.pictures) && listing.pictures[0]) ||
      listing.cover ||
      listing.image ||
      ""
    }
    rating={listing.rating}
    tags={listing.tags}
    equipments={listing.equipments}
    hostName={listing.host?.name}        // 👈 add
    hostPicture={listing.host?.picture}  // 👈 add
    pictures={listing.pictures}
  />
);


}
