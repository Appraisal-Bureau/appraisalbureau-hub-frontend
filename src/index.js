import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./components/App";
import AuthProvider from "./components/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import { getToken } from "./helpers/auth.helpers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        {/* getToken() ? <App /> : <Login /> */ <App />}
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
