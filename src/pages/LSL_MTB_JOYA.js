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
import ResultadoModalCycling from '../components/RESULTADO_MODAL/ResultadoModalCycling.jsx';
import resultados from '../components/RESULTADO_MODAL/resultados.js';

export default function LSL_MTB_JOYA() {



  const items_responsib = [
  {
      img: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/LSL%20MTB%20JOYA%202026/11.jpg?updatedAt=1789666677896",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento.",
      link: "https://drive.google.com/file/d/1g9gYByNB1TJAdIg4Yqpk9s0DohzUCSOf/view?usp=drive_link",
      btnText: "Ver documento",
    },

    {
      img: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/LSL%20MTB%20JOYA%202026/22.jpg",
      title: "Dispositivo Sensor",
      desc: "Uso correcto y responsabilidad del equipo.",
      link: "https://drive.google.com/file/d/1kZoeR5b5JmLt1QXQ_x0Ifph7Yss4Z1xQ/view?usp=drive_link",
      btnText: "Ver documento",
    },

    {
      img: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/LSL%20MTB%20JOYA%202026/333.jpg",
      title: "Autorización de Menor",
      desc: "Permiso para participación de menores.",
      link: "https://drive.google.com/file/d/1kZoeR5b5JmLt1QXQ_x0Ifph7Yss4Z1xQ/view?usp=drive_link",
      btnText: "Ver documento",
    },
  ];

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/LSL%20MTB%20JOYA%202026/regalo1.jpg",
      "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/LSL%20MTB%20JOYA%202026/646365881_905078655821131_5670434078030326945_n.jpg",,
      "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/LSL%20MTB%20JOYA%202026/medalla.jpg",
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "La Joya, Arequipa, Perú" },
      { icon: <FaClock />, label: "Hora", value: "08:00 AM" },
      { icon: <FaMedal />, label: "Premios", value: "Reconocimientos a ganadores" },
  ];

  const categorias = [
      "Varones Pro Juveniles: de 15 a 17 años",
      "Varones Pro Elite: de 18 a 29 años",
      "Varones Pro Master A: de 30 a 39 años",
      "Varones Pro Master B: de 40 a 49 años",
      "Varones Pro Master C: de 50 años a más",
      "Damas Pro Elite: de 18 a 34 años",
      "Damas Pro Master: de 35 años a más",
      "Varones y Damas Turismo Open: de 18 a 34 años",
      "Varones y Damas Turismo Master: de 35 años a más",
      "Varones Turismo Súper Master: de 50 años a más",
  ];

  const detalles = [
    { label: "Fecha", value: "29 de marzo 2026" },
    { label: "Lugar", value: "Playa los Órganos, Piura, Perú" },
    { label: "Concentración", value: "07:30 AM" },
    { label: "Partida", value: "08:00 AM" }
  ];

  
  const items = [
    { icon: <FaMedal />, title: "Premios por Categoría", text: "Para los tres primeros puestos de cada categoria" },
    { icon: <MdTimer />, title: "Cronometrado", text: "Tiempo cronometrado elctrónicamente" },
    { icon: <GiTrophyCup />, title: "Premio Grupal", text: "En efectivo para los equipos con mayor puntaje acumulativo" },
  ];

  return (
     <>
      <EventHero data={eventHero.lsl_joya} />

      <br />
      <ResultadoModalCycling data={resultados.joya_ciclismo}/>


      <Categories
        titulo="¡El Señor de La Joya! La batalla definitiva de la LSL - MTB INTERNATIONAL"
        descripcion="¡Vive la emoción de la LSL MTB – EL SEÑOR DE LA JOYA 🚵‍♂️🌵🔥
                      Desafía la arena, las dunas y tu propia resistencia en el 
                      desierto de La Joya. Cada pedalada un paso hacia la gloria!🌵🏃‍♂️🔥"
        imagen="https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/LSL%20MTB%20JOYA%202026/2.jpg"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://drive.google.com/file/d/1Hwu7QtuINUaxwJTUo2Iq-Dwr68e9yOs9/view?usp=sharing"}/>
      <br />
      <br />
      <br />
      <Carrusel2 images={images_carrousel2} titulo="¿Qué incluye tu participación?" />
      
      <Mapping 
        titulo="Recorrido Turismo" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=266624613&elevation=off&images=on&maptype=H"
      />
      <Mapping 
        titulo="Recorrido Pro (2 vueltas)" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=266625142&elevation=off&images=on&maptype=H"
      />
      <Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />
    </>

  );
 
}
