import React from 'react';
import EventHero from "../components/EventHero/EventHero.jsx";
import eventHero from "../components/EventHero/eventHero.js";
import EventCategories from "../components/EventCategories/EventCategories.jsx";
import eventCategories from "../components/EventCategories/eventCategories.js";
import EventMapping from "../components/EventMapping/EventMapping.jsx";
import eventMapping from "../components/EventMapping/eventMapping.js";
import Documentos from "../components/DOCUMENTOS/Documentos.jsx";
import documentos from "../components/DOCUMENTOS/documentos.js";
import EventCarrousel from "../components/EventCarrousel/EventCarrousel.jsx";
import eventCarrousel from "../components/EventCarrousel/eventCarrousel.js";  
import EventSponsor from "../components/EventSponsors/EventSponsor.jsx"
import eventSponsor from "../components/EventSponsors/eventSponsor.js"
import EventRegisterButton from "../components/EventRegisterButton/EventRegisterButton.jsx";
import eventRegisterButton from "../components/EventRegisterButton/eventRegisterButton.js";

const CORRO_NINOS_2026 = () => {

  
  return (
    <>
      <EventHero data={eventHero.corro_ninos_2026} />
      <br/>
      <br/>
      <EventRegisterButton
        data={eventRegisterButton.corro_ninos_2026}
      />
      <br/>
      <br/>
      <EventRegisterButton
        data={eventRegisterButton.corro_ninos_2026_mascotas}
      />

      <EventCategories data={eventCategories.corro_ninos}/>
      <Documentos data={documentos.corro_ninos_2026_bases} />
      <EventCarrousel data={eventCarrousel.corro_ninos_2026} />
      <EventMapping data={eventMapping.corro_ninos_2026} />
      <EventMapping data={eventMapping.corro_ninos_mascotas_2026} />
      <Documentos data={documentos.corro_ninos_2026} />
      <EventSponsor data={eventSponsor.corro_ninos_2026} />
    </>
  )
}

export default CORRO_NINOS_2026;