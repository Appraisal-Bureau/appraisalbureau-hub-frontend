import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import logo from 'assets/logo.jpg';
import { useAuthContext } from 'context/AuthContext';
import { removeToken } from 'helpers/auth.helpers';
import { useState } from 'react';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import './Navbar.scss';

function Navbar() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };
  const handleLogout = () => {
    console.log('Logging out...');
    removeToken();
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <div className="navbar" data-testid="navbar">
      <a href="/dashboard">
        <img className="logo" src={logo} alt="Appraisal Bureau Logo" />
      </a>
      <span className="navbar-text left">
        Caroline Taylor's Portfolios | My Portfolio
        <FiChevronDown className="icon" />
      </span>
      <Accordion
        disableGutters
        sx={{
          backgroundColor: 'inherit',
          color: 'inherit',
          minHeight: 0,
          overflow: 'auto',
          position: 'absolute',
          right: 0,
          top: 0,
        }}
        className="right navbar-text"
        id="user-dropdown"
      >
        <AccordionSummary sx={{ minHeight: 0 }}>
          <span className="navbar-text">
            Caroline Taylor
            <FiChevronDown className="icon" />
          </span>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <ListItemButton onClick={handleLogout}>
            <ListItemText sx={{ fontFamily: 'inherit' }}>Logout</ListItemText>
          </ListItemButton>
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
            p: 2,
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
