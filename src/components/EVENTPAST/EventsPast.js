import React from 'react'
import './EventsPast.css';

const eventos = [

  {
    id: 1,
    titulo: "CARRERA DE FUEGO 5K: CORRE CON LOS BOMBEROS 2026 - IV EDICIÓN",
    fecha: "06 de septiembre 2026",
    lugar: "Arequipa, Arequipa, Perú",
    descripcion: "Corre con los Bomberos, en esta carrera de apoyo a nuestros héroes de la Benemérita Compañía de Bomberos Arequipa - 19",
    enlace: "/bomberos_2026",
    imagen: "https://res.cloudinary.com/r0ldqpr5/image/upload/v1787792125/WhatsApp_Image_2026-08-25_at_11.11.32_AM.jpg",
    disponible:true
  },

  {
    id: 2,
    titulo: "AQP TRAIL RUNNING 2026 - SEGUNDA SERIE: EL DESIERTO DE LA JOYA",
    fecha: "05 de julio 2026",
    lugar: "La Joya, Arequipa, Perú",
    descripcion: "¡Más allá de tus límites! Carrera de Trail Running en el desierto de La Joya - Arequipa",
    enlace: "/aqp_trs_joya",
    imagen: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/joua.jpg",
    disponible:true
  },

  
  {
    id: 3,
    titulo: "CARRERA SOLIDARIA 6K: ALDEAS INFANTILES 2026 - TERCERA EDICIÓN",
    fecha: "12 de julio 2026",
    lugar: "Cerro Colorado, Arequipa, Perú",
    descripcion: "Arequipa corre por una infancia feliz. Carrera solidaria a beneficio de Aldeas Infantiles - Arequipa",
    enlace: "/aldeas_infantiles",
    imagen: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/cuadrado%20aldeas.jpg",
    disponible:true
  },
  {
    id: 4,
    titulo: "CENTAURO DEL DESIERTO MTB 45K - 2026",
    fecha: "20 de junio 2026",
    lugar: "Valle 2000, Tacna, Perú",
    descripcion: "¡Más fuerte que el cansancio! IV COMPETENCIA INTERNACIONAL DE MTB EN EL DESIERTO DE TACNA",
    enlace: "/centauro_2026",
    imagen: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/centauro.jpg",
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
