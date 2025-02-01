import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import '../styles/navbar.css';
import '../styles/main.css';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

  return (
    <header>
      <nav className="navbar">
        <a href="#/" className="navbar__brand">
          <img src="/images/dog-logo.png" alt="MyApp Logo" className="navbar__logo" />
          CUTTIE DOGS' KINGDOM
        </a>
        <button
          className="navbar__toggle"
          aria-label="Toggle navigation menu"
          onClick={handleDropdown}
        >
          ☰
        </button>
        <ul className={`navbar__menu ${isDropdownOpen ? 'navbar__menu--active' : ''}`}>
          <li className="navbar__item">
            <a href="#/" className="navbar__link">Home</a>
          </li>
          <li className="navbar__item">
            <a href="#/news" className="navbar__link">News</a>
          </li>
          <li className="navbar__item">
            <a href="#/about" className="navbar__link">About</a>
          </li>
          <li className="navbar__item">
            <a href="#/register" className="navbar__link">Register</a>
          </li>
          
          <li className="navbar__item">
            <a href="#/privacy" className="navbar__link">Privacy</a>
          </li>
          <li className="navbar__item">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
      <div className="banner">
        <img src="/images/back-ground.jpg" alt="Banner" className="banner-image" />
      </div>
    </header>
  );
};

export default Navbar;
