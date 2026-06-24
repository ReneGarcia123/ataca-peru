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
