import React, { useMemo, useState } from 'react';
import CulqiCheckoutButton from './CulqiCheckoutButton';
import { CULQI_PUBLIC_KEY, GLOBAL_CONFIG } from './CulqiConfig';

const CulqiButton = ({ amount, formData, onResult, buttonText = "Pagar" }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processPaymentWithAPI = async (culqiResponse) => {
    setIsProcessing(true);
    
    // Configuración del Timeout (10 segundos)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const payload = {
        token: culqiResponse.data.id,
        user_info: formData,
        amount: amount
      };

      const response = await fetch(process.env.REACT_APP_CULQI_BACKEND_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal // Conectamos el controlador a la petición
      });

      clearTimeout(timeoutId); // Limpiamos el timer si responde a tiempo
      const result = await response.json();

      if (response.ok) {
        onResult({ success: true, apiData: result });
      } else {
        onResult({ success: false, error: result.message || 'Error en la validación' });
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        onResult({ success: false, error: 'Tiempo de respuesta agotado. Por favor, verifica tu conexión o intenta más tarde.' });
      } else {
        onResult({ success: false, error: 'No se pudo conectar con el servidor.' });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <CulqiCheckoutButton
      publicKey={CULQI_PUBLIC_KEY}
      settings={{ title: "Registro", currency: "PEN", amount }}
      appearance={GLOBAL_CONFIG.appearance}
      onSuccess={processPaymentWithAPI}
      onError={(err) => onResult({ success: false, error: err.user_message })}
      className="btn-culqi-custom"
      disabled={isProcessing}
      buttonText={isProcessing ? "Validando..." : buttonText}
    />
  );
};

export default CulqiButton;