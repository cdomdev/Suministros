import React, { useState } from "react";
import { CrearPrimary, Eliminar, ListarPrimary } from "./";
import { Layout } from "../layout/Layout";


export const CategoriaHome = () => {
  const [categoriasPriMary, setCategoriasPriMary] = useState([]);

  return (
    <>
      <Layout
        title={"Añadir nuevas categorias"}
        component={
          <div className="categorias">
            <div>
              <CrearPrimary
                setCategoriasPriMary={setCategoriasPriMary}
                categoriasPriMary={categoriasPriMary}
              />
              <Eliminar
                setCategoriasPriMary={setCategoriasPriMary}
                categoriasPriMary={categoriasPriMary}
              />
            </div>
            <div>
              <ListarPrimary
                setCategoriasPriMary={setCategoriasPriMary}
                categoriasPriMary={categoriasPriMary}
              />
            </div>
          </div>
        }
      />
    </>
  );
};
