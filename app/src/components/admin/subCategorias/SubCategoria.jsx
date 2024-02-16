import React, { useState } from "react";
import { NavAdmin } from "../Nav/NavAdmin";
import { Listar } from "./Listar";
import { Crear } from "./Crear";
import { Eliminar } from "./Eliminar";
import { RutasAside } from "../aside";


export const Subcategorias = () => {
  const [categorias, setCategoria] = useState([]);

  return (
    <>
      <NavAdmin />
      <section className="section-category">
      <div className="contenedor-rutas">
          <div className="aside-rutas">
            <RutasAside />
          </div>
        </div>
        <aside>
          <div className="subcategorias">
            <div>
              <Crear setCategoria={setCategoria} categorias={categorias} />
              <Eliminar setCategoria={setCategoria} categorias={categorias} />
            </div>
            <div>
              <Listar setCategoria={setCategoria} categorias={categorias} />
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};
