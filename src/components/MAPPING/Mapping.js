import React from "react";
import "./Mapping.css";


const Mapping = ({ titulo, wikilocUrl, proximamente }) => {
  return (

    <section className="route-container">

      <h2 className="route-title">
        {titulo}
      </h2>

      <div className="route-map">

        {
          proximamente ? (

            <div className="map-coming-soon">

              <iframe
                src={wikilocUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                loading="lazy"
                title={titulo}
                className="blur-map"
              />

              <div className="coming-overlay">
                PRÓXIMAMENTE
              </div>

            </div>

          ) : (

            <iframe
              src={wikilocUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              title={titulo}
            />

          )
        }

      </div>

    </section>
  );
};

export default Mapping;