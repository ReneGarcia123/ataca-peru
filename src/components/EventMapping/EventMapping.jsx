
import React from "react";
import "./EventMapping.css";

export default function EventMapping({ data }) {
  if (!data) return null;

  const {
    titulo,
    descripcion,
    wikilocUrl,
    proximamente = false
  } = data;

  return (
    <section className="event-mapping-section">
      <div className="event-mapping-container">

        {titulo && (
          <h2 className="event-mapping-title">
            {titulo}
          </h2>
        )}

        {descripcion && (
          <p className="event-mapping-description">
            {descripcion}
          </p>
        )}

        <div className="event-mapping-map">
          {wikilocUrl ? (
            <div className="event-mapping-frame-container">

              <iframe
                src={wikilocUrl}
                title={titulo || "Mapa del recorrido"}
                className={
                  proximamente
                    ? "event-mapping-frame event-mapping-blur"
                    : "event-mapping-frame"
                }
                loading="lazy"
                allowFullScreen
              />

              {proximamente && (
                <div className="event-mapping-overlay">
                  <span className="event-mapping-overlay-text">
                    PRÓXIMAMENTE
                  </span>
                </div>
              )}

            </div>
          ) : (
            <div className="event-mapping-placeholder">
              <span>PRÓXIMAMENTE</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}