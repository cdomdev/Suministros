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
        <section className="content">
          <Listado
            listadoState={listadoState}
            setListadoState={setListadoState}
          />
        </section>
        <aside className="side-bar">
          <Crear setListadoState={setListadoState} />
          <GuardarProductos
            listadoState={listadoState}
            setListadoState={setListadoState}
          />
        </aside>
      </div>
    </div>
     
    </>
  );
};
