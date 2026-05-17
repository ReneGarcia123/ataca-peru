import React, { useState, setStatus, status } from 'react';
import { useNavigate } from 'react-router-dom';
import CulqiButton from '../components/CulqiCheckoutButton/CulqiButton';

const INSCRIPCION_PRECIOS = {
  "estudiante": 600, // S/ 6.00
  "profesional": 700, // S/ 7.00
  "vip": 800// S/ 8.00
};

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState({ message: '', type: null });
  const [form, setForm] = useState({
    nombre: '', apellido: '', documento: '',
    email: '', telefono: '', genero: '',
    fechaNacimiento: '', equipo: '', tipoInscripcion: 'estudiante'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status.message) {
      setStatus({ message: '', type: null });
    }
  };

  const handleFinalResult = (result) => {
    if (result.success) {
      // Redirigir a pantalla de éxito pasando datos si es necesario
      navigate('/success');
    } else {
      setStatus({ message: result.error, type: 'error' });
    }
  };

  return (
    <div className="registration-container">
      <h2>Formulario de Inscripción</h2>
      
      <form className="grid-form">
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input name="documento" placeholder="DNI o Pasaporte" onChange={handleChange} />
        <input name="email" type="email" placeholder="Correo" onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
        
        <select name="genero" onChange={handleChange}>
          <option value="">Género</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        <input name="fechaNacimiento" type="date" onChange={handleChange} />

        <select name="equipo" onChange={handleChange}>
          <option value="">Selecciona Equipo</option>
          <option value="alfa">Equipo Alfa</option>
          <option value="beta">Equipo Beta</option>
        </select>

        <select name="tipoInscripcion" onChange={handleChange}>
          <option value="estudiante">Estudiante - S/ 6</option>
          <option value="profesional">Profesional - S/ 7</option>
          <option value="vip">VIP - S/ 8</option>
        </select>
      </form>

      <div className="payment-section">
        <p>Total a pagar: <strong>S/ {INSCRIPCION_PRECIOS[form.tipoInscripcion] / 100}</strong></p>
        
        <CulqiButton 
          amount={INSCRIPCION_PRECIOS[form.tipoInscripcion]}
          formData={form} // Pasamos el JSON del formulario
          onResult={handleFinalResult}
          buttonText="Inscribirse"
        />
      </div>
    </div>
  );
}