import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // si usas react-router
import './Header.css';

function Header() {
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setAbierto(!abierto);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav>
        <div className="nav-container">
          <Link to="/" className="logo">
            <img
              src="https://atacaperu.com/wp-content/uploads/2018/05/logo-largo-blanco.png"
              alt="Ataca Perú Logo"
              className="logo-img"
            />
          </Link>

          <button
            className="menu-btn"
            onClick={toggleMenu}
            aria-expanded={abierto}
            aria-controls="nav-links"
          >
            {abierto ? "✖" : "☰"}
          </button>

          <ul id="nav-links" className={`nav-links ${abierto ? "active" : ""}`}>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/">Nosotros</Link></li>
            <li><Link to="/">Competencias</Link></li>
            <li><Link to="/">Contactos</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
