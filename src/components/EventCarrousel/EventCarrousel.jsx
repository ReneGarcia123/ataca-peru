import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import "./EventCarrousel.css";

export default function EventCarrousel({ data }) {
  if (!data) return null;

  const {
    titulo,
    images = [],
    proximamente = false
  } = data;

  return (
    <section className="event-carrousel-section">

      <div className="event-carrousel-container">

        {/* TÍTULO */}
        {titulo && (
          <h2 className="event-carrousel-title">
            {titulo}
          </h2>
        )}

        {/* PRÓXIMAMENTE */}
        {proximamente ? (

          <div className="event-carrousel-coming-soon">
            <div className="event-carrousel-coming-content">
              <span className="event-carrousel-coming-label">
                PRÓXIMAMENTE
              </span>
            </div>
          </div>

        ) : (

          <Swiper
            modules={[
              Navigation,
              Pagination,
              Autoplay,
              EffectCoverflow
            ]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            loop={images.length > 3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 120,
              modifier: 1,
              slideShadows: true
            }}
            pagination={{
              clickable: true
            }}
            navigation
            breakpoints={{
              0: {
                slidesPerView: 1
              },
              640: {
                slidesPerView: 2
              },
              1024: {
                slidesPerView: 3
              }
            }}
            className="event-carrousel"
          >

            {images.map((img, index) => (

              <SwiperSlide key={index}>

                <div className="event-carrousel-slide-card">

                  <img
                    src={img}
                    alt={`${titulo || "Evento"} - imagen ${index + 1}`}
                  />

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        )}

      </div>

    </section>
  );
}