import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { DashboardUser, DashboardAdmin } from "./routes";
import { CarShopProvider } from "./hook/CarShopContext";
import { UserDataProvider } from "./hook/UserDataProvider";
import { getTituloFromPath } from "./utils";


export const App = () => {
  const location = useLocation();
  
  useEffect(() => {
    document.title = getTituloFromPath(location.pathname);
  }, [location.pathname]);


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
