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
        targetDate="2026-09-27T09:00:00" 
        titulo="LSL-MTB INTERNATIONAL 2026 - SEGUNDA SERIE: EL SEÑOR DE LA JOYA" 
        descripcion="¡Pedalea al máximo! MTB en el Señor de La Joya – Arequipa, donde la resistencia y la velocidad se ponen a prueba."
       />
      <Events />
      <br/>
      <br/>
      <EventsPast />
      
      {/*<Sponsors />*/}

    </div>
  );

}
