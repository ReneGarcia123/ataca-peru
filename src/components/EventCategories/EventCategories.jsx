import React from "react";
import "./EventCategories.css";

export default function EventCategories({ data }) {
  if (!data) return null;

  return (
    <section className="event-categories-section">
      <div className="event-categories-container">

        {/* IMAGEN */}
        <div className="event-categories-left">
          {data.imagen && (
            <img
              src={data.imagen}
              alt={data.titulo || "Evento"}
            />
          )}
        </div>

        {/* CONTENIDO */}
        <div className="event-categories-right">

          {data.titulo && (
            <h2 className="event-categories-title">
              {data.titulo}
            </h2>
          )}

          {data.descripcion && (
            <p className="event-categories-description">
              {data.descripcion}
            </p>
          )}

          {/* CATEGORÍAS */}
          {data.categorias && data.categorias.length > 0 && (
            <div className="event-categories-card">

              <div className="event-categories-card-content">

                <div className="event-categories-line"></div>

                <div className="event-categories-info">

                  <h3 className="event-categories-card-title">
                    {data.titulo_categorias || "Categorías:"}
                  </h3>

                  <ul className="event-categories-list">
                    {data.categorias.map((categoria, index) => (
                      <li key={index}>
                        {categoria}
                      </li>
                    ))}
                  </ul>

                </div>

              </div>

            </div>
          )}

          {/* ITEMS */}
          {data.items && data.items.length > 0 && (
            <div className="event-categories-items">

              {data.items.map((item, index) => (
                <div
                  key={item.id || index}
                  className="event-category-item"
                >

                  {item.icon && (
                    <div className="event-category-icon">
                      {item.icon}
                    </div>
                  )}

                  {item.title && (
                    <h2 className="event-category-item-title">
                      {item.title}
                    </h2>
                  )}

                  {item.text && (
                    <p className="event-category-item-text">
                      {item.text}
                    </p>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}