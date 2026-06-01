import React, { useEffect, useRef, useState } from 'react';

const CulqiCheckoutButton = ({
  // Props de Checkout Custom
  publicKey,
  settings,
  client = {},
  options = {},
  appearance = {},
  onSuccess,
  onError,
  
  // Props de Culqi 3DS
  config3DS = null,
  on3DSResult = null,
  on3DSLoading = null,

  // Props visuales del botón
  buttonText = "Pagar",
  className = "",
  disabled = false
}) => {
  const [areScriptsLoaded, setAreScriptsLoaded] = useState(false);
  const checkoutInstance = useRef(null);

  // 1. Cargar dinámicamente ambos scripts
  useEffect(() => {
    if (window.CulqiCheckout && window.Culqi3DS) {
      setAreScriptsLoaded(true);
      return;
    }

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        // Importante: La documentación de 3DS pide 'defer', pero async funciona bien para inyección dinámica
        script.async = true; 
        
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Error al cargar: ${src}`));
        
        document.body.appendChild(script);
      });
    };

    Promise.all([
      loadScript('https://3ds.culqi.com/'), 
      loadScript('https://js.culqi.com/checkout-js')
    ])
      .then(() => setAreScriptsLoaded(true))
      .catch((error) => console.error("No se pudieron cargar las librerías:", error));

  }, []);

  // 2. Inicializar Culqi Checkout y Culqi 3DS
  useEffect(() => {
    if (areScriptsLoaded && window.CulqiCheckout && window.Culqi3DS) {
      
      // ==========================================
      // CONFIGURACIÓN DE CULQI CHECKOUT CUSTOM
      // ==========================================

      /*
       const paymentMethods = {
        tarjeta: true,
        yape: true,
        billetera: true,
        bancaMovil: false,
        agente: false,
        cuotealo: false
      };*/
      /*
      const options = {
        lang: "es",
        installments: true,
        modal: true,
        container: "#culqi-container", // Opcional - Div donde quieres cargar el checkout
        paymentMethods: paymentMethods,
        paymentMethodsSort: Object.keys(paymentMethods) // las opciones se ordenan según se configuren en paymentMethods
      };*/
      const checkoutOptions = {
        lang: "es",
        installments: false,
        modal: true,

        paymentMethods: {
          tarjeta: false,
          yape: true,
          billetera: false,
          bancaMovil: false,
          agente: false,
          cuotealo: false
        },

        paymentMethodsSort: [
          "yape"
        ]
      };

      const config = { 
        settings,
        client,
        options: checkoutOptions,
        appearance
       };
      const culqi = new window.CulqiCheckout(publicKey, config);

      culqi.culqi = () => {
        if (culqi.token) {
          onSuccess && onSuccess({ type: 'token', data: culqi.token });
          culqi.close(); // Cerrar el modal después de obtener el token
        } else if (culqi.order) {
          onSuccess && onSuccess({ type: 'order', data: culqi.order });
        } else if (culqi.error) {
          onError && onError(culqi.error);
        }
      };

      checkoutInstance.current = culqi;

      // ==========================================
      // CONFIGURACIÓN DE CULQI 3DS (V1)
      // ==========================================
      if (config3DS) {
        window.Culqi3DS.publicKey = publicKey;
        
        // Settings requeridos: charge (totalAmount, returnUrl, currency) y card (email)
        window.Culqi3DS.settings = {
          charge: config3DS.charge || {},
          card: config3DS.card || {}
        };

        // Options opcionales (showModal, style, closeModalAction, etc.)
        if (config3DS.options) {
          window.Culqi3DS.options = config3DS.options;
        }
      }
    }
  }, [areScriptsLoaded, publicKey, settings, client, options, appearance, config3DS, onSuccess, onError]);

  // 3. Configurar el Listener para capturar el resultado de 3DS
  useEffect(() => {
    if (!areScriptsLoaded || !on3DSResult) return;

    const handle3DSMessage = (event) => {
      // Por seguridad, siempre validamos que el mensaje provenga de nuestro propio origen
      if (event.origin === window.location.origin) {
        const response = event.data;

        // Manejar Loader personalizado (opcional)
        if (response.loading !== undefined && on3DSLoading) {
          on3DSLoading(response.loading);
        }

        // Manejar éxito en la autenticación 3DS
        if (response.parameters3DS) {
          on3DSResult({ success: true, parameters3DS: response.parameters3DS });
        }

        // Manejar error en la autenticación 3DS
        if (response.error) {
          on3DSResult({ success: false, error: response.error });
        }
      }
    };

    window.addEventListener("message", handle3DSMessage, false);

    return () => {
      window.removeEventListener("message", handle3DSMessage, false);
    };
  }, [areScriptsLoaded, on3DSResult, on3DSLoading]);

  // Manejador del click del botón
  const handleOpenCheckout = () => {
    if (checkoutInstance.current) {
      checkoutInstance.current.open();
    } else {
      console.warn('Las pasarelas aún no están listas.');
    }
  };

  return (
    <button 
      onClick={handleOpenCheckout} 
      disabled={!areScriptsLoaded || disabled}
      className={className}
    >
      {!areScriptsLoaded ? "Cargando..." : buttonText}
    </button>
  );
};

export default CulqiCheckoutButton;