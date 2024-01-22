import React from "react";
import { BrowserRouter } from "react-router-dom";
import { DashboardUser } from "./routes/DashboardUser";
import { CarShopProvider } from "./hook/CarShopContext";
import { NavCustome } from "./components/user/Nav/NavCustome";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <CarShopProvider>
            <NavCustome/>
            <DashboardUser />
          </CarShopProvider>
        </div>
      </BrowserRouter>
    </>
  );
};
