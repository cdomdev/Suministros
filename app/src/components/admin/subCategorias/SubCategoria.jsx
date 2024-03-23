import React, { useState } from "react";
import { Listar, Crear, Eliminar } from "./";
import { RutasAside } from "../aside";
import { Layout } from "../layout/Layout";

export const Subcategorias = () => {
  const [categorias, setCategoria] = useState([]);

  return (
    <>
      <Layout
        title={"Agregar nuevas Subcategorias"}
        component={
          <div className="subcategorias">
            <div>
              <Crear setCategoria={setCategoria} categorias={categorias} />
              <Eliminar setCategoria={setCategoria} categorias={categorias} />
            </div>
            <div>
              <Listar setCategoria={setCategoria} categorias={categorias} />
            </div>
          </div>
        }
      />
    </>
  );
};
