import React from 'react';
import EventBanner from '../components/EVENTBANNER/EventBanner';
import Countdown from "../components/COUNTDOWN/Countdown";
import Categories from '../components/CATEGORIES/Categories';
import { FaMedal} from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { MdTimer } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ButtonBases from '../components/ButtonBases/ButtonBases';
import Carrusel2 from '../components/CARROUSEL2/Carrousel2';
import Mapping from '../components/MAPPING/Mapping';
import Responsib from '../components/RESPONSIBILITIES/Responsib';

export default function Triatlon() {
    const items_inscripcion = [
      {
        img: "/images/AQP_TRAIL_SILLAR/1.jpg",
        title: "Inscripción Paquete Completo",
        desc: "Inscríbite en todas las series completas de AQP Trail Running 2026",
        link: "https://atacaperu.com/inscripcion_aqptrail_2026_paquete_completo/",
        btnText: "Inscribirme",
      },
      {
        img: "/images/AQP_TRAIL_SILLAR/2.jpg",  
        title: "Inscripción Primera Serie: La Ruta del Sillar 2026",
        desc: "Inscríbite en la modalidad de postas de la triatlón",
        link: "https://atacaperu.com/inscripcion_aqptrail_2026_primera_serie/",
        btnText: "Inscribirme",
      }


    ]

    const items_responsib = [
    {
      img: "/images/AQP_TRAIL_SILLAR/8.jpg",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento.",
      link: "https://atacaperu.com/wp-content/uploads/2025/02/DESLINDE-DE-RESPONSABILIDAD.pdf",
      btnText: "Ver documento",
    },

    {
      img: "/images/AQP_TRAIL_SILLAR/9.jpg",
      title: "Dispositivo Sensor",
      desc: "Uso correcto y responsabilidad del equipo.",
      link: "https://atacaperu.com/wp-content/uploads/2025/02/RESPONSABILIDAD-SENSOR.pdf",
      btnText: "Ver documento",
    },

    {
      img: "/images/AQP_TRAIL_SILLAR/10.jpg",
      title: "Autorización de Menor",
      desc: "Permiso para participación de menores.",
      link: "https://atacaperu.com/wp-content/uploads/2025/12/AUTORIZACION-MENOR-DE-EDAD-TRIATLON.pdf",
      btnText: "Ver documento",
    },
  ];


    const images_carrousel2=[
      "/images/AQP_TRAIL_SILLAR/4.jpg",
      "/images/AQP_TRAIL_SILLAR/5.jpg",
      "/images/AQP_TRAIL_SILLAR/6.jpg",
      "/images/AQP_TRAIL_SILLAR/7.jpg"
    ]

    const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Las Canteras del Sillar, Arequipa" },
      { icon: <FaClock />, label: "Hora", value: "08:00 AM" },
      { icon: <FaMedal />, label: "Premios", value: "Reconocimientos a ganadores" },
    ];



    const categorias = [
      "Damas 21K: Open",
      "Varones 21K: Elite y Máster",
      "Damas 10K: Elite, Máster y Súper Máster",
      "Varones 10K: Elite, Máster, Súper Máster y Ultra Máster",
      "Damas 5k: Open y Máster",
      "Varones 5k: Open y Máster" 
    ];

  const detalles = [
    { label: "Fecha", value: "29 de marzo 2026" },
    { label: "Lugar", value: "Tiabaya, Arequipa, Perú" },
    { label: "Concentración", value: "07:30 AM" },
    { label: "Partida", value: "08:00 AM" }
  ];

  
  const items = [
    { icon: <RiTeamFill />, title: "Acumulativo", text: "Puntaje grupal acumulativo" },
    { icon: <FaMedal />, title: "Premios", text: "Reconocimientos a los ganadores de cada categoría" },
    { icon: <MdTimer />, title: "Cronometrado", text: "Tiempo cronometrado elctrónicamente" },
    { icon: <GiTrophyCup />, title: "Grupos", text: "Premio en efectivo a los primeros tres equipos" },
  ];


  return (

     <>

      

      {/*}
      <EventBanner
        titulo="LSL-MTB 2026 PRIMERA SERIE: CHIGUATA EPIC"
        descripcion="Competencia pedestre organizada por AFABPERU."
        imagen="https://atacaperu.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-23-at-2.50.59-PM.avif"
        detalles={detalles}
      />
      */ }

      <br />

      <Countdown
        targetDate="2026-05-03T09:00:00"
        titulo="CUENTA REGRESIVA PARA LA RUTA DEL SILLAR 2026"
        descripcion="El sillar guarda historias, hoy tú escribes la tuya: ¡AQP Trail Running 2026, donde cada paso es un legado en la ruta del sillar!"
      />

      <Responsib titulo="INSCRIPCIONES" items={items_inscripcion} />

      <Categories
        titulo="Corre con el corazón, conquista con la mente"
        descripcion="En la Ruta del Sillar 2026 cada paso es un desafío y cada kilómetro una victoria. La montaña te reta, el sillar guarda tu huella y tu espíritu se eleva más allá de los límites. Corre con el corazón, conquista con la mente y demuestra que la verdadera meta está en la fuerza de seguir adelante."
        imagen="/images/AQP_TRAIL_SILLAR/3.jpg"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://atacaperu.com/wp-content/uploads/2025/12/BASES-AQP-TRAIL-2026.pdf"}/>
      <br />
      <br />
      <br />
      <Carrusel2 images={images_carrousel2} titulo="¿Qué incluye tu participación?" />
      <Mapping titulo="Ruta 5K" stravaEmbedUrl="https://www.strava.com/activities/17373365056"/>
      <Mapping titulo="Ruta 10K" stravaEmbedUrl="https://www.strava.com/activities/17373365056"/>
      <Mapping titulo="Ruta 21K" stravaEmbedUrl="https://www.strava.com/activities/17373365056"/>
      <Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />
    </>

  );
}
