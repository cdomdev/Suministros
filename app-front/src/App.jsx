import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Productos from "./pages/productos";
import Ofertas from "./pages/ofertas";
import Nosotros from "./pages/nosotros";
// import AdminDashboard from "./components/adminProfile/adminDashboad";
// import UserProfile from "./components/userProfile/userProfile";
// import ProtectedRoute from "./routes/protectedRoute";
// import DashboardUser from "./routes/dashboradUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="productos" element={<Productos />} />
          <Route path="ofertas" element={<Ofertas />} />
          <Route path="nosotros" element={<Nosotros />} />
          {/* Rutas protegidas */}
         {/* <Route
            path="/"
            element={
              <ProtectedRoute>
                <Route path="dashboardUser" element={<DashboardUser />} />
              </ProtectedRoute>
            }
          /> */}
          {/* Redirigir a la página de inicio de sesión si no está autenticado */}
          <Route
            path="/login"
            element={<Navigate to="/home" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
