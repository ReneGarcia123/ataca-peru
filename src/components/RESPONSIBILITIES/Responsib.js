import React from "react";
import "./Responsib.css";

const Responsib = ({titulo, items, onButtonClick }) => {
  return (
    <section className="programs-section">
      {/* Título cambiado */}
      <h2 className="programs-title">{titulo}</h2>

      <div className="programs-grid">
        {items.map((item, i) => (
          <div className="program-card" key={i}>
            <div
              className="program-image"
              style={{ backgroundImage: `url(${item.img})` }}
            />

            <div className="program-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            
              <button
                className="program-btn"
                onClick={() => {
                  if (onButtonClick) {
                    onButtonClick(item);
                  } else if (item.link) {
                    window.open(item.link, "_blank");
                  }
                }}
              >
                {item.btnText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Responsib;