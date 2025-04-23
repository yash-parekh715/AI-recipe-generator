import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Import Poppins font for use throughout the app
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/600.css"; // Semi-bold

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
