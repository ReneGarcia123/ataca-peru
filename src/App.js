import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import Layout from "./Layout";
import TRAIL_DEL_PESCADOR  from './pages/TRAIL_DEL_PESCADOR';
import AQP_TRAIL_SILLAR from './pages/AQP_TRAIL_SILLAR';
import UTCC from './pages/UTCC';
import RegistrationPage from './pages/RegistrationPage';
import SuccessPage from './pages/SuccessPage';
import ALDEAS_INFANTILES from './pages/ALDEAS_INFANTILES';
import AQP_TRS_JOYA from './pages/AQP_TRS_JOYA';
import LSL_MTB_JOYA from './pages/LSL_MTB_JOYA';
import AQP_TRS_CHIGUATA from './pages/AQP_TRS_CHIGUATA';
import CENTAURO_TACNA from './pages/CENTAURO_TACNA';
import BOMBEROS_2026 from './pages/BOMBEROS_2026';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="trail_del_pescador" element={<TRAIL_DEL_PESCADOR />} />
          <Route path="aqp_trs_joya" element={<AQP_TRS_JOYA />} />
          <Route path="aqp_trail_sillar" element={<AQP_TRAIL_SILLAR />} />
          <Route path="utcc" element={<UTCC />} />
          <Route path="aldeas_infantiles" element={<ALDEAS_INFANTILES />} />
          <Route path="bomberos_2026" element={<BOMBEROS_2026 />} />
          <Route path="lsl_mtb_joya" element={<LSL_MTB_JOYA/>}/>
          <Route path="aqp_trs_chiguata" element={<AQP_TRS_CHIGUATA/>}/>
          <Route path="centauro_2026" element={<CENTAURO_TACNA/>}/>
          {/* Rutas de prueba (Eliminables)*/}
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="success" element={<SuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
