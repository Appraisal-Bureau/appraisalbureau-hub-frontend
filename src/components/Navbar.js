import '../styles/Navbar.scss';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import logo from '../assets/logo.jpg';

function Navbar() {
  return (
    <div className="navbar">
        <img className="logo" src={logo} alt="Appraisal Bureau Logo"></img>
        <span className="navbar-text">Caroline Taylor's Portfolios | My Portfolio <FiChevronDown className='icon'/></span>
        <span className="navbar-text right">Caroline Taylor <FiChevronDown className='icon' /></span>
        <FiMenu className='hamburger-menu icon' />
    </div>
  );
}

export default Navbar;
