import React, {useState}from "react";
import { NavAdmin } from "../Nav/NavAdmin";
import { Container } from "react-bootstrap";
import {Listar } from './Listar'
import { Crear } from "./Crear";
import { Eliminar } from "./Eliminar";

export const CategoriaHome = () => {
  const [categorias, setCategoria] = useState([]);

  return (
    <>
      <header>
        <NavAdmin />
      </header>
      <div className="body-category-home">
        <Container className="container-category">
          <section className="section-category">
            <aside className="aside-categroy">
              <div className="container-form-category">
               <Crear setCategoria={setCategoria} categorias={categorias}/>
              </div>
              <div className="delete">
                <Eliminar setCategoria={setCategoria} categorias={categorias}/>
              </div>
            </aside>
            <article>
              <div className="container-list-category">
                <Listar setCategoria={setCategoria} categorias={categorias} />
              </div>
            </article>
          </section>
        </Container>
      </div>
    </>
  );
};
