import React, { useState } from "react";
import { CrearPrimary,  Eliminar, ListarPrimary } from "./";
import { RutasAside } from "../aside";

export const CategoriaHome = () => {
  const [categoriasPriMary, setCategoriasPriMary] = useState([]);

  return (
    <>
      <section className="section-category">
        <div className="contenedor-rutas">
          <div className="aside-rutas">
            <RutasAside />
          </div>
        </div>
        <aside>
          <h1>Agrega nuevas categorias</h1>
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
        </aside>
      </section>
    </>
  );
};
