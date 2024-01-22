import React, { useState, useEffect } from "react";
import { NavAdmin } from "../Nav/NavAdmin";
import { Container } from "react-bootstrap";
import { NuevaOferta } from "./NuevaOferta";
import { Listado } from "./Listado";

export const Ofertas = () => {
  const [ofertaListado, setOfertaListado] = useState([]);
  return (
    <>
      <NavAdmin />
      <div className="section-ofertas">
        <h1 className="title-ofertas">Ofertas</h1>
        <Container className="container-section-ofertas">
          <section>
            <Listado
              setOfertaListado={setOfertaListado}
              ofertaListado={ofertaListado}
            />
          </section>
          <aside className="aside-ofertas">
            <NuevaOferta
              setOfertaListado={setOfertaListado}
              ofertaListado={ofertaListado}
            />
          </aside>
        </Container>
      </div>
    </>
  );
};
