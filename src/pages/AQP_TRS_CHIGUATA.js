import React, { useState } from 'react';
import HeroVideo from "../components/HEROVIDEO/HeroVideo";
import Categories from '../components/CATEGORIES/Categories';
import { FaMedal, FaRegMoneyBillAlt} from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ButtonBases from '../components/ButtonBases/ButtonBases';
import Carrusel2 from '../components/CARROUSEL2/Carrousel2';
import Mapping from '../components/MAPPING/Mapping';
import Resultados from '../components/RESULTADO_MODAL/ResultadoModal.jsx';
import resultados from '../components/RESULTADO_MODAL/resultados.js';
import Documentos from "../components/DOCUMENTOS/Documentos.jsx";
import documentos from "../components/DOCUMENTOS/documentos.js";

export default function AQP_TRS_CHIGUATA() {

  const items_responsib = [
  {
      img: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/res1.jpg",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento.",
      link: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/res1.jpg",
      btnText: "Ver documento",
    },

    {
      img: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/hero.jpg",
      title: "Dispositivo Sensor",
      desc: "Uso correcto y responsabilidad del equipo.",
      link: "",
      btnText: "Ver documento",
    },

    {
      img: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/res3.jpg",
      title: "Autorización de Menor",
      desc: "Permiso para participación de menores.",
      link: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/res3.jpg",
      btnText: "Ver documento",
    },
  ];

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/760ef8ef-ddc3-4114-b260-e2d2b5b8e4fa.jpg",
      "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/medalla_chiguata.jpg",
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Chiguata, Arequipa, Perú" },
      { icon: <FaClock />, label: "Hora", value: "08:00 AM" },
      { icon: <FaMedal />, label: "Premios", value: "Reconocimientos a ganadores" },
  ];

  const categorias = [
      "21K Damas: Open de 18 años a más",
      "21K Varones: Open de 18 años a 34 años",
      "21K Varones Máster: de 35 años a más",
      "10K Damas y Varones: Elite de 18 años 34 años",
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
      <HeroVideo
        descripcion="Prepárate para desafiar la altura, los senderos ancestrales y tus propios límites en “Los Andenes de Chiguata”. Cada kilómetro pondrá a prueba tu resistencia y determinación. Vive la adrenalina de una experiencia única rumbo a la gloria de la AQP TRAIL RUNNING SERIES INTERNATIONAL 2026."
        video="https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/Los%20andenes%20de%20Chiguata%20trail.mp4"
        imagen="https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/logo-largo-blanco.png"   
        detalles={detalles_hero}
      />     

      <br />
      <Resultados data={resultados.chiguata_trail} />
      <Documentos data={documentos.chiguata_trail} />
 

      <Categories
        titulo="Más allá de tus límites: Los Andenes de Chiguata"
        descripcion="¡Vive la segunda serie de la AQP TRAIL RUNNING SERIES INTERNATIONAL 2026 y supera tus propios límites!🌄🏃‍♂️🔥"
        imagen="https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/res2.jpg"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://drive.google.com/file/d/1RpGuz0Xckrxl2FnK7FAJacrAVcjNHO3G/view?usp=sharing"}/>
      <br />
      <br />
      <br />
      <Carrusel2 images={images_carrousel2} titulo="¿Qué incluye tu participación?" />
      <Mapping 
        titulo="Recorrido 5K" 
        proximamente={false}        
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=271247528&elevation=off&images=on&maptype=H"
      />
      <Mapping 
        titulo="Recorrido 10K" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=271247372&elevation=off&images=on&maptype=H"
      />
      <Mapping 
        titulo="Recorrido 21K" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=271248513&elevation=off&images=on&maptype=H"
      />
      {/*<Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />*/}
    </>

  );
 
}
