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
        targetDate="2026-07-05T09:00:00" 
        titulo="AQP TRAIL RUNNING 2026 - SEGUNDA SERIE: EL DESIERTO DE LA JOYA" 
        descripcion="¡NADA ES IMPOSIBLE! Carrera de Trail en el desierto de La Joya - Arequipa"
       />
      <Events />
      <br/>
      <br/>
      <EventsPast />
      
      {/*<Sponsors />*/}

    </div>
  );

}
