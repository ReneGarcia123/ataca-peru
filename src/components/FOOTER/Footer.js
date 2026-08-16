import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="footer">

      {/* Parte superior */}
      <div className="footer-top">

        <div className="footer-logo">
          <img
            src="https://res.cloudinary.com/r0ldqpr5/image/upload/v1786922204/logo-blanco.png"
            alt="ATACA PERU"
            className="logo-img"
          />
          <p>
            Impulsando el deporte competitivo en el Perú
          </p>
        </div>

        <div className="footer-social">
          <a
            href="https://facebook.com/atacaperu"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook className="social-icon" />
          </a>
          <a
            href="https://instagram.com/atacaperu"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a
            href="https://www.tiktok.com/@atacaperu?_r=1&_t=ZS-96Q8tYYjqnX"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
          >
            <FaTiktok className="social-icon" />
          </a>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="footer-divider"></div>

      {/* Parte inferior */}
      <div className="footer-bottom">

        {/* CONTACTO */}
        <div className="footer-column">
          <h3>Contacto</h3>
          <p>📧 contacto@atacaperu.com</p>
          <p>📞 +51 941 656 379</p>
          <p>📍 Arequipa, Perú</p>
        </div>

        {/* EMPRESA */}
        <div className="footer-column">
          <h3>Empresa</h3>
          <p>ATACA PERU EIRL</p>
          <p>RUC: 20611990449</p>
          <p>Organización de eventos deportivos</p>
        </div>

        {/* LEGAL */}
        <div className="footer-column">
          <h3>Legal</h3>
          <a href="/">Términos y Condiciones</a>
          <a href="/">Política de Privacidad</a>
          <a href="/">Libro de Reclamaciones</a>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-copy">
        © {new Date().getFullYear()} ATACA PERU EIRL - Todos los derechos reservados
      </div>

    </footer>
  );
};

export default Footer;