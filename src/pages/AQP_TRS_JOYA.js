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

export default function AQP_TRS_JOYA() {

  const handleFinalResult = async(result) => {
  if (result.success) {
    /*EVITAR QUE PAGUE SIN INTERNET*/
    if (!navigator.onLine) {
      alert("No tienes conexión a internet. Por favor, inténtalo de nuevo cuando tengas conexión");
      return;
    }
    setEnviando(true);
    try {

      console.log("Pago exitoso:", result);

      console.log("ANTES GOOGLE");

      await guardarInscripcionGoogle();

      console.log("DESPUES GOOGLE");

      console.log("ANTES EMAIL");

      await enviarCorreo();

      console.log("DESPUES EMAIL");

    } catch (error) {

      console.log("ERROR REAL:", error);

      alert(
        "ERROR REAL: " +
        error.message
      );
    } finally {
      setEnviando(false);
    }
  } else {
    console.log("Error en el pago");
    alert(
      "El pago no se pudo procesar" +
      (result.error ? ": " + result.error : "")
    );
  }
};

/*Evitar doble clic*/
const [loadingStep, setLoadingStep] = useState(false);



  /*Estado para controlar el grupo seleccionado en el formulario de inscripción */
  const [grupo, setGrupo] = useState("ALPHA");

  /*Estado pasos del formulario de inscripción */
  const [step, setStep] = useState(1);

  /*Datos del formulario de inscripción */
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [talla, setTalla] = useState("M");
  const [otroEquipo, setOtroEquipo] = useState("");
  const [fotoBienvenida, setFotoBienvenida] = useState(null);
  const [capturaPago, setCapturaPago] = useState(null);

  /*RESETEAR FORMULARIO*/
const resetFormulario = () => {
  setGrupo("ALPHA");
  setStep(1);

  setNombre("");
  setApellidos("");
  setDni("");
  setCorreo("");
  setTelefono("");
  setGenero("");
  setFechaNacimiento("");
  setTalla("M");
  setOtroEquipo("");
  setFotoBienvenida(null);

  setBasesGenerales(false);
  setDeslindeResponsabilidad(false);
  setResponsabilidadSensor(false);
  setDatosCorrectos(false);

  setSelectedItem(null);

  setCodigoDescuento("");
  setDescuento(0);
  setCodigoAplicado(false);
  setCapturaPago(null);
};



  /*Estados para controlar los checkbox de términos y condiciones */
  const [bases_generales, setBasesGenerales] = useState(false);
  const [deslinde_responsabilidad, setDeslindeResponsabilidad] = useState(false);
  const [responsabilidad_sensor, setResponsabilidadSensor] = useState(false);
  const[datos_correctos, setDatosCorrectos] = useState(false);

  /* Estado para controlar el modal y el ítem seleccionado */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  /*Modalidad de inscripción*/
  const [modalidad, setModalidad] = useState("");

  /*DESCUENTOS*/
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [codigoAplicado, setCodigoAplicado] = useState(false);


  /*CODIGOS VÁLIDOS*/
  const codigosValidos = {
    "RENE549501":{
      descuento: 10,
      links:{
        "5K VENTA FINAL":
          "https://express.culqi.com/pago/LINK5K",
        "10K VENTA FINAL":
          "https://express.culqi.com/pago/LINK10K",
        "21K VENTA FINAL":
          "https://express.culqi.com/pago/FBC06A0062"
      }
    },
  };

  /*ENVIAR CAPTURA DE PAGO*/
  const datosPago = {
  "5K VENTA FINAL": {
    precio: 100,
    link: "https://express.culqi.com/pago/E800201641"
  },
  "10K VENTA FINAL": {
    precio: 120,
    link: "https://express.culqi.com/pago/0EC8E6F569"
  },
  "21K VENTA FINAL": {
    precio: 140,
    link: "https://express.culqi.com/pago/5CBA394641"
  }
};

const pagoInfo = datosPago[modalidad];



const codigoActual =
  codigosValidos[
    codigoDescuento.trim().toUpperCase()
  ];

const linkFinal =
  codigoAplicado &&
  codigoActual?.links?.[modalidad]
    ? codigoActual.links[modalidad]
    : pagoInfo?.link;

  /*Funcion descontar*/
  const aplicarCodigo = () => {

    const codigo = codigoDescuento.trim().toUpperCase();

    if (codigosValidos[codigo]) {

      setDescuento(
        codigosValidos[codigo].descuento
      );

      setCodigoAplicado(true);

      alert("Código aplicado correctamente");

    } else {

      setDescuento(0);

      setCodigoAplicado(false);

      alert("Código inválido");
    }
  };



  /*Configuración de precios por modalidad*/
  const configuracionPago={
    "5K VENTA FINAL":{
      title:"EL DESIERTO DE LA JOYA 5K - VENTA FINAL",
      amount:10000
    },
    "10K VENTA FINAL":{
      title:"EL DESIERTO DE LA JOYA 10K - VENTA FINAL",
      amount:12000
    },
    "21K VENTA FINAL":{
      title:"EL DESIERTO DE LA JOYA 21K - VENTA FINAL",
      amount:14000
    }
  };

  /*Obtener pago actual*/
    const pagoActual = configuracionPago[modalidad];

  /*Calcular monto final*/
  const montoFinal =
    Math.max(
      (pagoActual?.amount || 0) - descuento * 100,
      0
    );

  /*Función para enviar correo con los datos del formulario usando EmailJS */
 const enviarCorreo = async () => {
  const templateParams = {
    nombre,
    apellidos,
    dni,
    correo,
    telefono,
    genero,
    fechaNacimiento,
    modalidad,
    grupo:
      grupo === "otro"
      ? otroEquipo
      : grupo,

    talla,
  };
  try {
    await emailjs.send(
      "service_2govrnu",
      "template_lurswng",
      templateParams,
      "PN9-V6us45efj9uL6"
    );
    alert(nombre+" ,tu inscripción se ha completado exitosamente. ¡El desierto de la Joya te espera!\nSe enviará un correo de confirmación a "+correo+" con los detalles de tu inscripción.\nEn el mismo correo está el link para que te puedas unir al grupo de WhatsApp de la carrera. ¡Nos vemos en la carrera!");
    setModalOpen(false);
    resetFormulario();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

  /*Guardar inscripción en google sheet, además de subir foto*/
  const guardarInscripcionGoogle = async () => {

  try {
    //Convertir foto a base64
    let fotoBase64 = "";
    let fotoMimeType = "";
    if (fotoBienvenida) {
      fotoMimeType = fotoBienvenida.type;
      fotoBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fotoBienvenida);
        reader.onload = () => {
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = error => reject(error);
      });
    }
      //Convertir captura de pago a base64
    let capturaPagoBase64 = "";
    let capturaPagoMimeType = "";

    if (capturaPago) {

      capturaPagoMimeType = capturaPago.type;

      capturaPagoBase64 = await new Promise(
        (resolve, reject) => {

          const reader = new FileReader();

          reader.readAsDataURL(capturaPago);

          reader.onload = () => {
            resolve(
              reader.result.split(",")[1]
            );
          };

          reader.onerror = reject;
        }
      );
    }

    const payload = {
      nombre,
      apellidos,
      dni,
      correo,
      telefono,
      genero,
      fechaNacimiento,
      grupo:
        grupo === "otro"
          ? otroEquipo
          : grupo,

      talla,
      modalidad,
       // PRECIOS
      precioBase: (pagoActual?.amount || 0) / 100,
      descuentoAplicado: codigoAplicado,
      codigoDescuento: codigoAplicado
        ? codigoDescuento.trim().toUpperCase()
        : "",
      montoDescuento: descuento,
      montoFinal: montoFinal / 100,

      fotoBase64,
      fotoMimeType,

      capturaPagoBase64,
      capturaPagoMimeType
    };

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwc2658hwAmuDBjDXzDqDxsgWMpGulxZBNOsQONLlalEgov0J74SSZ7H0IYS2Ze86j0/exec",
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    );

    // 👇 AQUÍ VA
    const text = await response.text();

    console.log("RESPUESTA CRUDA:", text);

    const result = JSON.parse(text);

    console.log("Google Sheets:", result);

    if (!result.success) {
      throw new Error(result.error || "Error al guardar en Google Sheets");
    }

  } catch (error) {

    console.log("Error Google Sheets:", error);

    throw error;
  }
};

  /*Estado de carga de envío de correo*/
  const [enviando, setEnviando] = useState(false);

  /*Items de tipo de inscripción*/
  const items_inscripcion = [
    
    {
        img: "https://atacaperu.com/wp-content/uploads/2026/05/1-1.avif",
        title: "INSCRIPCIÓN 5K",
        desc: "5K: Corre entre dunas y descubre la magia del desierto en cada kilómetro",
        btnText: "Inscribirme",
        modalidad: "5K VENTA FINAL",
    },

    {
        img: "https://atacaperu.com/wp-content/uploads/2026/05/22.avif",
        title: "INSCRIPCIÓN 10K",
        desc: "10K: Desafía tu resistencia con 10K de arena, sol y pura adrenalina",
        btnText: "Inscribirme",
        modalidad: "10K VENTA FINAL",
    },

    {
        img: "https://atacaperu.com/wp-content/uploads/2026/05/2-1.avif",
        title: "INSCRIPCIÓN 21K",
        desc: "21K: Conquista el desierto en 21K y demuestra que tu espíritu no tiene límites",
        btnText: "Inscribirme",
        modalidad: "21K VENTA FINAL",
    },
    
    

  ]

  /*Función para abrir el modal con el ítem seleccionado */
  const abrirModal = (item) => {
      setSelectedItem(item);
      setModalidad(item.modalidad);//agregar modalidad distancia
      setStep(1); // Reiniciar al paso 1 cada vez que se abre el modal
      setModalOpen(true);
  };

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

  /*Solo activar para ver por consola, prueba*/
  console.log({
    nombre,
    apellidos,
    dni,
    correo,
    telefono,
    genero,
    fechaNacimiento,
    grupo,
    otroEquipo,
    talla,
    modalidad,
    fotoBienvenida
  });

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
