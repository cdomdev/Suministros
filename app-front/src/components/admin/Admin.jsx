import { useState } from "react";
import "../../styles/App.css";
import { Crear } from "../admin/Crear";
import { Listado } from "../admin/Listado";
import { GuardarProductos } from "../admin/GuardarProductos";
import { NavAdmin } from "./NavAdmin";

export const Admin = () => {
  const [listadoState, setListadoState] = useState([]);
  return (
    <>
      <div className="body-components-admin">
        <div className="layout">
          <NavAdmin />
          <section className="sidebar">
            <aside>
              <Crear setListadoState={setListadoState} />
            </aside>
            <article>
              <GuardarProductos
                setListadoState={setListadoState}
                listadoState={listadoState}
              />
            </article>
          </section>
          <section className="content">
            <Listado
              listadoState={listadoState}
              setListadoState={setListadoState}
            />
          </section>
        </div>
      </div>
    </>
  );
};
