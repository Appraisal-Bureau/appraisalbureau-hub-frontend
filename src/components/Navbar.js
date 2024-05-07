import "../styles/Navbar.scss";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import logo from "../assets/logo.jpg";
// import { useAuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { removeToken } from "../helpers/auth.helpers";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };
  const handleLogout = () => {
    console.log("Logging out...");
    removeToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar">
      <a href="/dashboard">
        <img className="logo" src={logo} alt="Appraisal Bureau Logo" />
      </a>
      <span className="navbar-text">
        Caroline Taylor's Portfolios | My Portfolio
        <FiChevronDown className="icon" />
      </span>
      <Accordion
        disableGutters
        sx={{
          backgroundColor: "inherit",
          color: "inherit",
          minHeight: 0,
          overflow: "auto",
          position: "absolute",
          right: 0,
          top: 0,
        }}
        className="navbar-text right"
      >
        <AccordionSummary sx={{ minHeight: 0 }}>
          Caroline Taylor <FiChevronDown className="icon" />
        </AccordionSummary>
        <AccordionDetails>
          <span onClick={handleLogout}>Logout</span>
        </AccordionDetails>
      </Accordion>
      <FiMenu
        onClick={toggleDrawer(!open)}
        className="hamburger-menu right icon"
      />
      <Drawer
        anchor="right"
        variant="temporary"
        open={open}
        onClick={toggleDrawer(!open)}
      >
        <Box
          sx={{
            p: 5,
            height: 5,
          }}
        >
          <ListItemButton>
            <Link to="/dashboard">Dashboard</Link>
          </ListItemButton>
          <ListItemButton>
            <Link to="/portfolio">Portfolio</Link>
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Messages" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Subscriptions" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Workflows" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="API Keys" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Logout" onClick={handleLogout} />
          </ListItemButton>
        </Box>
      </Drawer>
    </div>
  );
}

export default Navbar;
