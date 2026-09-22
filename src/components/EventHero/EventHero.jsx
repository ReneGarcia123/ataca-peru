import React from "react";
import "./EventHero.css";

export default function EventHero({ data }) {

    if (!data) {
        return null;
    }

    return (

        <section className="event-hero">

            {/* =================================================
                VIDEO
            ================================================= */}

            <video
                className="event-hero-video"
                src={data.video}
                autoPlay
                loop
                muted
                playsInline
            />


            {/* =================================================
                OVERLAY
            ================================================= */}

            <div className="event-hero-overlay"></div>


            {/* =================================================
                CONTENIDO
            ================================================= */}

            <div className="event-hero-content">


                {/* =================================================
                    ENCABEZADO
                ================================================= */}

                <div className="event-hero-header">

                    {data.logo && (

                        <img
                            src={data.logo}
                            alt={data.titulo || "Logo del evento"}
                            className="event-hero-image"
                        />

                    )}

                    {data.titulo && (

                        <h1 className="event-hero-title">
                            {data.titulo}
                        </h1>

                    )}

                </div>


                {/* =================================================
                    DESCRIPCIÓN
                ================================================= */}

                {data.descripcion && (

                    <p className="event-hero-description">
                        {data.descripcion}
                    </p>

                )}


                {/* =================================================
                    DETALLES
                ================================================= */}

                {data.detalles && data.detalles.length > 0 && (

                    <div className="event-hero-details">

                        {data.detalles.map((item, index) => (

                            <div
                                key={item.id || index}
                                className="event-detail-card"
                            >

                                <div className="event-detail-icon">
                                    {item.icon}
                                </div>

                                <h4 className="event-detail-label">
                                    {item.label}
                                </h4>

                                <p className="event-detail-value">
                                    {item.value}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>

    );

}