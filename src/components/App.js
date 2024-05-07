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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* {user && ( */}
        <Route element={<AuthorizedUserLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>
        {/* })} */}
      </Routes>
    </>
  );
}

export default App;
