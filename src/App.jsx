// src/App.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import "./styles/AppLayout.scss"; // 👈 add this line

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
