import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardUser, DashboardAdmin } from "./routes";
import { CarShopProvider } from "./hook/CarShopContext";
import { UserDataProvider } from "./hook/UserDataProvider";

export const App = () => {
  return (
    <>
      <div className="App">
        <UserDataProvider>
          <CarShopProvider>
            <Routes>
              {/* Ruta para el dashboard del usuario normal */}
              <Route path="/*" element={<DashboardUser />} />

              {/* Ruta para el dashboard del administrador */}

              <Route path="/admin/*" element={<DashboardAdmin />} />
            </Routes>
          </CarShopProvider>
        </UserDataProvider>
      </div>
    </>
  );
};
