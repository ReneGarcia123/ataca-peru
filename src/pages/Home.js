import React from "react";
import "./Home.css";
import Carrousel from "../components/CARROUSEL/Carrousel";
import Events from "../components/EVENTCARD/Events";
import EventsPast from "../components/EVENTPAST/EventsPast";
import Countdown from "../components/COUNTDOWN/Countdown";
import Sponsors from "../components/SPONSORS/Sponsors";
import CulqiButton from '../components/CulqiCheckoutButton/CulqiButton';

export default function Home() {
  return (
    <div>
      <Carrousel />
      <Countdown 
        targetDate="2026-06-28T09:00:00" 
        titulo="TRAIL DEL PESCADOR 10K" 
        descripcion="¡Más fuerte que el cansancio! Carrera de Trail en la playa de Los Órganos - Piura"
       />
      <Events />
      <br/>
      <br/>
      <EventsPast />
      
      {/*<Sponsors />*/}

    </div>
  );

}
