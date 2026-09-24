import React, { useState } from "react";

import EventRegistration from "../EventRegistration/EventRegistration.jsx";
import eventRegistration from "../EventRegistration/eventRegistration.js";

import "./EventRegisterButton.css";

export default function EventRegisterButton({ data }) {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  if (!data) return null;

  return (
    <>
      <div className="event-register-card">

        {/* IMAGEN */}
        {data.imagen && (
          <div className="event-register-image">
            <img
              src={data.imagen}
              alt={data.titulo || "Inscripción"}
            />
          </div>
        )}

        {/* CONTENIDO */}
        <div className="event-register-content">

          {data.titulo && (
            <h3 className="event-register-title">
              {data.titulo}
            </h3>
          )}

          {data.descripcion && (
            <p className="event-register-description">
              {data.descripcion}
            </p>
          )}

          <button
            type="button"
            className="event-register-button"
            onClick={() => setMostrarRegistro(true)}
          >
            {data.texto || "Inscribirme"}
          </button>

        </div>

      </div>

      {/* MODAL */}
      <EventRegistration
        isOpen={mostrarRegistro}
        onClose={() => setMostrarRegistro(false)}
        data={eventRegistration[data.evento]}
      />
    </>
  );
}