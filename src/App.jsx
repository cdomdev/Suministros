import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavbarComponent from "../src/components/nav/navbarComponent";
import Home from "../src/pages/home";
import Productos from "../src/pages/productos";
import Ofertas from "../src/pages/ofetas";
import Nosotros from "../src/pages/nosotros";
import { Footer } from "./components/footer/footer";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavbarComponent />}>
              <Route index element={<Home />} />
              <Route path="productos" element={<Productos />} />
              <Route path="ofertas" element={<Ofertas />} />
              <Route path="nosotros" element={<Nosotros />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
