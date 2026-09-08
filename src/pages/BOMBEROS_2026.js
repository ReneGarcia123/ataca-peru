import React, { useState } from 'react';
import EventBanner from '../components/EVENTBANNER/EventBanner';
import Countdown from "../components/COUNTDOWN/Countdown";
import HeroVideo from "../components/HEROVIDEO/HeroVideo";
import Categories from '../components/CATEGORIES/Categories';
import { PiCertificateBold } from "react-icons/pi";
import { FaRoadCircleCheck } from "react-icons/fa6";
import { FaMedal} from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ButtonBases from '../components/ButtonBases/ButtonBases';
import Mapping from '../components/MAPPING/Mapping';
import Responsib from '../components/RESPONSIBILITIES/Responsib';
import ResultadoModal from "../components/RESULTADO_MODAL/ResultadoModal.jsx";
import resultados from "../components/RESULTADO_MODAL/resultados.js";
import Documentos from "../components/DOCUMENTOS/Documentos.jsx";
import documentos from "../components/DOCUMENTOS/documentos.js";

export default function BOMBEROS_2026() {
  const items_responsib = [
    {
      img: "https://res.cloudinary.com/r0ldqpr5/image/upload/v1786921418/BOMB1.jpg",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento",
      link: "https://drive.google.com/file/d/123iykbx5GryX8Zz_9IdwBC6GJ30jMnDl/view?usp=sharing",
      btnText: "Ver documento",
    },

    {
      img: "https://res.cloudinary.com/r0ldqpr5/image/upload/v1786921422/bomb4.jpg",
      title: "Autorización de menores de edad",
      desc: "Permiso para que menores de edad participen en el evento.",
      link: "https://drive.google.com/file/d/1q6cJdmjXlTBrffyACoP9sNt30invQHMm/view?usp=sharing",
      btnText: "Ver documento",
    },

  ];

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://res.cloudinary.com/r0ldqpr5/image/upload/v1786923239/medalla_bombero.jpg",
      "https://res.cloudinary.com/r0ldqpr5/image/upload/v1786923238/polo_bombero.jpg",
  ]
    /*Carrusel 3 imagenes*/
  const images_carrousel3=[
      "https://res.cloudinary.com/pbpxn2ls/image/upload/v1787674515/WhatsApp_Image_2026-08-25_at_11.11.32_AM.jpg"
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Centro de Arequipa, Perú" },
      { icon: <FaClock />, label: "Hora", value: "06:30 AM" },
      { icon: <FaMedal />, label: "Premios", value: "Reconocimientos a ganadores" },
  ];

  const categorias = [
      "Varones y damas juveniles: de 15 a 17 años",
      "Varones y damas elite: de 18 a 34 años",
      "Varones y damas máster: de 35 a 49 años",
      "Varones y damas súper máster: de 50 años a más",
      "Bomberos damas y varones general (categoría exlusiva para bomberos acreditados)",
  ];

  const items = [
    { icon: <FaRoadCircleCheck/>, title: "Cierre de vías", text: "Para garantizar la seguridad de los participantes" },
    { icon: <FaMedal />, title: "Medalla Finisher", text: "Para todos los participantes que completan la carrera" },
    { icon: <MdTimer />, title: "Cronometrado", text: "Tiempo cronometrado elctrónicamente" },
    { icon: <PiCertificateBold  />, title: "Premios", text: "Regalos y premios para los primeros puestos de cada categoría" },
  ];

  return (
     <>
      <HeroVideo
        descripcion="¡Corre con los Bomberos! En esta carrera de apoyo a nuestros héroes de la Benemérita Compañía de Bomberos Arequipa - 19. ¡Únete a esta noble causa y demuestra tu solidaridad!"
        video="https://res.cloudinary.com/r0ldqpr5/video/upload/v1786922016/No-video-title-fdown.net_1.mp4"
        imagen="https://res.cloudinary.com/r0ldqpr5/image/upload/v1786921400/ATACA_BOMBEROS.png"   
        detalles={detalles_hero}
      />     

      <br />
      <ResultadoModal data={resultados.bomberos} />


      {/*<Countdown
        targetDate="2026-09-06T09:00:00"
        titulo="CUENTA REGRESIVA PARA: CORRE CON LOS BOMBEROS 5K"
        descripcion="Unir deporte y solidaridad en una experiencia que inspire a la comunidad a participar activamente por una buena causa"
      />*/}
      <Documentos data={documentos.bomberos} />


      <Categories
        titulo="Corre con los Bomberos 5K IV Edición"
        descripcion="Corre, apoya y vive una experiencia solidaria junto a la Cía. de Bomberos Arequipa 19 🧑‍🚒🔥"
        imagen="https://res.cloudinary.com/r0ldqpr5/image/upload/v1786921423/bomb8.jpg"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://drive.google.com/file/d/1LBoDrGh7xA_kHyw6cp5vI9MgFvdEjjm6/view?usp=sharing "}/>
      <br />
      <br />
      <Mapping
        titulo="Recorrido de la carrera"
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=272209649&elevation=off&images=on&maptype=H"
      />
      
      <Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />
    </>

  );
 
}
