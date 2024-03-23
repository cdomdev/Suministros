import React, { useState } from "react";
import { NuevaOferta } from "./NuevaOferta";
import { Listado } from "./Listado";
import { Layout } from "../layout/Layout";

export const Ofertas = () => {
  const [ofertaListado, setOfertaListado] = useState([]);
  return (
    <>
      <Layout
        title={"Agregar nuevas ofertas"}
        component={
          <div className="container-ofertas">
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
          </div>
        }
      />
    </>
  );
};
