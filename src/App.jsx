// src/App.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />

      <main style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
