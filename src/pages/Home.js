import React from "react";
import "./Home.css";
import Carrousel from "../components/CARROUSEL/Carrousel";
import Events from "../components/EVENTCARD/Events";
import Countdown from "../components/COUNTDOWN/Countdown";
import Sponsors from "../components/SPONSORS/Sponsors";
import CulqiButton from '../components/CulqiCheckoutButton/CulqiButton';

export default function Home() {
  return (
    <div>
      <Carrousel />
      <Countdown 
        targetDate="2026-03-29T09:00:00" 
        titulo="ATACA PERU - CULQUI TEST" 
        descripcion="Chiguata Epic - 29 de marzo 2026"
       />
      <Events />
      <Sponsors />

      <CulqiButton 
        amount={600} // Monto en centavos (ejemplo: 600 = S/ 6.00)
        buttonText="Pagar"
        onResult={(result) => {
          if (result.success) {
            console.log("Pago exitoso:", result);
          }
        }}
      />

    </div>
  );

}
