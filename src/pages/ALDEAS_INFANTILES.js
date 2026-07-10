import React, { useState } from 'react';
import EventBanner from '../components/EVENTBANNER/EventBanner';
import Countdown from "../components/COUNTDOWN/Countdown";
import HeroVideo from "../components/HEROVIDEO/HeroVideo";
import Categories from '../components/CATEGORIES/Categories';
import { PiCertificateBold } from "react-icons/pi";
import { FaRoadCircleCheck } from "react-icons/fa6";
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

  /*Al cerrar poner todo en su estado inicial */
  const resetFormulario = () => {
  // PASOS
  setStep(1);

  // DATOS
  setNombre("");
  setApellidos("");
  setDni("");
  setCorreo("");
  setTelefono("");
  setGenero("");
  setFechaNacimiento("");
  setGrupo("ALPHA");
  setTalla("M");
  setOtroEquipo("");

  // ARCHIVOS
  setFotoBienvenida(null);
  setCapturaPago(null);

  // CHECKBOX
  setBasesGenerales(false);
  setDeslindeResponsabilidad(false);
  setResponsabilidadSensor(false);
  setDatosCorrectos(false);

  // OTROS
  setSelectedItem(null);
};

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

    const response = await emailjs.send(
      "service_2govrnu",
      "template_s1pd1bx",
      templateParams,
      "PN9-V6us45efj9uL6"
    );

    console.log("EMAILJS RESPONSE:", response);

    return true;

  } catch (error) {

    console.log("ERROR EMAILJS:", error);

    return false;
  }
};

const finalizarInscripcion = async () => {

   setEnviando(true);

  try {

    await guardarInscripcionGoogle();

    const correoEnviado = await enviarCorreo();

    if (correoEnviado) {

      window.alert(
        nombre+" ,tu inscripción se ha completado exitosamente. ¡Gracias por apoyar esta gran causa!\nSe enviará un correo de confirmación a "+correo+" con los detalles de tu inscripción.\nEn el mismo correo está el link para que te puedas unir al grupo de WhatsApp de la carrera. ¡Nos vemos en la carrera!"
      );

    } else {

      window.alert(
        "La inscripción se guardó correctamente, pero hubo un problema enviando el correo."
      );
    }

    setModalOpen(false);

    window.location.reload();

  } catch (error) {

    console.log(error);

    window.alert(
      "Hubo un problema al finalizar la inscripción"
    );

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
        img: "https://atacaperu.com/wp-content/uploads/2026/05/aldeas1.avif",
        title: "¡Inscríbite ahora!",
        desc: "Corre por una gran causa en súmate junto a tu familia y amigos y apoya a los niños, niñas y adolescentes de Aldeas Infantiles SOS. ¡Inscríbete y sé parte del cambio!",
        btnText: "Deseo apoyar con mi inscripción",
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
      img: "https://atacaperu.com/wp-content/uploads/2026/05/aldeas-4.avif",
      title: "Deslinde de Responsabilidad",
      desc: "Aceptación de riesgos y condiciones del evento",
      link: "https://atacaperu.com/wp-content/uploads/2026/05/DESLINDE-ALDEAS-INFANTILES-2026.pdf",
      btnText: "Ver documento",
    },

    {
      img: "https://atacaperu.com/wp-content/uploads/2026/05/aldeas3.avif",
      title: "Autorización de menores de edad",
      desc: "Permiso para que menores de edad participen en el evento.",
      link: "https://atacaperu.com/wp-content/uploads/2026/05/ALDEAS-INFANTILES-AUTORIZACION-MENORES.pdf",
      btnText: "Ver documento",
    },

  ];

  /*Carrusel 2 imagenes*/
  const images_carrousel2=[
      "https://atacaperu.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-12-at-1.33.15-PM.avif",
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Cerro Colorado, Arequipa, Perú" },
      { icon: <FaClock />, label: "Hora", value: "07:00 AM" },
      { icon: <FaMedal />, label: "Premios", value: "Reconocimientos a ganadores" },
  ];

  const categorias = [
      "Varones y damas juveniles: de 15 a 17 años",
      "Varones y damas elite: de 18 a 34 años",
      "Varones y damas máster: de 35 a 49 años",
      "Varones y damas súper máster: de 50 años a más"
  ];

  const items = [
    { icon: <FaRoadCircleCheck/>, title: "Cierre de vías", text: "Para garantizar la seguridad de los participantes" },
    { icon: <FaMedal />, title: "Medalla Finisher", text: "Para todos los participantes que completan la carrera" },
    { icon: <MdTimer />, title: "Cronometrado", text: "Tiempo cronometrado elctrónicamente" },
    { icon: <PiCertificateBold  />, title: "Premios", text: "Regalos y premios para los primeros puestos de cada categoría" },
  ];

  return (
     <>
      <HeroVideo
        descripcion="“Arequipa Corre por una Infancia Feliz” es más que una carrera: es una oportunidad para unir deporte, solidaridad y esperanza en favor de los niños, niñas y adolescentes de Aldeas Infantiles SOS"
        video="https://atacaperu.com/wp-content/uploads/2026/05/VIDEO-CORTADO-ALDEAS-2026.mp4"
        imagen="https://atacaperu.com/wp-content/uploads/2026/05/ATACA-ALDEAS.avif"   
        detalles={detalles_hero}
      />     

      <br />

      <Countdown
        targetDate="2026-07-12T09:00:00"
        titulo="CUENTA REGRESIVA PARA: CORRE POR UNA INFANCIA FELIZ 6K"
        descripcion="Unir deporte y solidaridad en una experiencia que inspire a la comunidad a participar activamente por una buena causa"
      />

      {/*<Responsib titulo="INSCRIPCIONES" items={items_inscripcion} onButtonClick={abrirModal}/>*/}

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          resetFormulario();
        }

        }
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
                OTRO EQUIPO
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
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
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
                <strong>
                  Las inscripción será por YAPE y tendrá un costo de 40.00 soles
                </strong>
                <br />
                <strong>
                  Debe subir la captura de pago para finalizar su inscripción
                </strong>
                <br />
                <strong>
                  Número: 959373874 - a nombre de Aldeas Infantiles
                </strong>
              </span>

              <span className="form-label">
                <strong>
                  Subir captura de pago (obligatorio):
                </strong>
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
              Verifica tus datos
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
        titulo="Corre por una infancia llena de sonrisas"
        descripcion="Más que una carrera, una causa que une deporte, solidaridad y esperanza. Cada paso ayuda a construir una infancia más feliz para quienes más lo necesitan."
        imagen="https://atacaperu.com/wp-content/uploads/2026/05/aldeas2.avif"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://atacaperu.com/wp-content/uploads/2026/05/BASES-ALDEAS-INFANTILES-2026.pdf"}/>
      <br />
      <br />
      <Carrusel2 images={images_carrousel2} titulo="¿Qué incluye tu participación?" />
      <Mapping
        titulo="Recorrido de la carrera"
        proximamente={false}
        wikilocUrl="https://es.wikiloc.com/wikiloc/embedv2.do?id=226823733&elevation=off&images=off&maptype=H"
      />
      
      <Responsib titulo="Responsabilidad y Autorizaciones" items={items_responsib} />
    </>

  );
 
}
