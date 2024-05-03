import "../styles/App.scss";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Portfolio from "../pages/Portfolio";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* {user && ( */}
      <>
        <Navbar />
        <Sidebar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </>
      {/* })} */}
    </>
  );
}

export default App;
