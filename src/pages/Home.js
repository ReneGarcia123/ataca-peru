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
        targetDate="2026-09-06T09:00:00" 
        titulo="CORRE CON LOS BOMBEROS 5K 2026 - CUARTA EDICIÓN" 
        descripcion="Carrera de Fuego 5K 2026 - Cuarta Edición: Corre con los Bomberos, en esta carrera de apoyo a nuestros héroes de la vida real. ¡Únete a nosotros y corre por una causa noble!"
       />
      <Events />
      <br/>
      <br/>
      <EventsPast />
      
      {/*<Sponsors />*/}

    </div>
  );

}
