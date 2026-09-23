import {
  FaRunning,
  FaUsers,
  FaMedal
} from "react-icons/fa";

const eventCategories = {

  corro_ninos: {

    titulo: "HUELLAS QUE DEJAN AMOR",

    descripcion:
      "¡Únete a la carrera benéfica más emocionante del año!",

    imagen: "https://ik.imagekit.io/twn1y7ldf/Nuevo_ATACA/CORRO%20POR%20LOS%20NINOS%202026/1.jpg",

    titulo_categorias: "Categorías:",

    categorias: [
      "Damas élite 18 a 34 años",
      "Varones élite 18 a 34 años",
      "Damas máster 35 a 49 años",
      "Varones máster 35 a 49 años",
      "Damas súper máster 50 años a más",
      "Varones súper máster 50 años a más",
      "Mascotas 2km"
    ],

    items: [
      {
        id: 1,
        icon: <FaRunning />,
        title: "Pedestre",
        text: "Carrera pedestre de pista"
      },
      {
        id: 2,
        icon: <FaUsers />,
        title: "6K y 2K",
        text: "Dos distancias, para competidores como para mascotas"
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