import React, { useState } from 'react';
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
import Champions from "../components/Champions/Champions.jsx";
import championsData from "../components/Champions/champions.js";

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

  
  const items = [
    { icon: <FaMedal />, title: "Medalla Finisher", text: "Para todos los que culminen el recorrido (solo inscritos)" },
    { icon: <MdTimer />, title: "Cronometrado", text: "Tiempo cronometrado elctrónicamente" },
    { icon: <GiTrophyCup />, title: "Premios", text: "Para los primeros puestos de cada categoría (damas y varones)" },
  ];


  return (
     <>
  

      <br />
      <Resultados data={resultados.chiguata_trail} />
      <Documentos data={documentos.chiguata_trail} />
      <Champions data={championsData.chiguata} />
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
