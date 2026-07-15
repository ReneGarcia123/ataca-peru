import React, { useState } from 'react';
import EventBanner from '../components/EVENTBANNER/EventBanner';
import Countdown from "../components/COUNTDOWN/Countdown";
import HeroVideo from "../components/HEROVIDEO/HeroVideo";
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
import Iframe from '../components/IFRAME/Iframe';
import ResultadosAcordeon from '../components/RESULTS/Results';

export default function AQP_TRS_JOYA() {

  const items_responsib = [
  {
      img: "https://atacaperu.com/wp-content/uploads/2026/05/9.avif",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento.",
      link: "https://atacaperu.com/wp-content/uploads/2026/05/DESLINDE-LA-JOYA.pdf",
      btnText: "Ver documento",
    },

    {
      img: "https://atacaperu.com/wp-content/uploads/2026/05/7.avif",
      title: "Dispositivo Sensor",
      desc: "Uso correcto y responsabilidad del equipo.",
      link: "https://atacaperu.com/wp-content/uploads/2025/02/RESPONSABILIDAD-SENSOR.pdf",
      btnText: "Ver documento",
    },

    {
      img: "https://atacaperu.com/wp-content/uploads/2026/05/8.avif",
      title: "Autorización de Menor",
      desc: "Permiso para participación de menores.",
      link: "https://atacaperu.com/wp-content/uploads/2026/05/AUTORIZACION-JOYA.pdf",
      btnText: "Ver documento",
    },
  ];

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://atacaperu.com/wp-content/uploads/2026/05/4.avif",
      "https://atacaperu.com/wp-content/uploads/2026/05/5.avif",
      "https://atacaperu.com/wp-content/uploads/2026/05/6.avif",
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "La Joya, Arequipa, Perú" },
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

    /*Resultados*/
  const resultados = [

    {
      titulo:"10K DAMAS ELITE",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=1331866571&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"10K DAMAS MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=773982130&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"10K DAMAS SÚPER MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=1022118316&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"10K VARONES ELITE",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=2081694530&amp;single=true&amp;widget=true&amp;headers=false"
    },

  {
      titulo:"10K VARONES MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=1415800942&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"10K VARONES SÚPER MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=1232615161&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"10K VARONES ULTRA MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=1070987932&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"21K DAMAS OPEN",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=435226080&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"21K VARONES ELITE",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=753537237&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"21K VARONES MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=357450906&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"5K DAMAS MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=1470980989&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"5K DAMAS OPEN",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=620110768&amp;single=true&amp;widget=true&amp;headers=false"
    },

    
    {
      titulo:"5K VARONES MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=841073144&amp;single=true&amp;widget=true&amp;headers=false"
    },

    {
      titulo:"5K VARONES OPEN",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSis3MtC00Aa_p7fP9AOfrF-rlf2afa-o6msBKwRD_-FcmoPZS2epmeELuttMzDSS51B6_U8KwLmM0k/pubhtml?gid=1848087840&amp;single=true&amp;widget=true&amp;headers=false"
    },
  ]

  return (
     <>
      <HeroVideo
        descripcion="Prepárate para desafiar el calor, la arena y tus propios límites
                     en “El Desierto de La Joya”, cada kilómetro pondrá a prueba tu resistencia 
                     y determinación. Vive la adrenalina de una
                     experiencia única rumbo a la gloria de la AQP TRAIL 
                     RUNNING SERIES INTERNATIONAL 2026."
        video="https://atacaperu.com/wp-content/uploads/2026/05/El-desierto-de-la-Joya-trail.mp4"
        imagen="https://atacaperu.com/wp-content/uploads/2023/04/logo-blanco.png"   
        detalles={detalles_hero}
      />     

      <br />

      <Countdown
        targetDate="2026-07-05T09:00:00"
        titulo="CUENTA REGRESIVA PARA AQP TRAIL RUNNING SERIES: EL DESIERTO DE LA JOYA"
        descripcion="Prepárate para la aventura en el Desierto de La Joya. La cuenta regresiva ya empezó y el reto te espera: arena, sol y pura resistencia."
      />
      <br/>
      <Iframe
              titulo="Resultados Acumulativos"
              url="https://atacaperu.com/wp-content/uploads/2026/07/ACUMULATIVO-GENERAL.pdf"/>
      <br/>
      <Iframe
              titulo="Puntajes por Categoría"
              url="https://atacaperu.com/wp-content/uploads/2026/07/ACUMULATIVO-POR-CATEGORIA.pdf"/>

      <br/>
      <Iframe
              titulo="Resultados Grupales"
              url="https://atacaperu.com/wp-content/uploads/2026/07/PUNTAJES-GRUPALES.pdf"/>
      <br/>
      <ResultadosAcordeon titulo="Resultados por Categoría" resultados={resultados} />

      {/*}
      <Responsib titulo="INSCRIPCIONES" items={items_inscripcion} onButtonClick={abrirModal}/>
        */}

      <Categories
        titulo="Más allá de tus límites: El desierto de La Joya"
        descripcion="¡Vive la segunda serie de la AQP TRAIL RUNNING SERIES 
                     INTERNATIONAL 2026 y supera tus propios límites!🌵🏃‍♂️🔥"
        imagen="https://atacaperu.com/wp-content/uploads/2026/05/3-1.avif"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://atacaperu.com/wp-content/uploads/2025/12/BASES-AQP-TRAIL-2026.pdf"}/>
      <br />
      <br />
      <br />
      <Carrusel2 images={images_carrousel2} titulo="¿Qué incluye tu participación?" />
      <Mapping 
        titulo="Recorrido 5K" 
        proximamente={false}        
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=173036655&elevation=off&images=on&maptype=H"
      />
      <Mapping 
        titulo="Recorrido 10K" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=173036465&elevation=off&images=on&maptype=H"
      />
      <Mapping 
        titulo="Recorrido 21K" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=173036590&elevation=off&images=on&maptype=H"
      />
      <Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />
    </>

  );
 
}
