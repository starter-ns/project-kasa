// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes.jsx";      // ✅ use the routes file
import "./styles/index.scss";              // global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
