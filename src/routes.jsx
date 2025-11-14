// src/routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

// pages
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ListingPage from "./pages/ListingPage.jsx";
import NotFound from "./pages/NotFoundPage.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* App = layout: header + main + footer */}
        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/listing/:id" element={<ListingPage />} />
          <Route path="/404" element={<NotFound />} />
          {/* anything else → 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
