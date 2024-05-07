import "../styles/App.scss";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Portfolio from "../pages/Portfolio";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function App() {
  const { user } = useAuthContext();

  const wrapPrivateRoute = (element) => {
    if (user) {
      return element;
    } else {
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
            user ? (
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
