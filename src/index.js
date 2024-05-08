import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./components/App";
import AuthProvider from "./providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { FallbackProvider } from "./providers/FallbackProvider";
import "nprogress/nprogress.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <FallbackProvider>{<App />}</FallbackProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
