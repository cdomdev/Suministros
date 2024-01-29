import React, { useState } from "react";
import { NavAdmin } from "../Nav/NavAdmin";
import { Listar } from "./Listar";
import { Crear } from "./Crear";
import { Eliminar } from "./Eliminar";

export const Subcategorias = () => {
  const [categorias, setCategoria] = useState([]);

  return (
    <>
      <NavAdmin />
      <section className="section-category">
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
