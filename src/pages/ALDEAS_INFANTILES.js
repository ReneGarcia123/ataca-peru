import React, { useState, setStatus, status } from 'react';
import EventBanner from '../components/EVENTBANNER/EventBanner';
import Countdown from "../components/COUNTDOWN/Countdown";
import HeroVideo from "../components/HEROVIDEO/HeroVideo";
import Categories from '../components/CATEGORIES/Categories';
import { FaMedal} from "react-icons/fa";
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

export default function ALDEAS_INFANTILES() {
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

  /*Estados para controlar los checkbox de términos y condiciones */
  const [bases_generales, setBasesGenerales] = useState(false);
  const [deslinde_responsabilidad, setDeslindeResponsabilidad] = useState(false);
  const [responsabilidad_sensor, setResponsabilidadSensor] = useState(false);
  const[datos_correctos, setDatosCorrectos] = useState(false);

  /* Estado para controlar el modal y el ítem seleccionado */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
    alert("Tu inscripción fue exitosa. Se envió un correo de confirmación al correo que ingresaste");
    setModalOpen(false);
    window.location.reload();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const finalizarInscripcion = async () => {

  setEnviando(true);

  try {

    await guardarInscripcionGoogle();

    await enviarCorreo();

  } catch (error) {

    console.log(error);

    alert("Hubo un problema al finalizar la inscripción");

  } finally {

    setEnviando(false);
  }
};


  /*Guardar inscripción en google sheet, además de subir foto*/
const guardarInscripcionGoogle = async () => {

  try {

    // =========================
    // FOTO BIENVENIDA
    // =========================

    let fotoBienvenidaData = null;

    if (fotoBienvenida) {

      const base64 = await new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.readAsDataURL(fotoBienvenida);

        reader.onload = () => {

          resolve(
            reader.result.split(",")[1]
          );
        };

        reader.onerror = reject;

      });

      fotoBienvenidaData = {

        base64,
        mimeType: fotoBienvenida.type,
        fileName: fotoBienvenida.name
      };
    }

    // =========================
    // CAPTURA PAGO
    // =========================

    let capturaPagoData = null;

    if (capturaPago) {

      const base64 = await new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.readAsDataURL(capturaPago);

        reader.onload = () => {

          resolve(
            reader.result.split(",")[1]
          );
        };

        reader.onerror = reject;

      });

      capturaPagoData = {

        base64,
        mimeType: capturaPago.type,
        fileName: capturaPago.name
      };
    }

    // =========================
    // PAYLOAD
    // =========================

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

      fotoBienvenida: fotoBienvenidaData,
      capturaPago: capturaPagoData
    };

    // =========================
    // ENVIAR
    // =========================

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwLbCQaPX14S69pngI55Q70glWeuPXmlfnPGhdj2LB9zlBKvQrh5AOmX8zjoNJFS71W/exec",
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    );

    const text = await response.text();

    console.log(text);
    console.log(text);

    const result = JSON.parse(text);

    if (!result.success) {
      throw new Error(result.error);
    }

    console.log("Google Sheets:", result);

  } catch (error) {

    console.log(
      "Error Google Sheets:",
      error
    );
  }
};

  /*Estado de carga de envío de correo*/
  const [enviando, setEnviando] = useState(false);

  /*Items de tipo de inscripción*/
  const items_inscripcion = [
    {
        img: "https://atacaperu.com/wp-content/uploads/2026/05/667365336_122121142869170678_2140071024310354874_n.avif",
        title: "¡Inscríbite ahora!",
        desc: "¡Corre donde el mar y la arena desafían tus límites! Prepárate para vivir una experiencia única entre el mar, la arena y la fuerza del norte ",
        btnText: "Inscribirme",
    }
  ]

  /*Función para abrir el modal con el ítem seleccionado */
  const abrirModal = (item) => {
      setSelectedItem(item);
      setStep(1); // Reiniciar al paso 1 cada vez que se abre el modal
      setModalOpen(true);
  };

  const items_responsib = [
  {
      img: "/images/RESPONSABILITIES/deslinde.jpg",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento.",
      link: "https://atacaperu.com/wp-content/uploads/2025/02/DESLINDE-DE-RESPONSABILIDAD.pdf",
      btnText: "Ver documento",
    },

    {
      img: "/images/RESPONSABILITIES/sensor.jpg",
      title: "Dispositivo Sensor",
      desc: "Uso correcto y responsabilidad del equipo.",
      link: "https://atacaperu.com/wp-content/uploads/2025/02/RESPONSABILIDAD-SENSOR.pdf",
      btnText: "Ver documento",
    },

    {
      img: "/images/RESPONSABILITIES/menor.jpg",
      title: "Autorización de Menor",
      desc: "Permiso para participación de menores.",
      link: "https://atacaperu.com/wp-content/uploads/2025/12/Autorizacion-para-menor-delinde-responsabilidad-CHIGUATA-EPIC-2026.pdf",
      btnText: "Ver documento",
    },
  ];

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://atacaperu.com/wp-content/uploads/2026/05/701313432_1828615631879010_3829468554739370638_n.avif",
      "https://atacaperu.com/wp-content/uploads/2026/05/700208264_1827702155303691_1205507908146195870_n.avif",
      "https://atacaperu.com/wp-content/uploads/2026/05/697177072_1826755695398337_2843395840613015311_n.avif",
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Playa los Órganos, Piura, Perú" },
      { icon: <FaClock />, label: "Hora", value: "08:00 AM" },
      { icon: <FaMedal />, label: "Premios", value: "Reconocimientos a ganadores" },
  ];

  const categorias = [
      "Varones Pro: Juveniles, Elite, Master A,B y C",
      "Damas Pro: Elite, Master",
      "Varones Turismo: Open, Master y Súper Máster",
      "Damas Turismo: Open y Master"
  ];

  const detalles = [
    { label: "Fecha", value: "29 de marzo 2026" },
    { label: "Lugar", value: "Playa los Órganos, Piura, Perú" },
    { label: "Concentración", value: "07:30 AM" },
    { label: "Partida", value: "08:00 AM" }
  ];

  
  const items = [
    { icon: <RiTeamFill />, title: "Acumulativo", text: "Puntaje grupal acumulativo" },
    { icon: <FaMedal />, title: "Premios", text: "Reconocimientos a los ganadores de cada categoría" },
    { icon: <MdTimer />, title: "Cronometrado", text: "Tiempo cronometrado elctrónicamente" },
    { icon: <GiTrophyCup />, title: "Grupos", text: "Premio en efectivo a los primeros tres equipos" },
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
    fotoBienvenida
  });

  return (
     <>
      <HeroVideo
        descripcion="El evento de trail running más esperado del año llega a la costa norte de Perú. Prepárate para vivir una experiencia única entre el mar, la arena y la fuerza del norte. ¡Corre donde el mar y la arena desafían tus límites!"
        video="https://atacaperu.com/wp-content/uploads/2026/05/YTDown_YouTube_Correr-por-la-playa-Costa-Runner-No-Copy_Media_bSxZn9gOTlA_001_720p.mp4"
        imagen="/images/LSL MTB CHIGUATA.png"   
        detalles={detalles_hero}
      />     

      <br />

      <Countdown
        targetDate="2026-06-28T09:00:00"
        titulo="CUENTA REGRESIVA PARA TRAIL DEL PESCADOR 10K"
        descripcion="Prepárate para vivir una experiencia única entre el mar, la arena y la fuerza del norte"
      />

      <Responsib titulo="INSCRIPCIONES" items={items_inscripcion} onButtonClick={abrirModal}/>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
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
            :"RESUMEN DE INSCRIPCIÓN"
          }
        </h1>
        { step === 1 && (
          <form className="inscripcion-form"
            onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
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
            <button type="submit" className="submit-btn">
              Continuar
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

            <div className="welcome-photo">
              <span className="form-label">
                Subir captura de pago (obligatorio):
              </span>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                onChange={(e) => setCapturaPago(e.target.files[0])}
                required
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
              He leído y acepto las el Deslinde de Responsabilidad.
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
                || !datos_correctos
                || !capturaPago
              }
              className="submit-btn"
              onClick={() => setStep(3)}
            >
              Finalizar inscripción
            </button>

          </div>
        )}

        {(step === 3) && (
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
            <strong>Categoría:</strong>
            <span>La categoría será asignada según las bases generales</span>
          </div>

          {
            fotoBienvenida && (
              <>
                <div className="resume-photo">
                  <strong>
                    Foto de bienvenida:
                  </strong>

                  <img
                    src={URL.createObjectURL(fotoBienvenida)}
                    alt="Foto bienvenida"
                  />
                </div>
              </>
            )
          }
          {
            capturaPago && (
              <div className="resume-photo">
                <strong>
                  Captura de pago:
                </strong>

                {
                  capturaPago.type.includes("image")
                  ? (
                    <img
                      src={URL.createObjectURL(capturaPago)}
                      alt="Captura de pago"
                    />
                  )
                  : (
                    <p>{capturaPago.name}</p>
                  )
                }
              </div>
            )
          }

         <button
            className="submit-btn"
            disabled={enviando}
            onClick={finalizarInscripcion}
          >
            {
              enviando
              ? "ENVIANDO..."
              : "FINALIZAR INSCRIPCIÓN"
            }
          </button>
      </div>
      )}

      </Modal>


      <Categories
        titulo="Más fuerte que el cansancio: Trail del Pescador 10K"
        descripcion="Una ruta exigente, paisajes únicos y la mejor experiencia del ciclismo en Arequipa 🌄🔥
                    Vive el ciclismo donde el camino es tuyo."
        imagen="https://atacaperu.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-05-at-11.34.23-AM.avif"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://atacaperu.com/wp-content/uploads/2026/05/BASES-GENERALES-TRAIL-DEL-PESCADOR.pdf"}/>
      <br />
      <br />
      <br />
      <Carrusel2 images={images_carrousel2} titulo="¿Qué incluye tu participación?" />
      <Mapping titulo="Ruta TURISMO" stravaEmbedUrl="https://www.strava.com/activities/17373365056"/>
      <Mapping titulo="Ruta PRO" stravaEmbedUrl="https://www.strava.com/activities/17373365056"/>
      <Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />
    </>

  );
 
}
