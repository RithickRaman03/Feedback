import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Topbar from "./components/topbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Topbar />
  </React.StrictMode>
);
