import React from 'react'
import './EventsPast.css';

const eventos = [
  {
    id: 1,
    titulo: "CENTAURO DEL DESIERTO MTB 45K - 2026",
    fecha: "20 de junio 2026",
    lugar: "Valle 2000, Tacna, Perú",
    descripcion: "¡Más fuerte que el cansancio! IV COMPETENCIA INTERNACIONAL DE MTB EN EL DESIERTO DE TACNA",
    enlace: "/centauro_2026",
    imagen: "https://atacaperu.com/wp-content/uploads/2026/06/centauro.avif",
    disponible:true
  },

  {
    id: 2,
    titulo: "CARRERA SOLIDARIA 6K: ALDEAS INFANTILES 2026 - TERCERA EDICIÓN",
    fecha: "12 de julio 2026",
    lugar: "Cerro Colorado, Arequipa, Perú",
    descripcion: "Arequipa corre por una infancia feliz. Carrera solidaria a beneficio de Aldeas Infantiles - Arequipa",
    enlace: "/aldeas_infantiles",
    imagen: "https://atacaperu.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-15-at-1.10.27-PM.avif",
    disponible:true
  },

  {
    id: 3,
    titulo: "AQP TRAIL RUNNING 2026 - SEGUNDA SERIE: EL DESIERTO DE LA JOYA",
    fecha: "05 de julio 2026",
    lugar: "La Joya, Arequipa, Perú",
    descripcion: "¡Más allá de tus límites! Carrera de Trail Running en el desierto de La Joya - Arequipa",
    enlace: "/aqp_trs_joya",
    imagen: "https://atacaperu.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-22-at-6.17.48-PM.avif",
    disponible:true
  },
];

const Events = () => {
  return (
    <section className="events-section">
      <h2>Eventos Pasados</h2>
      <div className="eventos-grid">
        {eventos.map((evento) => (
          <div key={evento.id} className="evento-card">
            <img src={evento.imagen} alt={evento.titulo} className="evento-img" />
            <h3>{evento.titulo}</h3>
            <p><strong>Fecha:</strong> {evento.fecha}</p>
            <p><strong>Lugar:</strong> {evento.lugar}</p>
            <p>{evento.descripcion}</p>
            {
              evento.disponible ? (

                <a
                  href={evento.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver resultados finales
                </a>

              ) : (

                <button className="btn-proximamente">
                  Próximamente
                </button>

              )
            }
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
