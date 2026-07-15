import React, { useState } from 'react';
import EventBanner from '../components/EVENTBANNER/EventBanner';
import Countdown from "../components/COUNTDOWN/Countdown";
import HeroVideo from "../components/HEROVIDEO/HeroVideo";
import Categories from '../components/CATEGORIES/Categories';
import { PiCertificateBold } from "react-icons/pi";
import { FaRoadCircleCheck } from "react-icons/fa6";
import { FaMedal} from "react-icons/fa";
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
import Iframe from '../components/IFRAME/Iframe';
import ResultadosAcordeon from '../components/RESULTS/Results';

export default function ALDEAS_INFANTILES() {

  const items_responsib = [
    {
      img: "https://atacaperu.com/wp-content/uploads/2026/05/aldeas-4.avif",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento",
      link: "https://atacaperu.com/wp-content/uploads/2026/05/DESLINDE-ALDEAS-INFANTILES-2026.pdf",
      btnText: "Ver documento",
    },

    {
      img: "https://atacaperu.com/wp-content/uploads/2026/05/aldeas3.avif",
      title: "Autorización de menores de edad",
      desc: "Permiso para que menores de edad participen en el evento.",
      link: "https://atacaperu.com/wp-content/uploads/2026/05/ALDEAS-INFANTILES-AUTORIZACION-MENORES.pdf",
      btnText: "Ver documento",
    },

  ];

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://atacaperu.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-12-at-1.33.15-PM.avif",
      "https://atacaperu.com/wp-content/uploads/2026/07/POLOMEDALLA.avif",
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Cerro Colorado, Arequipa, Perú" },
      { icon: <FaClock />, label: "Hora", value: "07:00 AM" },
      { icon: <FaMedal />, label: "Premios", value: "Reconocimientos a ganadores" },
  ];

  const categorias = [
      "Varones y damas juveniles: de 15 a 17 años",
      "Varones y damas elite: de 18 a 34 años",
      "Varones y damas máster: de 35 a 49 años",
      "Varones y damas súper máster: de 50 años a más"
  ];

  const items = [
    { icon: <FaRoadCircleCheck/>, title: "Cierre de vías", text: "Para garantizar la seguridad de los participantes" },
    { icon: <FaMedal />, title: "Medalla Finisher", text: "Para todos los participantes que completan la carrera" },
    { icon: <MdTimer />, title: "Cronometrado", text: "Tiempo cronometrado elctrónicamente" },
    { icon: <PiCertificateBold  />, title: "Premios", text: "Regalos y premios para los primeros puestos de cada categoría" },
  ];

    /*Resultados*/
  const resultados = [

    {
      titulo:"DAMAS ELITE",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vQir8HiLCyZIaehCKxyqooa2Y9qXUuenWfb0p4NW6LsdakG-JjCMODjfWsmge3b97w6w73QrznVWMgH/pubhtml?gid=0&amp;single=true&amp;headers=false"
    },

    {
      titulo:"DAMAS JUVENILES",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vQir8HiLCyZIaehCKxyqooa2Y9qXUuenWfb0p4NW6LsdakG-JjCMODjfWsmge3b97w6w73QrznVWMgH/pubhtml?gid=1121592557&amp;single=true&amp;headers=false"
    },

    {
      titulo:"DAMAS MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vQir8HiLCyZIaehCKxyqooa2Y9qXUuenWfb0p4NW6LsdakG-JjCMODjfWsmge3b97w6w73QrznVWMgH/pubhtml?gid=276540020&amp;single=true&amp;headers=false"
    },

    {
      titulo:"DAMAS SÚPER MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vQir8HiLCyZIaehCKxyqooa2Y9qXUuenWfb0p4NW6LsdakG-JjCMODjfWsmge3b97w6w73QrznVWMgH/pubhtml?gid=2035083883&amp;single=true&amp;headers=false"
    },

  {
      titulo:"VARONES ELITE",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vQir8HiLCyZIaehCKxyqooa2Y9qXUuenWfb0p4NW6LsdakG-JjCMODjfWsmge3b97w6w73QrznVWMgH/pubhtml?gid=1391089894&amp;single=true&amp;headers=false"
    },

    {
      titulo:"VARONES JUVENILES",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vQir8HiLCyZIaehCKxyqooa2Y9qXUuenWfb0p4NW6LsdakG-JjCMODjfWsmge3b97w6w73QrznVWMgH/pubhtml?gid=1749158182&amp;single=true&amp;headers=false"
    },

    {
      titulo:"VARONES MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vQir8HiLCyZIaehCKxyqooa2Y9qXUuenWfb0p4NW6LsdakG-JjCMODjfWsmge3b97w6w73QrznVWMgH/pubhtml?gid=875725571&amp;single=true&amp;headers=false"
    },

    {
      titulo:"VARONES SÚPER MASTER",
      url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vQir8HiLCyZIaehCKxyqooa2Y9qXUuenWfb0p4NW6LsdakG-JjCMODjfWsmge3b97w6w73QrznVWMgH/pubhtml?gid=48968286&amp;single=true&amp;headers=false"
    },

  ];

  return (
     <>
      <HeroVideo
        descripcion="“Arequipa Corre por una Infancia Feliz” es más que una carrera: es una oportunidad para unir deporte, solidaridad y esperanza en favor de los niños, niñas y adolescentes de Aldeas Infantiles SOS"
        video="https://atacaperu.com/wp-content/uploads/2026/05/VIDEO-CORTADO-ALDEAS-2026.mp4"
        imagen="https://atacaperu.com/wp-content/uploads/2026/05/ATACA-ALDEAS.avif"   
        detalles={detalles_hero}
      />     

      <br />

      <Countdown
        targetDate="2026-07-12T09:00:00"
        titulo="CUENTA REGRESIVA PARA: CORRE POR UNA INFANCIA FELIZ 6K"
        descripcion="Unir deporte y solidaridad en una experiencia que inspire a la comunidad a participar activamente por una buena causa"
      />

      <br/>
      <Iframe
              titulo="Resultados Generales"
              url="https://atacaperu.com/wp-content/uploads/2026/07/ALDEAS-INFANTILES-RESULTADOS-2026.pdf"/>
      <br/>
      <ResultadosAcordeon titulo="Resultados por Categoría" resultados={resultados} />
      {/*<Responsib titulo="INSCRIPCIONES" items={items_inscripcion} onButtonClick={abrirModal}/>*/}

      <br/>
      <Categories
        titulo="Corre por una infancia llena de sonrisas"
        descripcion="Más que una carrera, una causa que une deporte, solidaridad y esperanza. Cada paso ayuda a construir una infancia más feliz para quienes más lo necesitan."
        imagen="https://atacaperu.com/wp-content/uploads/2026/05/aldeas2.avif"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://atacaperu.com/wp-content/uploads/2026/05/BASES-ALDEAS-INFANTILES-2026.pdf"}/>
      <br />
      <br />
      <Carrusel2 images={images_carrousel2} titulo="¿Qué incluye tu participación?" />
      <Mapping
        titulo="Recorrido de la carrera"
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=226823733&elevation=off&images=off&maptype=H"
      />
      
      <Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />
    </>

  );
 
}
