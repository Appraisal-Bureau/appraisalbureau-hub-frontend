import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./components/App";
import AuthProvider from "./components/AuthProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>{<App />}</BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
