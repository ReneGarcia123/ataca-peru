export const CULQI_PUBLIC_KEY = process.env.REACT_APP_CULQI_PUBLIC_KEY;
console.log("Culqi Public Key:", CULQI_PUBLIC_KEY);
export const GLOBAL_CONFIG = {
  // Configuración UI Global
  appearance: {
    theme: "default",
    menuType: "sidebar",
    defaultStyle: {
      bannerColor: "#2F2F2F",
      buttonBackground: "#00C9A7",
      priceColor: "#00C9A7"
    }
  },
  // Configuración Global 3DS
  config3DS: {
    options: {
      showModal: true,
      showLoading: true,
      style: { btnColor: "#3c1361", btnTextColor: "#FFFFFF" }
    }
  }
};