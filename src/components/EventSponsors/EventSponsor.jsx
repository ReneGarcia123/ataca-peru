import React from "react";
import "./EventSponsor.css";

export default function EventSponsors({ data }) {
  if (!data) return null;

  const {
    titulo,
    sponsors = []
  } = data;

  if (sponsors.length === 0) return null;

  /*
   * Duplicamos los auspiciadores para conseguir
   * el efecto de movimiento infinito.
   */
  const sponsorsDuplicados = [...sponsors, ...sponsors];

  return (
    <section className="event-sponsors-section">

      <div className="event-sponsors-container">

        {titulo && (
          <h2 className="event-sponsors-title">
            {titulo}
          </h2>
        )}

        <div className="event-sponsors-slider">

          <div className="event-sponsors-track">

            {sponsorsDuplicados.map((sponsor, index) => (

              <a
                key={`${sponsor.id || index}-${index}`}
                href={sponsor.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="event-sponsor"
                aria-label={sponsor.alt || "Auspiciador"}
              >

                <img
                  src={sponsor.imagen}
                  alt={sponsor.alt || "Auspiciador"}
                />

              </a>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}