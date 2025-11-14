// src/App.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./styles/AppLayout.scss";


export default function App() {
  return (
    <div className="app-layout">
      <Header />

      <main className="app-layout__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
