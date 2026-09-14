import { useState } from "react";
import "./ResultadoModal.css";

const SUPABASE_URL =
    "https://niixoqhntxqvqjubeuaj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_GsuSd44LRq1bwW7c1cqeyQ_KN4SFcaX";

export default function ResultadoModal({ data }) {

    const [isOpen, setIsOpen] = useState(false);
    const [dni, setDni] = useState("");
    const [resultado, setResultado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");


    /* =====================================================
       BUSCAR RESULTADO
    ===================================================== */

    const buscarResultado = async (dniBuscado) => {

        const documento = dniBuscado.trim().toUpperCase();

        /*
         * FORMATOS ACEPTADOS:
         *
         * DNI:
         * 12345678
         *
         * DNI CON CERO:
         * 01234567
         *
         * DOCUMENTO CON GUION:
         * 15740927-1
         *
         * CARNET DE EXTRANJERÍA:
         * E12345678
         *
         * OTROS DOCUMENTOS CON LETRA:
         * X12345678
         */

        const formatosValidos =
            /^\d{8}$/.test(documento) ||
            /^\d{8}-\d$/.test(documento) ||
            /^[A-Z]\d+$/.test(documento);


        if (!formatosValidos) return;


        try {

            setLoading(true);
            setMensaje("");
            setResultado(null);


            /* =================================================
               COLUMNAS DE SUPABASE
            ================================================= */

            const columnas = [
                "Puesto",
                "DNI",
                "Nombres Completos",
                "Equipo",
                "Dorsal",
                "Categoria",
                "Tiempo",
                "URL_DIPLOMA"
            ];


            const select = columnas.join(",");


            /* =================================================
               URL DE CONSULTA
            ================================================= */

            const url =
                `${SUPABASE_URL}/rest/v1/${data.tabla}` +
                `?DNI=eq.${encodeURIComponent(documento)}` +
                `&select=${encodeURIComponent(select)}`;


            /* =================================================
               CONSULTA
            ================================================= */

            const response = await fetch(url, {

                method: "GET",

                headers: {
                    apikey: SUPABASE_PUBLISHABLE_KEY
                }

            });


            if (!response.ok) {

                throw new Error(
                    "Error al consultar Supabase"
                );

            }


            const resultados = await response.json();


            /* =================================================
               RESULTADO
            ================================================= */

            if (resultados.length === 0) {

                setMensaje(
                    "No se encontró ningún resultado para ese documento."
                );

            } else {

                setResultado(resultados[0]);

            }


        } catch (error) {

            console.error(error);

            setMensaje(
                "Ocurrió un error al consultar los resultados."
            );


        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       CAMBIO DEL DOCUMENTO
    ===================================================== */

    const handleChange = (e) => {

        /*
         * Permitimos:
         * - números
         * - letras
         * - guion
         */

        let value = e.target.value
            .toUpperCase()
            .replace(/[^A-Z0-9-]/g, "");


        setDni(value);


        /*
         * Mientras escribe, limpiamos
         * el resultado anterior.
         */

        setResultado(null);
        setMensaje("");


        /* =================================================
           FORMATOS VÁLIDOS
        ================================================= */

        const esDNI =
            /^\d{8}$/.test(value);


        const esDocumentoConGuion =
            /^\d{8}-\d$/.test(value);


        const esCarnetExtranjeria =
            /^[A-Z]\d+$/.test(value);


        /* =================================================
           BUSCAR AUTOMÁTICAMENTE
        ================================================= */

        if (
            esDNI ||
            esDocumentoConGuion ||
            esCarnetExtranjeria
        ) {

            buscarResultado(value);

        }

    };


    /* =====================================================
       CERRAR MODAL
    ===================================================== */

    const cerrar = () => {

        setIsOpen(false);

        setDni("");

        setResultado(null);

        setMensaje("");

        setLoading(false);

    };


    /* =====================================================
       PREVIEW GOOGLE DRIVE
    ===================================================== */

    const obtenerPreview = (url) => {

        if (!url) return "";


        /*
         * Formato esperado:
         *
         * https://drive.google.com/file/d/ID/view
         */


        const match =
            url.match(/\/d\/([^/]+)/);


        if (!match) {

            return "";

        }


        const id = match[1];


        return `https://drive.google.com/file/d/${id}/preview`;

    };


    return (

        <>


            {/* =================================================
                TARJETA
            ================================================= */}

            <div className="resultado-wrapper">


                {/* =================================================
                    TÍTULO DE LA SECCIÓN
                ================================================= */}

                <div className="resultado-seccion">

                    <h2>
                        {data.titulo_seccion}
                    </h2>

                </div>


                {/* =================================================
                    TARJETA DEL EVENTO
                ================================================= */}

                <div className="resultado-card">

                    <img
                        src={data.imagen}
                        alt={data.titulo}
                        className="resultado-card-imagen"
                    />


                    <div className="resultado-card-contenido">

                        <h3>
                            {data.titulo}
                        </h3>


                        <p>
                            {data.descripcion}
                        </p>


                        <button
                            className="resultado-card-btn"
                            onClick={() => setIsOpen(true)}
                        >
                            Consultar resultados
                        </button>

                    </div>

                </div>

            </div>


            {/* =================================================
                MODAL
            ================================================= */}

            {isOpen && (

                <div className="resultado-overlay">

                    <div className="resultado-modal">


                        {/* =================================================
                            CERRAR
                        ================================================= */}

                        <button
                            className="resultado-close"
                            onClick={cerrar}
                        >
                            ×
                        </button>


                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <div className="resultado-header">

                            <h2>
                                Consulta de Resultados
                            </h2>


                            <p>
                                {data.titulo}
                            </p>

                        </div>


                        {/* =================================================
                            DOCUMENTO
                        ================================================= */}

                        <div className="resultado-buscador">

                            <label>
                                Ingrese su DNI, CE o documento
                            </label>


                            <input
                                type="text"
                                inputMode="text"
                                maxLength={14}
                                placeholder="Ejemplo: 12345678"
                                value={dni}
                                onChange={handleChange}
                            />

                        </div>


                        {/* =================================================
                            LOADING
                        ================================================= */}

                        {loading && (

                            <div className="resultado-loading">

                                <div className="resultado-spinner">
                                </div>


                                <p>
                                    Buscando información...
                                </p>

                            </div>

                        )}


                        {/* =================================================
                            MENSAJE
                        ================================================= */}

                        {mensaje && !loading && (

                            <div className="resultado-mensaje">

                                {mensaje}

                            </div>

                        )}


                        {/* =================================================
                            RESULTADO
                        ================================================= */}

                        {resultado && !loading && (

                            <div className="resultado-contenido">


                                {/* =================================================
                                    DATOS
                                ================================================= */}

                                <div className="resultado-datos">


                                    {/* NOMBRES */}

                                    <div className="resultado-campo">

                                        <label>
                                            Nombres Completos
                                        </label>


                                        <input
                                            value={
                                                resultado["Nombres Completos"] || ""
                                            }
                                            readOnly
                                        />

                                    </div>


                                    {/* PUESTO */}

                                    <div className="resultado-campo">

                                        <label>
                                            Puesto
                                        </label>


                                        <input
                                            value={
                                                resultado.Puesto || ""
                                            }
                                            readOnly
                                        />

                                    </div>


                                    {/* EQUIPO */}

                                    <div className="resultado-campo">

                                        <label>
                                            Equipo
                                        </label>


                                        <input
                                            value={
                                                resultado.Equipo || ""
                                            }
                                            readOnly
                                        />

                                    </div>


                                    {/* DORSAL */}

                                    <div className="resultado-campo">

                                        <label>
                                            Dorsal
                                        </label>


                                        <input
                                            value={
                                                resultado.Dorsal || ""
                                            }
                                            readOnly
                                        />

                                    </div>


                                    {/* CATEGORÍA */}

                                    <div className="resultado-campo">

                                        <label>
                                            Categoría
                                        </label>


                                        <input
                                            value={
                                                resultado.Categoria || ""
                                            }
                                            readOnly
                                        />

                                    </div>


                                    {/* TIEMPO */}

                                    <div className="resultado-campo">

                                        <label>
                                            Tiempo
                                        </label>


                                        <input
                                            value={
                                                resultado.Tiempo || ""
                                            }
                                            readOnly
                                        />

                                    </div>


                                </div>


                                {/* =================================================
                                    DIPLOMA
                                ================================================= */}

                                {resultado.URL_DIPLOMA && (

                                    <div className="resultado-diploma">


                                        <h3>
                                            Diploma
                                        </h3>


                                        <iframe
                                            className="resultado-pdf"
                                            src={
                                                obtenerPreview(
                                                    resultado.URL_DIPLOMA
                                                )
                                            }
                                            title="Diploma del participante"
                                        />


                                        <a
                                            href={
                                                resultado.URL_DIPLOMA
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resultado-btn"
                                        >
                                            VER / DESCARGAR DIPLOMA
                                        </a>


                                    </div>

                                )}

                            </div>

                        )}

                    </div>

                </div>

            )}

        </>

    );

}