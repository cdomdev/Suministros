import React, { useState } from "react";
import { CrearPrimary } from "./CrearPrimary";
import { ListarPrimary } from "./ListarPrimary";
import { NavAdmin } from "../../Nav/NavAdmin";
import { RutasAside } from "../../aside";

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
        <div className="categorias">
          <aside>
            <div>
              <CrearPrimary
                setCategoriasPriMary={setCategoriasPriMary}
                categoriasPriMary={categoriasPriMary}
              />
            </div>
            <div className="primary">
              <ListarPrimary
                setCategoriasPriMary={setCategoriasPriMary}
                categoriasPriMary={categoriasPriMary}
              />
            </div>
          </aside>
          <article>
            <div className="delete">
              <p>eliminar</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};
