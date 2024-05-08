import "../styles/App.scss";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Portfolio from "../pages/Portfolio";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getToken } from "../helpers/auth.helpers";

function App() {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return <div style={{ fontSize: 72 }}>UGLY LOADING DIV</div>;
  }

  const wrapPrivateRoute = (element) => {
    if (getToken()) {
      return element;
    } else {
      console.log("no user");
      return <Navigate to="/login" replace />;
    }
  };
  const AuthorizedUserLayout = () => (
    <div>
      <Navbar />
      <Sidebar />
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            getToken() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthorizedUserLayout />}>
          <Route path="/dashboard" element={wrapPrivateRoute(<Dashboard />)} />
          <Route path="/portfolio" element={wrapPrivateRoute(<Portfolio />)} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
