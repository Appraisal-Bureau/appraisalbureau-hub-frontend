import "../styles/Navbar.scss";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import logo from "../assets/logo.jpg";
// import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../helpers/auth.helpers";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="Appraisal Bureau Logo"></img>
      <span className="navbar-text">
        Caroline Taylor's Portfolios | My Portfolio{" "}
        <FiChevronDown className="icon" />
      </span>
      <span className="navbar-text right">
        Caroline Taylor <FiChevronDown className="icon" />
      </span>
      <span className="navbar-text right" onClick={handleLogout}>
        Logout
      </span>
      <FiMenu className="hamburger-menu icon" />
    </div>
  );
}

export default Navbar;
