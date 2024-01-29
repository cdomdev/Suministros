import React, { useState } from "react";
import { CrearPrimary } from "./CrearPrimary";
import { ListarPrimary } from "./ListarPrimary";
import { NavAdmin } from "../../Nav/NavAdmin";

export const CategoriaHome = () => {
  const [categoriasPriMary, setCategoriasPriMary] = useState([]);

  return (
    <>
      <NavAdmin />
      <section className="section-category">
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
