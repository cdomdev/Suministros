import React, { useState } from "react";
import { Listar, Crear, Eliminar} from "./";
import { RutasAside } from "../aside";

export const Subcategorias = () => {
  const [categorias, setCategoria] = useState([]);

  return (
    <>
      <section className="section-category">
        <div className="contenedor-rutas">
          <div className="aside-rutas">
            <RutasAside />
          </div>
        </div>
        <aside>
          <h1>Agrega nuevas subcategorias</h1>
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
