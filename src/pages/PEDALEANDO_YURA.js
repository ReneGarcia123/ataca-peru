import React, { useState } from 'react';

import Countdown from "../components/COUNTDOWN/Countdown";
import HeroVideo from "../components/HEROVIDEO/HeroVideo";
import { FaMedal, FaRegMoneyBillAlt} from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Mapping from '../components/MAPPING/Mapping';
import Responsib from '../components/RESPONSIBILITIES/Responsib';
import Modal from '../components/MODAL/Modal';
import emailjs from '@emailjs/browser';
import { MdDirectionsBike } from "react-icons/md";



export default function PEDALEANDO_YURA() {
  const [modalOpen, setModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [talla, setTalla] = useState("");
  const [modalidad, setModalidad] = useState("");

  const [enviando, setEnviando] = useState(false);

  const abrirModal = (item) => {
    setModalidad(item.modalidad);
    setModalOpen(true);
  };

  const resetFormulario = () => {
    setNombre("");
    setApellidos("");
    setDni("");
    setCorreo("");
    setModalidad("");
    setTalla("");
  };

  const guardarInscripcionGoogle = async () => {
    const payload = {
      nombre,
      apellidos,
      dni,
      correo,
      talla,
      modalidad
    };
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxb7qnvkNHeR5FJrxQAV8nWtL6SOn-CH2_Rw71iqvYBnbNC5sjU-73TnnCc0D1Y9BPnfw/exec",
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    );

    const text = await response.text();
    const result = JSON.parse(text);

    if (!result.success) {
      throw new Error(result.error);
    }
  };

  const enviarCorreo = async () => {
    const templateParams = {
      nombre,
      apellidos,
      dni,
      correo,
      talla,
      modalidad
    };
    await emailjs.send(
      "service_gi2cwnf",
      "template_mpj2jnh",
      templateParams,
      "3ElF522uPVPnXza99"
    );
  };

  const finalizarInscripcion = async () => {
    if (enviando) return;

    try {

      setEnviando(true);

      await guardarInscripcionGoogle();

      await enviarCorreo();

      alert(
        `${nombre}, tu inscripción fue realizada correctamente. Se enviará una confirmación al correo: ${correo}, donde te podrás unir al grupo de WhatsApp del evento.`
      );

      setModalOpen(false);

      resetFormulario();

    } catch (error) {

      alert(error.message);

    } finally {

      setEnviando(false);

    }

  };


  /*Items de tipo de inscripción*/
  const items_inscripcion = [
    {
        img: "https://atacaperu.com/wp-content/uploads/2026/07/images.avif",
        title: "INSCRIBITE AHORA",
        desc: "Yura te desafía. Domina el terreno y corona tu esfuerzo",
        btnText: "Inscribirme",
        modalidad: "CICLISMO GRATIS YURA",
    },
  ]

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
      { icon: <FaMapMarkerAlt />, label: "Lugar", value: "Yura, Arequipa, Perú" },
      { icon: <FaClock />, label: "Hora", value: "08:00 AM" },
      { icon: <MdDirectionsBike />, label: "Ciclo Turismo", value: "Turismo Recreativo" },
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



  return (
     <>
      <HeroVideo
        descripcion="Prepárate para desafiar la montaña, la arena y tus propios límites 
                     en YURA. Cada sendero pondrá a prueba tu fuerza, cada
                     curva tu técnica y cada kilómetro tu pasión por el ciclismo. Vive la
                     adrenalina del ciclismo, una experiencia única que
                     te llevará a la gloria sobre dos ruedas."
        video="https://atacaperu.com/wp-content/uploads/2026/05/Senor-de-la-joya-CICLISMO.mp4"
        imagen="https://atacaperu.com/wp-content/uploads/2023/04/logo-blanco.png"   
        detalles={detalles_hero}
      />     

      <br />

      <Countdown
        targetDate="2026-07-26T09:00:00"
        titulo="CUENTA REGRESIVA PARA PEDALEANDO EN YURA"
        descripcion="Domina la arena, conquista la montaña… ¡Sé parte de YURA!"
      />

      {/*HABILITAR CUANDO NO SE TENGA LAS INSCRIPCIONES LISTAS, ES UN PROXIMAMENTE*/}
      {/*<Responsib titulo="INSCRIPCIONES PRÓXIMAMENTE" items={proximamente}/>*/}

      {/*HABILITAR CUANDO SE COMPLETE EL SISTEMA DE INSCRIPCION*/}
      <Responsib titulo="MODALIDADES DE INSCRIPCIÓN" items={items_inscripcion} onButtonClick={abrirModal}/>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          resetFormulario();
        }}
      >

        <div className="modal-line"></div>

        <h1>FORMULARIO DE INSCRIPCIÓN</h1>

        <form
          className="inscripcion-form"
          onSubmit={(e) => {

            e.preventDefault();

            finalizarInscripcion();

          }}
        >

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e)=>setApellidos(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e)=>setDni(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Correo"
            value={correo}
            onChange={(e)=>setCorreo(e.target.value)}
            required
          />
          <select
            value={talla}
            onChange={(e) => setTalla(e.target.value)}
            required
          >
            <option value="">Seleccione talla de polo</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>

          <button
            type="submit"
            className="submit-btn"
            disabled={enviando}
          >
            {
              enviando
              ? "ENVIANDO..."
              : "FINALIZAR INSCRIPCIÓN"
            }
          </button>

        </form>

      </Modal>

      {/*
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
      */}
    </>
    
  );
 
}
