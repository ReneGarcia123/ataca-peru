import React, { useState } from 'react';
import EventBanner from '../components/EVENTBANNER/EventBanner';
import Countdown from "../components/COUNTDOWN/Countdown";
import Categories from '../components/CATEGORIES/Categories';
import { FaMedal, FaRegMoneyBillAlt} from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { MdTimer } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ButtonBases from '../components/ButtonBases/ButtonBases';
import Carrusel2 from '../components/CARROUSEL2/Carrousel2';
import Mapping from '../components/MAPPING/Mapping';
import Responsib from '../components/RESPONSIBILITIES/Responsib';
import Modal from '../components/MODAL/Modal';
import emailjs from '@emailjs/browser';
import CulqiButton from '../components/CulqiCheckoutButton/CulqiButton';
import EventHero from "../components/EventHero/EventHero.jsx";
import eventHero from "../components/EventHero/eventHero.js";
import Resultados from '../components/RESULTADO_MODAL/ResultadoModal.jsx';
import resultados from '../components/RESULTADO_MODAL/resultados.js';
import Documentos from "../components/DOCUMENTOS/Documentos.jsx";
import documentos from "../components/DOCUMENTOS/documentos.js";
import Champions from "../components/Champions/Champions.jsx";
import championsData from "../components/Champions/champions.js";

export default function AQP_TRS_CHILINA() {

  const items_responsib = [
  {
      img: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/AQP_TRS_CHILINA_2026/responsib.jpg",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento.",
      link: "https://drive.google.com/file/d/10AElH4K3n9S5_wxg7ibh0VNx-Gbq0rIq/view?usp=sharing",
      btnText: "Ver documento",
    },

    {
      img: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/AQP_TRS_CHILINA_2026/responsib2.jpg",
      title: "Dispositivo Sensor",
      desc: "Uso correcto y responsabilidad del equipo.",
      link: "https://drive.google.com/file/d/1VoNv-MmVsf5380CalnAtE-T2ks3eL6yF/view?usp=sharing",
      btnText: "Ver documento",
    },

    {
      img: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/AQP_TRS_CHILINA_2026/responsib4.jpg",
      title: "Autorización de Menor",
      desc: "Permiso para participación de menores.",
      link: "https://drive.google.com/file/d/1iiWfdCmdWxcgx1OoeSTVgaCPelp_f6O9/view?usp=sharing",
      btnText: "Ver documento",
    },
  ];

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://res.cloudinary.com/r0ldqpr5/image/upload/v1786980913/medalla_chiguata.jpg",
      "https://res.cloudinary.com/r0ldqpr5/image/upload/v1786923717/760ef8ef-ddc3-4114-b260-e2d2b5b8e4fa.jpg",
  ]


  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Chilina, Arequipa, Perú" },
      { icon: <FaClock />, label: "Hora", value: "08:00 AM" },
      { icon: <FaMedal />, label: "Premios", value: "Reconocimientos a ganadores" },
  ];

  const categorias = [
      "21K Damas: Open de 18 años a más",
      "21K Varones: Open de 18 años a 34 años",
      "21K Varones Máster: de 35 años a más",
      "10K Damas y Varones: Elite de 18 años a 34 años",
      "10K Damas y Varones: Máster de 35 años a 49 años",
      "10K Damas Súper Máster: de 50 años a más",
      "10K Varones Súper Máster: de 50 a 59 años",
      "10K Varones Ultra Máster: de 60 años a más",
      "5K Damas y Varones: Open de 15 años a 34 años",
      "5K Damas y Varones Súper Máster: de 35 años a más",
  ];

  
  const items = [
    { icon: <FaMedal />, title: "Medalla Finisher", text: "Para todos los que culminen el recorrido (solo inscritos)" },
    { icon: <MdTimer />, title: "Cronometrado", text: "Tiempo cronometrado elctrónicamente" },
    { icon: <GiTrophyCup />, title: "Premios", text: "Para los primeros puestos de cada categoría (damas y varones)" },
  ];


  return (
     <>
      <EventHero data={eventHero.aqp_trail_chilina} />

      <br />

      <Resultados data={resultados.chilina_trail} />
      <Documentos data={documentos.chilina_trail} />

      <Champions data={championsData.chilina} />
      <Categories
        titulo="Más allá de tus límites: El Valle de Chilina"
        descripcion="¡Vive la cuarta serie: FINAL AQP TRAIL RUNNING SERIES INTERNATIONAL 2026 y supera tus propios límites!🌄🏃‍♂️🔥"
        imagen="https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/AQP_TRS_CHILINA_2026/CATEGORIES.jpg"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://drive.google.com/file/d/1RpGuz0Xckrxl2FnK7FAJacrAVcjNHO3G/view?usp=sharing"}/>
      <br />
      <br />
      <br />
      {/*<Carrusel2 images={images_carrousel2} titulo="¿Qué incluye tu participación?" />*/}
      <Mapping 
        titulo="Recorrido 5K" 
        proximamente={false}        
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=282312179&elevation=off&images=on&maptype=H"
      />
      <Mapping 
        titulo="Recorrido 10K" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=282312182&elevation=off&images=on&maptype=H"
      />
      <Mapping 
        titulo="Recorrido 21K" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=282312128&elevation=off&images=on&maptype=H"
      />
      <Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />
    </>

  );
 
}
