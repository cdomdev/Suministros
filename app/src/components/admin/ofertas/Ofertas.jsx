import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { NuevaOferta } from "./NuevaOferta";
import { Listado } from "./Listado";
import { RutasAside } from "../aside";

export const Ofertas = () => {
  const [ofertaListado, setOfertaListado] = useState([]);
  return (
    <>
      <div className="section-ofertas">
        <div className="contenedor-rutas">
          <div className="aside-rutas">
            <RutasAside />
          </div>
        </div>
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
