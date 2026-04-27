import React, { useMemo } from 'react';
import CulqiCheckoutButton from './CulqiCheckoutButton'; 
import { CULQI_PUBLIC_KEY, GLOBAL_CONFIG } from './CulqiConfig';
import './CulqiStyles.css'; // Importamos los estilos aquí

const CulqiButton = ({ amount, buttonText = "Pagar ahora", onResult }) => {
  
  const settings = useMemo(() => ({
    title: "Finalizar Compra",
    currency: "PEN",
    amount: amount,
    order: "ord_live_xxxxxxxxxxx",
  }), [amount]);

  const config3DS = useMemo(() => ({
    ...GLOBAL_CONFIG.config3DS,
    charge: {
      totalAmount: amount,
      returnUrl: window.location.origin
    },
    card: { email: "usuario@ejemplo.com" }
  }), [amount]);

  return (
    <CulqiCheckoutButton
      publicKey={CULQI_PUBLIC_KEY}
      settings={settings}
      appearance={GLOBAL_CONFIG.appearance}
      config3DS={config3DS}
      onSuccess={(res) => onResult({ success: true, ...res })}
      onError={(err) => onResult({ success: false, error: err })}
      on3DSResult={(res) => onResult({ success: true, ...res })}
      // Aplicamos la clase CSS definida en CulqiStyles.css
      className="btn-culqi-custom"
      buttonText={buttonText}
    />
  );
};

export default CulqiButton;