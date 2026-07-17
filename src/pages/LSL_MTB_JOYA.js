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

export default function LSL_MTB_JOYA() {

  /*PRIMERA PREVENTA, SEGUNDA PREVENTA, VENTA FINAL*/
  const tipoPreventa="PESCADOR PRIMERA PRE VENTA";

  const handleCapturaPago = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setCapturaPago(file);

    const reader = new FileReader();

    reader.onload = () => {

      const base64 = reader.result.split(",")[1];

      setCapturaPagoData({
        base64,
        mimeType: file.type,
        fileName: file.name
      });

    };

    reader.readAsDataURL(file);

  };

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
  setCapturaPago(null);

  setBasesGenerales(false);
  setDeslindeResponsabilidad(false);
  setResponsabilidadSensor(false);
  setDatosCorrectos(false);

  setSelectedItem(null);
};

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
  const [capturaPagoData, setCapturaPagoData] = useState(null);

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
      "template_s1pd1bx",
      templateParams,
      "PN9-V6us45efj9uL6"
    );
    alert(nombre+" ,tu inscripción se ha completado exitosamente. ¡El Señor de la Joya te espera!\nSe enviará un correo de confirmación a "+correo+" con los detalles de tu inscripción.\nEn el mismo correo está el link para que te puedas unir al grupo de WhatsApp de la carrera. ¡Nos vemos en la carrera!");
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

      let fotoBase64 = "";
      let fotoMimeType = "";

      let capturaPagoBase64 = "";
      let capturaPagoMimeType = "";

      // FOTO DE BIENVENIDA
      if (fotoBienvenida) {

        fotoMimeType = fotoBienvenida.type;

        fotoBase64 = await new Promise((resolve, reject) => {

          const reader = new FileReader();

          reader.readAsDataURL(fotoBienvenida);

          reader.onload = () => {
            resolve(reader.result.split(",")[1]);
          };

          reader.onerror = reject;

        });

      }

      // CAPTURA DE PAGO
      if (capturaPago) {

        capturaPagoMimeType = capturaPago.type;

        capturaPagoBase64 = await new Promise((resolve, reject) => {

          const reader = new FileReader();

          reader.readAsDataURL(capturaPago);

          reader.onload = () => {
            resolve(reader.result.split(",")[1]);
          };

          reader.onerror = reject;

        });

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

        modalidad,

        fotoBase64,
        fotoMimeType,

        capturaPagoBase64,
        capturaPagoMimeType
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxCsGdI1zBQQrPDD3aVPFLbeGfH9qLLUkkP96oTxLczPgZb9RZ23K9L6H8l_DIgR7Nd/exec",
        {
          method: "POST",
          body: JSON.stringify(payload)
        }
      );

      const text = await response.text();

      const result = JSON.parse(text);

      if (!result.success) {
        throw new Error(result.error || "Error al guardar en Google Sheets");
      }

    } catch (error) {

      console.log(error);
      throw error;

    }

  };

  /*Estado de carga de envío de correo*/
  const [enviando, setEnviando] = useState(false);
  const proximamente=[

  ]

  /*Items de tipo de inscripción*/
  const items_inscripcion = [
    
    {
        img: "https://atacaperu.com/wp-content/uploads/2026/07/2.avif",
        title: "CICLISMO PRO",
        desc: "El Señor de la Joya te desafía. Domina el terreno Pro y corona tu esfuerzo",
        btnText: "Inscribirme",
        modalidad: "PRO PRIMERA PRE VENTA",
    },

    {
        img: "https://atacaperu.com/wp-content/uploads/2026/07/3.avif",
        title: "CICLISMO TURISMO",
        desc: "El Señor de la Joya te espera. ¡Inscríbete en Turismo y vive la aventura!",
        btnText: "Inscribirme",
        modalidad: "TURISMO PRIMERA PRE VENTA",
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
      img: "https://atacaperu.com/wp-content/uploads/2026/05/545454.avif",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento.",
      link: "https://atacaperu.com/wp-content/uploads/2026/05/DESLINDE-SENOR-JOYA.pdf",
      btnText: "Ver documento",
    },

    {
      img: "https://atacaperu.com/wp-content/uploads/2026/05/553001770_774836215512043_1994255925318920294_n.avif",
      title: "Dispositivo Sensor",
      desc: "Uso correcto y responsabilidad del equipo.",
      link: "https://atacaperu.com/wp-content/uploads/2025/02/RESPONSABILIDAD-SENSOR.pdf",
      btnText: "Ver documento",
    },

    {
      img: "https://atacaperu.com/wp-content/uploads/2026/05/88888.avif",
      title: "Autorización de Menor",
      desc: "Permiso para participación de menores.",
      link: "https://atacaperu.com/wp-content/uploads/2026/05/AUTORIZACION-SENOR-JOYA.pdf",
      btnText: "Ver documento",
    },
  ];

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://atacaperu.com/wp-content/uploads/2026/05/646379961_907306912264972_4631821691080540866_n.avif",
      "https://atacaperu.com/wp-content/uploads/2026/05/645392577_905971779065152_4121537732378578225_n.avif",
      "https://atacaperu.com/wp-content/uploads/2026/05/646365881_905078655821131_5670434078030326945_n.avif",
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "La Joya, Arequipa, Perú" },
      { icon: <FaClock />, label: "Hora", value: "08:00 AM" },
      { icon: <FaMedal />, label: "Premios", value: "Reconocimientos a ganadores" },
  ];

  const categorias = [
      "Varones Pro Juveniles: de 15 a 17 años",
      "Varones Pro Elite: de 18 a 29 años",
      "Varones Pro Master A: de 30 a 39 años",
      "Varones Pro Master B: de 40 a 49 años",
      "Varones Pro Master C: de 50 años a más",
      "Damas Pro Elite: de 18 a 34 años",
      "Damas Pro Master: de 35 años a más",
      "Varones y Damas Turismo Open: de 18 a 34 años",
      "Varones y Damas Turismo Master: de 35 años a más",
      "Varones Turismo Súper Master: de 50 años a más",
  ];

  const detalles = [
    { label: "Fecha", value: "29 de marzo 2026" },
    { label: "Lugar", value: "Playa los Órganos, Piura, Perú" },
    { label: "Concentración", value: "07:30 AM" },
    { label: "Partida", value: "08:00 AM" }
  ];

  
  const items = [
    { icon: <FaMedal />, title: "Premios por Categoría", text: "Para los tres primeros puestos de cada categoria" },
    { icon: <MdTimer />, title: "Cronometrado", text: "Tiempo cronometrado elctrónicamente" },
    { icon: <GiTrophyCup />, title: "Premio Grupal", text: "En efectivo para los equipos con mayor puntaje acumulativo" },
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
        descripcion="Prepárate para desafiar la montaña, la arena y tus propios límites 
                     en El Señor de La Joya. Cada sendero pondrá a prueba tu fuerza, cada
                     curva tu técnica y cada kilómetro tu pasión por el ciclismo. Vive la
                     adrenalina de la SUPER LIGA MOUNTAIN BIKE, una experiencia única que
                     te llevará a la gloria sobre dos ruedas."
        video="https://atacaperu.com/wp-content/uploads/2026/05/Senor-de-la-joya-CICLISMO.mp4"
        imagen="https://atacaperu.com/wp-content/uploads/2023/04/logo-blanco.png"   
        detalles={detalles_hero}
      />     

      <br />

      <Countdown
        targetDate="2026-09-27T09:00:00"
        titulo="CUENTA REGRESIVA PARA LSL MTB SEGUNDA SERIE: EL SEÑOR DE LA JOYA"
        descripcion="Domina la arena, conquista la montaña… ¡Sé parte del Señor de La Joya!"
      />

      {/*HABILITAR CUANDO NO SE TENGA LAS INSCRIPCIONES LISTAS, ES UN PROXIMAMENTE*/}
      {/*<Responsib titulo="INSCRIPCIONES PRÓXIMAMENTE" items={proximamente}/>*/}

      {/*HABILITAR CUANDO SE COMPLETE EL SISTEMA DE INSCRIPCION*/}
      /<Responsib titulo="MODALIDADES DE INSCRIPCIÓN" items={items_inscripcion} onButtonClick={abrirModal}/>

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
            step===1
            ? "FORMULARIO DE INSCRIPCIÓN"

            :step===2
            ? "TÉRMINOS Y CONDICIONES"

            :step===3
            ? "PAGO DE INSCRIPCIÓN"
            :"RESUMEN DE INSCRIPCIÓN"
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
              <option value="ORIGINAL BIKES">
                ORIGINAL BIKES
              </option>
              <option value="MORE RACING TEAM">
                MORE RACING TEAM
              </option>
              <option value="Bikers Team">
                Bikers Team
              </option>
              <option value="ATR54">
                ATR54
              </option>
              <option value="CLUB NOVA BIKERS AQP">
                CLUB NOVA BIKERS AQP
              </option>
              <option value="Team Colca Bike">
                Team Colca Bike
              </option>
              <option value="PIP & LINES">
                PIP & LINES
              </option>
              <option value="Alpha">
                Alpha
              </option>
              <option value="CLARO">
                CLARO
              </option>
              <option value="ONLY BIKES SPECIALIZED AREQUIPA">
                ONLY BIKES SPECIALIZED AREQUIPA
              </option>
              <option value="Garage Bike">
                Garage Bike
              </option>
              <option value="Alliance AQP">
                Alliance AQP
              </option>
              <option value="CIMA RUNNERS">
                CIMA RUNNERS
              </option>
              <option value="INDIOS MALDITOS">
                INDIOS MALDITOS
              </option>
              <option value="QZ Racing Team">
                QZ Racing Team
              </option>
              <option value="Joya">
                Joya
              </option>
              <option value="Team Gluck">
                Team Gluck
              </option>
              <option value="MTB NUEVO NIVEL">
                MTB NUEVO NIVEL
              </option>
              <option value="Xtremos">
                Xtremos
              </option>
              <option value="TEAM UNSA BIKERS">
                TEAM UNSA BIKERS
              </option>
              <option value="CMA BIKERS">
                CMA BIKERS
              </option>
              <option value="WOLFGANG">
                WOLFGANG
              </option>
              <option value="SURVIVOR AQP">
                SURVIVOR AQP
              </option>
              <option value="Conejos Ninjas">
                Conejos Ninjas
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
              Pasar al pago
            </button>

          </div>
        )}

        {step === 3 && (
          <div className="step-container">

            <h2 className="step-title">
              Pago de inscripción
            </h2>

            <div className="payment-box">

              <strong>COSTO DE INSCRIPCIÓN (PRIMREA PRE VENTA):</strong>

              <p>S/ 70.00</p>

              <br />

              <strong>
                Pago mediante Yape al número:
              </strong>

              <p>956280178</p>

              <strong>MARIA A. MÁLAGA</strong>

            </div>

           <div className="form-group">

              <span className="form-label">
                  Adjunta tu comprobante de pago:
              </span>

              <div className="file-upload">

                  <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleCapturaPago}
                  />

                  {
                      capturaPago &&
                      <div className="file-selected">
                          ✓ {capturaPago.name}
                      </div>
                  }

              </div>

            </div>

            <div className="step-buttons">

              <button
                type="button"
                className="submit-btn"
                onClick={() => setStep(2)}
              >
                Atrás
              </button>

              <button
                type="button"
                className="submit-btn"
                disabled={!capturaPago}
                onClick={() => setStep(4)}
              >
                Continuar
              </button>

            </div>

          </div>
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
            <strong>Distancia:</strong>
            <span>{modalidad}</span>
          </div>

          <div className="resume-item">
            <strong>Categoría:</strong>
            <span>La categoría será asignada según las bases generales</span>
          </div>

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
          {
            capturaPago && (

              <div className="resume-photo">

                <strong>
                  Comprobante de pago:
                </strong>

                <img
                  src={URL.createObjectURL(capturaPago)}
                  alt="Comprobante de pago"
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
        
        {/*
        <CulqiButton
         disabled={
            enviando ||
            !bases_generales ||
            !deslinde_responsabilidad ||
            !responsabilidad_sensor ||
            !datos_correctos}
          title={pagoActual?.title} 
          amount={pagoActual?.amount}//monto a cobrar
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
        />*/}
      </div>
      )}
      </Modal>

      <Categories
        titulo="¡El Señor de La Joya! La batalla definitiva de la LSL - MTB INTERNATIONAL"
        descripcion="¡Vive la emoción de la LSL MTB – EL SEÑOR DE LA JOYA 🚵‍♂️🌵🔥
                      Desafía la arena, las dunas y tu propia resistencia en el 
                      desierto de La Joya. Cada pedalada un paso hacia la gloria!🌵🏃‍♂️🔥"
        imagen="https://atacaperu.com/wp-content/uploads/2026/05/100000.avif"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://atacaperu.com/wp-content/uploads/2026/03/LSL-MTB-2026-BASES.pdf"}/>
      <br />
      <br />
      <br />
      <Carrusel2 images={images_carrousel2} titulo="¿Qué incluye tu participación?" />
      
      <Mapping 
        titulo="Recorrido Turismo" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=266624613&elevation=off&images=on&maptype=H"
      />
      <Mapping 
        titulo="Recorrido Pro (2 vueltas)" 
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=266625142&elevation=off&images=on&maptype=H"
      />
      <Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />
    </>

  );
 
}
