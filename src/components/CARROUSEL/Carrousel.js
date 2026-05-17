import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Carrousel.css';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'; // 👈 aquí agregamos Navigation

export const Carrousel = () => {
  const images = [
    'https://atacaperu.com/wp-content/uploads/2026/05/IMG_5386.avif',
    'https://atacaperu.com/wp-content/uploads/2026/05/El-desierto.avif',
    'https://atacaperu.com/wp-content/uploads/2026/05/bomberos.avif',
    '/images/SLIDERS/3.png'
  ];

  return (
    <div className="carrousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        effect='fade'              // 👈 siempre una sola imagen
        navigation                     // 👈 flechas visibles
        pagination={{ clickable: true }} // 👈 puntos de paginación
        autoplay={{ delay: 3000 }}
        loop={true}
        className="carrousel-swiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className="carrousel-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carrousel;
