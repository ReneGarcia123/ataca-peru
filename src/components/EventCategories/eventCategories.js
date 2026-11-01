import {
  FaRunning,
  FaDog,
  FaStopwatch,
  FaMedal
} from "react-icons/fa";

const eventCategories = {

  corro_ninos: {

    titulo: "HUELLAS QUE DEJAN AMOR",

    descripcion:
      "¡Únete a la carrera benéfica más emocionante del año!",

    imagen: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/CORRO%20POR%20LOS%20NINOS%202026/perro1.jpg",

    titulo_categorias: "Categorías:",

    categorias: [
      "Damas élite 15 a 34 años",
      "Varones élite 15 a 34 años",
      "Damas máster 35 a 49 años",
      "Varones máster 35 a 49 años",
      "Damas súper máster 50 años a más",
      "Varones súper máster 50 años a más"
    ],

    items: [
      {
        id: 1,
        icon: <FaRunning />,
        title: "6K Pedestre",
        text: "Carrera para competidores solos"
      },
      {
        id: 2,
        icon: <FaStopwatch />,
        title: "Evento Cronometrado",
        text: "Se registrará el tiempo de cada participante"
      },
      {
        id: 3,
        icon: <FaMedal />,
        title: "Premiación",
        text: "Los primeros puestos recibirán reconocimientos"
      }
    ]

  }

};

export default eventCategories;