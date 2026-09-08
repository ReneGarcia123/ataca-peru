import "./Documentos.css";

export default function Documentos({ data }) {

    return (

        <section className="documentos-section">

            {/* ==========================================
                TÍTULO DE LA SECCIÓN
            ========================================== */}

            <div className="documentos-seccion">

                <h2>
                    {data.tituloSeccion}
                </h2>

            </div>


            {/* ==========================================
                TARJETAS
            ========================================== */}

            <div className="documentos-grid">

                {data.items.map((item, index) => (

                    <div
                        className="documentos-card"
                        key={index}
                    >

                        {/* IMAGEN */}

                        <img
                            src={item.imagen}
                            alt={item.titulo}
                            className="documentos-card-imagen"
                        />


                        {/* CONTENIDO */}

                        <div className="documentos-card-contenido">

                            <h3>
                                {item.titulo}
                            </h3>

                            <p>
                                {item.descripcion}
                            </p>


                            {/* BOTÓN */}

                            <button
                                className="documentos-card-btn"
                                onClick={() => {

                                    if (item.link) {

                                        window.open(
                                            item.link,
                                            "_blank",
                                            "noopener,noreferrer"
                                        );

                                    }

                                }}
                            >
                                {item.boton || "Ver documento"}
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

}