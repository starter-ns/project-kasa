// src/pages/Listing.jsx
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RentalPropertyCard from "./RentalPropertyPage.jsx";

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

  // if not found → redirect to your 404 page
  if (listing === null) {
    return <Navigate to="/404" replace />;
  }

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
      imageUrl={imageUrl}
      rating={listing.rating}
      tags={listing.tags}
      equipments={listing.equipments}
      hostName={listing.host?.name}
      hostPicture={listing.host?.picture}
      pictures={listing.pictures}
    />
  );
}
