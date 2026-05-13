import React from 'react';
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
import { useState } from "react";
import Modal from '../components/MODAL/Modal';

export default function Chiguata() {
  /*Estado para controlar el grupo seleccionado en el formulario de inscripción */
  const [grupo, setGrupo] = useState("");

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
  const [talla, setTalla] = useState("");
  const [otroEquipo, setOtroEquipo] = useState("");
  const [fotoBienvenida, setFotoBienvenida] = useState(null);

  /*Estados para controlar los checkbox de términos y condiciones */
  const [bases_generales, setBasesGenerales] = useState(false);
  const [deslinde_responsabilidad, setDeslindeResponsabilidad] = useState(false);
  const [responsabilidad_sensor, setResponsabilidadSensor] = useState(false);
  const[datos_correctos, setDatosCorrectos] = useState(false);

  /* Estado para controlar el modal y el ítem seleccionado */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  /*Items de tipo de inscripción*/
  const items_inscripcion = [
    {
        img: "/images/LSL_MTB/2fechas.jpg",
        title: "Inscripción paquete completo",
        desc: "¡Asegura tu lugar en el Chiguata Epic 2026! Inscríbete ahora y reserva todas las fechas",
        link: "https://atacaperu.com/inscripcion-paquete-completo-lsl-mtb-2026/",
        btnText: "Inscribirme",
    },
    {
        img: "/images/LSL_MTB/1fecha.jpg",  
        title: "Inscripción por fecha",
        desc: "Inscríbite en la primera FECHA: CHIGUATA EPIC 2026",
        link: "https://atacaperu.com/inscripcion-chiguata-epic-2026/",
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
      "/images/Chiguata_medalla.jpg",
      "/images/Chiguata_certificado.jpg",
      "/images/Chiguata_posavasos.jpg",
      "/images/Fruta_hidratacion.jpg",
  ]

  /*Detalles del hero section*/
  const detalles_hero = [
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Chiguata, Arequipa" },
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
    { label: "Lugar", value: "Chiguata, Arequipa, Perú" },
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
        descripcion="El evento de ciclismo de montaña más esperado del año en Arequipa. ¡Prepárate para vivir la emoción del Chiguata Epic 2026!"
        video="https://atacaperu.com/wp-content/uploads/2026/02/videoplayback.mp4"
        imagen="/images/LSL MTB CHIGUATA.png"   // 🔑 nueva prop para mostrar al costado del título
        detalles={detalles_hero}
      />     

      <br />

      <Countdown
        targetDate="2026-03-29T09:00:00"
        titulo="CUENTA REGRESIVA PARA CHIGUATA EPIC 2026"
        descripcion="¡Prepárate para la competencia más emocionante de la temporada!"
      />

      <Responsib titulo="INSCRIPCIONES" items={items_inscripcion} onButtonClick={abrirModal}/>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
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
                || !datos_correctos}
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

          <button
            type="button"
            className="submit-btn"
          >
            Enviar inscripción
          </button>

      </div>
      )}

      </Modal>


      <Categories
        titulo="El camino es TUYO"
        descripcion="Una ruta exigente, paisajes únicos y la mejor experiencia del ciclismo en Arequipa 🌄🔥
                    Vive el ciclismo donde el camino es tuyo."
        imagen="https://atacaperu.com/wp-content/uploads/2023/04/portada-3.jpg"
        categorias={categorias}
        items={items}
      />
      <ButtonBases url={"https://atacaperu.com/wp-content/uploads/2026/01/BASES-LSL-MTB-2026.pdf"}/>
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
