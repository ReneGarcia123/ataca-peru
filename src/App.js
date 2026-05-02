import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import Layout from "./Layout";
import Chiguata  from './pages/Chiguata';
import Triatlon from './pages/Triatlon';
import AQP_TRAIL_SILLAR from './pages/AQP_TRAIL_SILLAR';
import UTCC from './pages/UTCC';
import RegistrationPage from './pages/RegistrationPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="chiguata" element={<Chiguata />} />
          <Route path="triatlon" element={<Triatlon />} />
          <Route path="aqp_trail_sillar" element={<AQP_TRAIL_SILLAR />} />
          <Route path="utcc" element={<UTCC />} />
          {/* Rutas de prueba (Eliminables)*/}
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="success" element={<SuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
