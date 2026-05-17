import React from 'react'
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="footer">

      {/* Parte superior */}
      <div className="footer-top">

        <div className="footer-logo">
          <img
            src="https://atacaperu.com/wp-content/uploads/2023/04/logo-blanco.png"
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
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/250px-Facebook_Logo_%282019%29.png"
              alt="Facebook"
              className="social-icon"
            />
          </a>
          <a
            href="https://instagram.com/atacaperu"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://atacaperu.com/wp-content/uploads/2026/05/isntagram.avif"
              alt="Instagram"
              className="social-icon"
            />
          </a>
          <a
            href="https://www.tiktok.com/@atacaperu?_r=1&_t=ZS-96Q8tYYjqnX"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://atacaperu.com/wp-content/uploads/2026/05/tiktok.avif"
              alt="Tiktok"
              className="social-icon"
            />
          </a>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="footer-divider"></div>

      {/* Parte inferior */}
      <div className="footer-bottom">

        {/* CONTACTO */}
        <div className="footer-column">

          <h3>
            Contacto
          </h3>

          <p>
            📧 contacto@atacaperu.com
          </p>

          <p>
            📞 +51 999 999 999
          </p>

          <p>
            📍 Arequipa, Perú
          </p>

        </div>

        {/* EMPRESA */}
        <div className="footer-column">

          <h3>
            Empresa
          </h3>

          <p>
            ATACA PERU SAC
          </p>

          <p>
            RUC: 2060XXXXXXX
          </p>

          <p>
            Organización de eventos deportivos
          </p>

        </div>

        {/* LEGAL */}
        <div className="footer-column">

          <h3>
            Legal
          </h3>

          <a href="/terminos-y-condiciones">
            Términos y Condiciones
          </a>

          <a href="/politica-de-privacidad">
            Política de Privacidad
          </a>

          <a href="/libro-de-reclamaciones">
            Libro de Reclamaciones
          </a>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-copy">

        © {new Date().getFullYear()} ATACA PERU EIRL - Todos los derechos reservados

      </div>

    </footer>
  )
}

export default Footer;