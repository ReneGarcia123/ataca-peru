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
import { IoBicycleSharp } from "react-icons/io5";
import { RiTimerFill } from "react-icons/ri";
import Iframe from '../components/IFRAME/Iframe';
import ResultadosAcordeon from '../components/RESULTS/Results';
import ButtonBases from '../components/ButtonBases/ButtonBases';
import Carrusel2 from '../components/CARROUSEL2/Carrousel2';
import Mapping from '../components/MAPPING/Mapping';
import Responsib from '../components/RESPONSIBILITIES/Responsib';
import Modal from '../components/MODAL/Modal';
import emailjs from '@emailjs/browser';

export default function CENTAURO_TACNA() {

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://atacaperu.com/wp-content/uploads/2026/06/podio1.avif",
      "https://atacaperu.com/wp-content/uploads/2026/06/podio2.avif",
      "https://atacaperu.com/wp-content/uploads/2026/06/podio3.avif",
      "https://atacaperu.com/wp-content/uploads/2026/06/podio4.avif",
      "https://atacaperu.com/wp-content/uploads/2026/06/podio5.avif",
      "https://atacaperu.com/wp-content/uploads/2026/06/podio6.avif",
      "https://atacaperu.com/wp-content/uploads/2026/06/podio7.avif",
      "https://atacaperu.com/wp-content/uploads/2026/06/podio8.avif",
      "https://atacaperu.com/wp-content/uploads/2026/06/podio9.avif",
      "https://atacaperu.com/wp-content/uploads/2026/06/podio10.avif",
      "https://atacaperu.com/wp-content/uploads/2026/06/podio11.avif",
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Tacna, Perú" },
      { icon: <IoBicycleSharp />, label: "Competencia", value: "MTB 45KM" },
      { icon: <RiTimerFill />, label: "Cronometrado", value: "Tiempo cronometrado electrónicamente" },
  ];

  /*Resultados*/
  const resultados = [

  {
    titulo:"DAMAS ELITE",
    url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRQ8L_dFM0uFDtTklmRXIJ6SMHGJQhBJvZKa_kS9MGKytEEjM1-xTQguAiylvHcNqRa6i4QmHXhBsH1/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
  },

  {
    titulo:"VARONES ELITE",
    url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRQ8L_dFM0uFDtTklmRXIJ6SMHGJQhBJvZKa_kS9MGKytEEjM1-xTQguAiylvHcNqRa6i4QmHXhBsH1/pubhtml?gid=1910714693&single=true"
  },

  {
    titulo:"VARONES MASTER A",
    url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRQ8L_dFM0uFDtTklmRXIJ6SMHGJQhBJvZKa_kS9MGKytEEjM1-xTQguAiylvHcNqRa6i4QmHXhBsH1/pubhtml?gid=1989813600&single=true"
  },

  {
    titulo:"VARONES MASTER B",
    url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRQ8L_dFM0uFDtTklmRXIJ6SMHGJQhBJvZKa_kS9MGKytEEjM1-xTQguAiylvHcNqRa6i4QmHXhBsH1/pubhtml?gid=1051828566&single=true"
  },

 {
    titulo:"VARONES MASTER C",
    url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRQ8L_dFM0uFDtTklmRXIJ6SMHGJQhBJvZKa_kS9MGKytEEjM1-xTQguAiylvHcNqRa6i4QmHXhBsH1/pubhtml?gid=328960076&single=true"
  },

  {
    titulo:"VARONES MASTER D",
    url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRQ8L_dFM0uFDtTklmRXIJ6SMHGJQhBJvZKa_kS9MGKytEEjM1-xTQguAiylvHcNqRa6i4QmHXhBsH1/pubhtml?gid=1059790079&single=true"
  },

  {
    titulo:"DAMAS TURISMO",
    url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRQ8L_dFM0uFDtTklmRXIJ6SMHGJQhBJvZKa_kS9MGKytEEjM1-xTQguAiylvHcNqRa6i4QmHXhBsH1/pubhtml?gid=1373439661&single=true"
  },

  {
    titulo:"VARONES TURISMO",
    url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRQ8L_dFM0uFDtTklmRXIJ6SMHGJQhBJvZKa_kS9MGKytEEjM1-xTQguAiylvHcNqRa6i4QmHXhBsH1/pubhtml?gid=4802656&single=true"
  },

];
  return (
     <>
      <HeroVideo
        descripcion="¡LA EMOCIÓN SOBRE RUEDAS COMENZÓ! 💪🔥 IV COMPETENCIA INTERNACIONAL “CENTAURO DEL DESIERTO” MTB 45K"
        video="https://atacaperu.com/wp-content/uploads/2026/06/CENTAURO.mp4"
        imagen="https://atacaperu.com/wp-content/uploads/2026/06/ATACA-BICIMAS.avif"   
        detalles={detalles_hero}
      />     
      <br />
      <br />
      <br />
      <Iframe
        titulo="Resultados Generales"
        url="https://atacaperu.com/wp-content/uploads/2026/06/RESULTADOS-CENTAURO-2026-rev-07.pdf"/>
      <br />
      <br />
      <br />
      <ResultadosAcordeon titulo="Resultados por Categoría" resultados={resultados} />
      <br/>
      <br/>
      <br/>
      <Carrusel2 images={images_carrousel2} titulo="Los primeros puestos" />
      <br/>
      </>

  );
 
}
