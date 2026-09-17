import React from 'react'
import './Events.css';

const eventos = [

  {
    id: 1,
    titulo: "LSL MTB INTERNATIONAL 2026 - SEGUNDA SERIE: EL SEÑOR DE LA JOYA",
    fecha: "27 de septiembre 2026",
    lugar: "La Joya, Arequipa, Perú",
    descripcion: "¡Pedalea al máximo! MTB en el Señor de La Joya – Arequipa, donde la resistencia y la velocidad se ponen a prueba.",
    enlace: "/lsl_mtb_joya",
    imagen: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/SENOR%20JOYA.jpg",
    disponible:true
  },
  {
    id: 2,
    titulo: "AQP TRAIL RUNNING 2026 - CUARTA SERIE: EL VALLE DE CHILINA",
    fecha: "25 de octubre 2026",
    lugar: "Valle de Chilina, Arequipa, Perú",
    descripcion: "¡Más allá de tus límites! Carrera de Trail Running en el Valle de Chilina - Arequipa",
    enlace: "/aqp_trs_chilina",
    imagen: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/IMG_6805.PNG",
    disponible:true
  },  
  {
    id: 3,
    titulo: "ULTRA COLCA CANYON 2026",
    fecha: "07 y 08 de noviembre 2026",
    lugar: "Colca, Arequipa, Perú",
    descripcion: "¡Desafía el cañón más profundo del mundo! Carrera de Ultra Trail Running en el majestuoso Cañón del Colca - Arequipa",
    enlace: "/utcc",
    imagen: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/UTCC2026.jpg?updatedAt=1789644060168",
    disponible:false
  },
];

const Events = () => {
  return (
    <section className="events-section">
      <h2>Próximos Eventos</h2>
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
                  Ver detalles e inscribirse
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
