import { useState } from "react";
import "./Results.css";


export default function ResultadosAcordeon({ titulo,resultados }) {

  const [abierto, setAbierto] = useState(null);

  return (
    <div className="resultados-container">

      <h2 className="iframe-title">
        {titulo}
      </h2>

      {resultados.map((item, index) => (

        <div
          key={index}
          className="resultado-item"
        >

          <button
            className="resultado-header"
            onClick={() =>
              setAbierto(
                abierto === index
                  ? null
                  : index
              )
            }
          >
            {abierto === index ? "▼" : "▶"} {item.titulo}
          </button>

          {abierto === index && (
            <div className="resultado-body">

              <iframe
                src={item.url}
                title={item.titulo}
                width="100%"
                height="600"
                frameBorder="0"
              />

            </div>
          )}

        </div>

      ))}

    </div>
  );
}