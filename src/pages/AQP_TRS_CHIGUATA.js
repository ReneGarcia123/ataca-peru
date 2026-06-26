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

export default function AQP_TRS_CHIGUATA() {

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
        "5K PRIMERA PRE VENTA":
          "https://express.culqi.com/pago/LINK5K",
        "10K PRIMERA PRE VENTA":
          "https://express.culqi.com/pago/LINK10K",
        "21K PRIMERA PRE VENTA":
          "https://express.culqi.com/pago/FBC06A0062"
      }
    },

  };

  /*ENVIAR CAPTURA DE PAGO*/
  const datosPago = {
  "5K PRIMERA PRE VENTA": {
    precio: 80,
    link: "https://express.culqi.com/pago/354837F496"
  },
  "10K PRIMERA PRE VENTA": {
    precio: 100,
    link: "https://express.culqi.com/pago/39B44D794C"
  },
  "21K PRIMERA PRE VENTA": {
    precio: 120,
    link: "https://express.culqi.com/pago/8F839BC191"
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
    "5K PRIMERA PRE VENTA":{
      title:"EL DESIERTO DE LA JOYA 5K - PRIMERA PRE VENTA",
      amount:8000
    },
    "10K PRIMERA PRE VENTA":{
      title:"EL DESIERTO DE LA JOYA 10K - PRIMERA PRE VENTA",
      amount:10000
    },
    "21K PRIMERA PRE VENTA":{
      title:"EL DESIERTO DE LA JOYA 21K - PRIMERA PRE VENTA",
      amount:12000
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
      "https://script.google.com/macros/s/AKfycbxLVVOiM611SGxCDBHiLC5HoFUvUNpd8VVigzrPLU7itOq8pnlhc7sS6TZD9DrvwKPvyA/exec",
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
        img: "https://atacaperu.com/wp-content/uploads/2026/06/C10.avif",
        title: "INSCRIPCIÓN 5K",
        desc: "5K: Corre entre dunas y descubre la magia del desierto en cada kilómetro",
        btnText: "Inscribirme",
        modalidad: "5K PRIMERA PRE VENTA",
    },

    {
        img: "https://atacaperu.com/wp-content/uploads/2026/06/C5.avif",
        title: "INSCRIPCIÓN 10K",
        desc: "10K: Desafía tu resistencia con 10K de arena, sol y pura adrenalina",
        btnText: "Inscribirme",
        modalidad: "10K PRIMERA PRE VENTA",
    },

    {
        img: "https://atacaperu.com/wp-content/uploads/2026/06/C21.avif",
        title: "INSCRIPCIÓN 21K",
        desc: "21K: Conquista el desierto en 21K y demuestra que tu espíritu no tiene límites",
        btnText: "Inscribirme",
        modalidad: "21K PRIMERA PRE VENTA",
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
      img: "https://atacaperu.com/wp-content/uploads/2026/06/cb.avif",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento.",
      link: "https://atacaperu.com/wp-content/uploads/2026/05/DESLINDE-LA-JOYA.pdf",
      btnText: "Ver documento",
    },

    {
      img: "https://atacaperu.com/wp-content/uploads/2026/06/csens.avif",
      title: "Dispositivo Sensor",
      desc: "Uso correcto y responsabilidad del equipo.",
      link: "https://atacaperu.com/wp-content/uploads/2025/02/RESPONSABILIDAD-SENSOR.pdf",
      btnText: "Ver documento",
    },

    {
      img: "https://atacaperu.com/wp-content/uploads/2026/06/cm.avif",
      title: "Autorización de Menor",
      desc: "Permiso para participación de menores.",
      link: "https://atacaperu.com/wp-content/uploads/2026/05/AUTORIZACION-JOYA.pdf",
      btnText: "Ver documento",
    },
  ];

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://atacaperu.com/wp-content/uploads/2026/06/c1aa0d79-fb20-4adc-a1fa-c908f0892fb5.avif",
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Chiguata, Arequipa, Perú" },
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
        descripcion="Prepárate para desafiar la altura, los senderos ancestrales y tus propios límites en “Los Andenes de Chiguata”. Cada kilómetro pondrá a prueba tu resistencia y determinación. Vive la adrenalina de una experiencia única rumbo a la gloria de la AQP TRAIL RUNNING SERIES INTERNATIONAL 2026."
        video="https://atacaperu.com/wp-content/uploads/2026/06/Los-andenes-de-Chiguata-trail.mp4"
        imagen="https://atacaperu.com/wp-content/uploads/2023/04/logo-blanco.png"   
        detalles={detalles_hero}
      />     

      <br />

      <Countdown
        targetDate="2026-09-13T09:00:00"
        titulo="CUENTA REGRESIVA PARA AQP TRAIL RUNNING SERIES: LOS ANDENES DE CHIGUATA"
        descripcion="Prepárate para la aventura en los majestuosos andenes de Chiguata. La cuenta regresiva ya empezó y el reto te espera: altura, tradición y pura resistencia."
      />

      <Responsib titulo="INSCRIPCIONES" items={items_inscripcion} onButtonClick={abrirModal}/>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          resetFormulario();

        }}
      >
        {
          enviando && (
            <div className="loading-overlay">

              <div className="loading-box">
                <div className="spinner"></div>
                <p>
                  Enviando inscripción...
                </p>
              </div>
            </div>
          )
        }

        <div className="modal-line"></div>
        <h1>
          {
            step === 1
              ? "FORMULARIO DE INSCRIPCIÓN"
              : step === 2
              ? "TÉRMINOS Y CONDICIONES"
              : step === 3
              ? "INFORMACIÓN DE PAGO"
              : "RESUMEN DE INSCRIPCIÓN"
          }
        </h1>
        { step === 1 && (
          <form className="inscripcion-form"
            onSubmit={(e) => {
            e.preventDefault();

            /*Evitar doble clic*/  
            if(loadingStep)return;
            setLoadingStep(true);
            
            /*Verifica que si pone grupo "OTRO", realmente ponga el grupo */
            if (grupo === "otro" && !otroEquipo.trim()) {
              alert("Por favor, escribe el nombre del equipo al que perteneces");              
              setLoadingStep(false);
              return;
            }

            setStep(2);

            setTimeout(() => {
              setLoadingStep(false);
            }, 500);
          }}>

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />

            {/* Género */}
            <div className="radio-group">
              <span className="form-label">
                Género:
              </span>
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="masculino"
                  checked={genero === "masculino"}
                  onChange={(e) => setGenero(e.target.value)}
                  required
                />
                Masculino
              </label>
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="femenino"
                  checked={genero === "femenino"}
                  onChange={(e) => setGenero(e.target.value)}
                  required
                />
                Femenino
              </label>
            </div>

            {/* Fecha */}
            <span className="form-label">
                Fecha de nacimiento:
            </span>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
            />

            {/* Grupo */}
            <span className="form-label">
                Equipo al que pertenece:
            </span>
            <select
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              required
            >
              <option value="ADES">
                ADES
              </option>
              <option value="ALPHA">
                ALPHA
              </option>
              <option value="LONCCOS RUNNING TEAM">
                LONCCOS RUNNING TEAM
              </option>
              <option value="TAYGETOS">
                TAYGETOS
              </option>
              <option value="RUNNATICOS">
                RUNNATICOS
              </option>
              <option value="ALTURA">
                ALTURA
              </option>
              <option value="CRAZY RUNNING">
                CRAZY RUNNING
              </option>
              <option value="OPTICAS ZAVALA">
                OPTICAS ZAVALA
              </option>
              <option value="PSYCHO RUNNERS">
                PSYCHO RUNNERS
              </option>
              <option value="SAMURAI AQP">
                SAMURAI AQP
              </option>
              <option value="ACADEMIA IPD">
                ACADEMIA IPD
              </option>
              <option value="FUERZA AEREA DEL PERU">
                FUERZA AEREA DEL PERU
              </option>
              <option value="CIMA RUNNERS">
                CIMA RUNNERS
              </option>
              <option value="IMPERIO TRAIL RUNNING">
                IMPERIO TRAIL RUNNING
              </option>
              <option value="TEAM CLARO">
                TEAM CLARO
              </option>
              <option value="NG ATLETIC">
                NG ATLETIC
              </option>
              <option value="LA RESISTENCIA">
                LA RESISTENCIA
              </option>
              <option value="AFABP">
                AFABP
              </option>
              <option value="otro">
                Otro equipo
              </option>
            </select>
            {
              grupo === "otro" && (
                <input
                  type="text"
                  placeholder="Escribe tu equipo"
                  value={otroEquipo}
                  onChange={(e) => setOtroEquipo(e.target.value)}
                />
              )
            }

            {/* Talla */}
            <span className="form-label">
                Talla de polo:
            </span>
            <select 
              value={talla}
              onChange={(e) => setTalla(e.target.value)}
              required>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <button
              type="submit"
              className="submit-btn"
              disabled={loadingStep}
            >
              {
                loadingStep
                  ? "CARGANDO..."
                  : "Continuar"
              }
            </button>
          </form>
        )}

        {step === 2 && (

          /*Términos, condiciones y foto de bienvenida*/
          <div className="checkbox-step">

            <div className="welcome-photo">
               <span className="form-label">
                Foto de Bienvenida (opcional):
               </span>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              onChange={(e) => setFotoBienvenida(e.target.files[0])}
            />
            </div>

            <br />

            <label className="checkbox-item">
              <input type="checkbox" 
                checked={bases_generales}
                onChange={(e) => setBasesGenerales(e.target.checked)}
              />
              He leído y acepto las Bases Generales del evento.
            </label>

            <label className="checkbox-item">
              <input type="checkbox" 
                checked={deslinde_responsabilidad}
                onChange={(e) => setDeslindeResponsabilidad(e.target.checked)}
              />
              He leído y acepto el Deslinde de Responsabilidad.
            </label>

            <label className="checkbox-item">
              <input type="checkbox" 
                checked={responsabilidad_sensor}
                onChange={(e) => setResponsabilidadSensor(e.target.checked)}
              />
              He leído y acepto la Responsabilidad del Sensor.
            </label>

            
            <label className="checkbox-item">
              <input type="checkbox" 
                checked={datos_correctos}
                onChange={(e) => setDatosCorrectos(e.target.checked)}
              />
              He leído y acepto que los datos proporcionados sean correctos.
            </label>

            <button 
              disabled={!bases_generales
                || !deslinde_responsabilidad 
                || !responsabilidad_sensor 
                || !datos_correctos}
              className="submit-btn"
              onClick={() => setStep(3)}
            >
              Finalizar inscripción
            </button>

          </div>
        )}

        {step === 3 && (
          <>
              <div className="resume-item">
                
                <h3>
                  Precio
                </h3>
                <span>
                  S/ {(pagoActual?.amount || 0) / 100}
                </span>
              </div>

              {descuento > 0 && (
                <>
                  <div className="resume-item">
                    <strong>Descuento:</strong>
                    <span>- S/ {descuento}</span>
                  </div>

                  <div className="resume-item">
                    <strong>Total a pagar:</strong>
                    <span>S/ {montoFinal / 100}</span>
                  </div>
                </>
              )}
              {/*
              <div className="resume-item">
                <strong>Código de descuento:</strong>
              
                <input
                  type="text"
                  placeholder="Ingresa tu código"
                  value={codigoDescuento}
                  onChange={(e) => setCodigoDescuento(e.target.value)}
                  disabled={codigoAplicado}
                />

                <button
                  type="button"
                  className="submit-btn"
                  onClick={aplicarCodigo}
                  disabled={codigoAplicado}
                  style={{ marginTop: "10px" }}
                >
                  {codigoAplicado
                    ? "CÓDIGO APLICADO"
                    : "APLICAR CÓDIGO"}
                </button>
              </div>
                */}
              <div className="payment-section">
                <h3>Pago por Yape</h3>
                    
                <p>
                  Realiza el pago por el monto correspondiente
                  al número:
                  <br/>
                  <strong>956280178 - María Málaga </strong>
                  <br/>
                  y adjunta tu captura.
                </p>
                <br/>
                <h3>
                  Captura de pago:
                </h3>
                <br/>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    setCapturaPago(e.target.files[0])
                  }
                />

                <br />
                <br/>
                <br/>
                <h3>O paga mediante link</h3>
                <br/>
                <h3>IMPORTANTE: SI PAGA CON TARJETA DEBE SUBIR LA CAPTURA DE PAGO Y AÑADIRLA A LA INSCRIPCIÓN</h3>

                <a
                  href={linkFinal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="submit-btn"
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "center"
                  }}
                >
                  PAGAR CON TARJETA
                </a>

       

                <button
                  className="submit-btn"
                  disabled={!capturaPago}
                  onClick={() => setStep(4)}
                >
                  CONTINUAR
                </button>

              </div>
            </>
        )}

        {(step === 4) && (
          <div className="resume-step">

          <div className="resume-item">
            <strong>Nombre:</strong>
            <span>{nombre}</span>
          </div>

          <div className="resume-item">
            <strong>Apellidos:</strong>
            <span>{apellidos}</span>
          </div>

          <div className="resume-item">
            <strong>DNI:</strong>
            <span>{dni}</span>
          </div>

          <div className="resume-item">
            <strong>Correo:</strong>
            <span>{correo}</span>
          </div>

          <div className="resume-item">
            <strong>Teléfono:</strong>
            <span>{telefono}</span>
          </div>

          <div className="resume-item">
            <strong>Género:</strong>
            <span>{genero}</span>
          </div>

          <div className="resume-item">
            <strong>Fecha nacimiento:</strong>
            <span>{fechaNacimiento}</span>
          </div>

          <div className="resume-item">
            <strong>Equipo:</strong>

            <span>
              {
                grupo === "otro"
                ? otroEquipo
                : grupo
              }
            </span>
          </div>

          <div className="resume-item">
            <strong>Talla:</strong>
            <span>{talla}</span>
          </div>

          <div className="resume-item">
            <strong>Distancia:</strong>
            <span>{modalidad}</span>
          </div>

          <div className="resume-item">
            <strong>Categoría:</strong>
            <span>La categoría será asignada según las bases generales</span>
          </div>

          <div className="resume-item">
            <strong>Monto de inscripción:</strong>
            <span>S/ {montoFinal / 100}</span>
          </div>

          {descuento > 0 && (
            <div className="resume-item">
              <strong>Descuento aplicado:</strong>
              <span>- S/ {descuento}</span>
            </div>
          )}

          {
            fotoBienvenida && (

              <div className="resume-photo">

                <strong>
                  Foto de bienvenida:
                </strong>

                <img
                  src={URL.createObjectURL(fotoBienvenida)}
                  alt="Foto bienvenida"
                />

              </div>
            )
          }

          {/*modulo de pago sin Culqi: solo usar en EMERGENCIA*/}
          
          <button
            className="submit-btn"
            disabled={enviando}
            onClick={async () => {

              setEnviando(true);

              try {

                await guardarInscripcionGoogle();

                await enviarCorreo();

              } catch (error) {

                console.log(error);

                alert(
                  "Error: " + error.message
                );

              } finally {

                setEnviando(false);

              }
            }}
          >
            {
              enviando
                ? "ENVIANDO..."
                : "FINALIZAR INSCRIPCIÓN"
            }
          </button>
        
        

        {/*B
        <CulqiButton
         disabled={
            enviando ||
            !bases_generales ||
            !deslinde_responsabilidad ||
            !responsabilidad_sensor ||
            !datos_correctos}
          title={pagoActual?.title} 
          amount={montoFinal}//monto a cobrar
          formData={{
            nombre,
            apellido: apellidos,
            dni,
            email: correo,
            telefono,
            genero,
            fecha_nacimiento: fechaNacimiento,
            grupo: grupo === "otro" ? otroEquipo : grupo,
            talla         
          }}
          onResult={handleFinalResult}
          buttonText={
            enviando
            ? "ENVIANDO..."
            : "PAGAR"
          }
        /> 
        */}
      </div>
      )}
      </Modal>

      <Categories
        titulo="Más allá de tus límites: Los Andenes de Chiguata"
        descripcion="¡Vive la segunda serie de la AQP TRAIL RUNNING SERIES INTERNATIONAL 2026 y supera tus propios límites!🌄🏃‍♂️🔥"
        imagen="https://atacaperu.com/wp-content/uploads/2026/06/C1.avif"
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
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=271247528&elevation=off&images=on&maptype=H"
      />
      <Mapping 
        titulo="Recorrido 10K" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=271247372&elevation=off&images=on&maptype=H"
      />
      <Mapping 
        titulo="Recorrido 21K" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=271248513&elevation=off&images=on&maptype=H"
      />
      <Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />
    </>

  );
 
}
