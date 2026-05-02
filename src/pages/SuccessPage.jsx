import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(30); // 'n' cantidad de segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/'); // Redirigir al inicio
    }, 30000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="success-screen">
      <div className="icon-check">✓</div>
      <h1>¡Inscripción Exitosa!</h1>
      <p>Tu pago ha sido procesado correctamente.</p>
      <p className="redirect-text">
        Serás redirigido al inicio en <strong>{seconds}</strong> segundos...
      </p>
    </div>
  );
}