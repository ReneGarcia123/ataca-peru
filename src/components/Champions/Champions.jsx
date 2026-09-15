import { useEffect, useState } from "react";
import "./Champions.css";

export default function Champions({ data }) {

    const [current, setCurrent] = useState(0);

    const total = data.categories.length;


    /* =====================================================
       SIGUIENTE
    ===================================================== */

    const siguiente = () => {

        setCurrent((prev) => {

            if (prev >= total - 1) {
                return 0;
            }

            return prev + 1;

        });

    };


    /* =====================================================
       ANTERIOR
    ===================================================== */

    const anterior = () => {

        setCurrent((prev) => {

            if (prev <= 0) {
                return total - 1;
            }

            return prev - 1;

        });

    };


    /* =====================================================
       AUTOPLAY
    ===================================================== */

    useEffect(() => {

        if (total <= 1) return;

        const interval = setInterval(() => {

            siguiente();

        }, 5000);

        return () => clearInterval(interval);

    }, [total]);


    /* =====================================================
       SI NO HAY DATOS
    ===================================================== */

    if (!data || !data.categories || data.categories.length === 0) {
        return null;
    }


    return (

        <section className="champions-section">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="champions-header">

                <span>
                    {data.subtitulo}
                </span>

                <h2>
                    {data.titulo}
                </h2>

            </div>


            {/* =================================================
                CARRUSEL
            ================================================= */}

            <div className="champions-carousel">


                {/* =================================================
                    FLECHA ANTERIOR
                ================================================= */}

                {total > 1 && (

                    <button
                        className="champions-arrow champions-arrow-prev"
                        onClick={anterior}
                        aria-label="Categoría anterior"
                    >
                        ‹
                    </button>

                )}


                {/* =================================================
                    CONTENEDOR
                ================================================= */}

                <div className="champions-track">


                    {data.categories.map((item, index) => (

                        <div
                            key={item.id || index}
                            className={`champions-slide ${
                                index === current
                                    ? "champions-slide-active"
                                    : ""
                            }`}
                        >

                            <div className="champion-card">


                                {/* =================================================
                                    IMAGEN
                                ================================================= */}

                                <div className="champion-image">

                                    <img
                                        src={item.imagen}
                                        alt={item.categoria}
                                    />

                                </div>


                                {/* =================================================
                                    CONTENIDO
                                ================================================= */}

                                <div className="champion-content">


                                    <h3>
                                        {item.categoria}
                                    </h3>


                                    {/* PRIMER PUESTO */}

                                    <div className="champion-winner champion-gold">

                                        <span>
                                            🥇 Primer Puesto
                                        </span>

                                        <strong>
                                            {item.ganadores?.[0] || "Por confirmar"}
                                        </strong>

                                    </div>


                                    {/* SEGUNDO PUESTO */}

                                    <div className="champion-winner champion-silver">

                                        <span>
                                            🥈 Segundo Puesto
                                        </span>

                                        <strong>
                                            {item.ganadores?.[1] || "Por confirmar"}
                                        </strong>

                                    </div>


                                    {/* TERCER PUESTO */}

                                    <div className="champion-winner champion-bronze">

                                        <span>
                                            🥉 Tercer Puesto
                                        </span>

                                        <strong>
                                            {item.ganadores?.[2] || "Por confirmar"}
                                        </strong>

                                    </div>


                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {/* =================================================
                    FLECHA SIGUIENTE
                ================================================= */}

                {total > 1 && (

                    <button
                        className="champions-arrow champions-arrow-next"
                        onClick={siguiente}
                        aria-label="Siguiente categoría"
                    >
                        ›
                    </button>

                )}

            </div>


            {/* =================================================
                INDICADORES
            ================================================= */}

            {total > 1 && (

                <div className="champions-dots">

                    {data.categories.map((item, index) => (

                        <button
                            key={item.id || index}
                            className={
                                `champions-dot ${
                                    index === current
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={() => setCurrent(index)}
                            aria-label={`Ir a categoría ${index + 1}`}
                        />

                    ))}

                </div>

            )}

        </section>

    );

}