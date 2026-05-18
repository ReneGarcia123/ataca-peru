import React from 'react'
import './Events.css';

const eventos = [
  {
    id: 1,
    titulo: "TRAIL DEL PESCADOR 10K 2026 - PRIMERA EDICIÓN",
    fecha: "28 de junio 2026",
    lugar: "Playa de Los Órganos, Piura, Perú",
    descripcion: "¡Más fuerte que el cansancio! Carrera de Trail Running la playa de Los Órganos - Piura",
    enlace: "/TRAIL_DEL_PESCADOR",
    imagen: "https://atacaperu.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-05-at-11.34.23-AM.avif"
  },
  {
    id: 2,
    titulo: "AQP TRAIL RUNNING 2026 - SEGUNDA SERIE: EL DESIERTO DE LA JOYA ",
    fecha: "05 de julio 2026",
    lugar: "La Joya, Arequipa, Perú",
    descripcion: "¡Más allá de tus límites! Carrera de Trail Running en el desierto de La Joya - Arequipa",
    enlace: "/triatlon",
    imagen: "https://atacaperu.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-22-at-6.17.48-PM.avif"
  },
  {
    id: 3,
    titulo: "CARRERA SOLIDARIA 6K: ALDEAS INFANTILES 2026 - TERCERA EDICIÓN",
    fecha: "12 de julio 2026",
    lugar: "Cerro Colorado, Arequipa, Perú",
    descripcion: "Arequipa corre por una infancia feliz. Carrera solidaria a beneficio de Aldeas Infantiles - Arequipa",
    enlace: "/aldeas_infantiles",
    imagen: "https://atacaperu.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-15-at-1.10.27-PM.avif" 
  },

  {
    id: 4,
    titulo: "CORRE CON LOS BOMBEROS 5K 2026 - CUARTA EDICIÓN",
    fecha: "06 de septiembre 2026",
    lugar: "Arequipa, Arequipa, Perú",
    descripcion: "Corre con los Bomberos, en esta carrera de apoyo a nuestros héroes de la ",
    enlace: "/utcc",
    imagen: "https://atacaperu.com/wp-content/uploads/2026/05/bobmeros-flyer.avif"
  },
  
  {
    id: 5,
    titulo: "ULTRA COLCA CANYON 2026",
    fecha: "07 y 08 de noviembre 2026",
    lugar: "Colca, Arequipa, Perú",
    descripcion: "¡Desafía el cañón más profundo del mundo! Carrera de Ultra Trail Running en el majestuoso Cañón del Colca - Arequipa",
    enlace: "/utcc",
    imagen: "https://atacaperu.com/wp-content/uploads/2026/01/cuadrado.avif"
  }
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
            <a href={evento.enlace} target="_blank" rel="noopener noreferrer">
              Ver detalles e inscribirse
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
