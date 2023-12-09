import { useState } from "react";
import "../../styles/App.css";
import { Buscador } from "../admin/Buscador";
import { Crear } from "../admin/Crear";
import { Listado } from "../admin/Listado";
import { MenuAdmin } from "../admin/NavbarAdmin";
import { GuardarProductos } from "../admin/GuardarProductos";

export const Admin = () => {
  const [listadoState, setListadoState] = useState([]);
  return (
    <>
        <div className="layout">
          <nav className="nav">
            <MenuAdmin />
          </nav>
          <section className="content">
            <Listado
              listadoState={listadoState}
              setListadoState={setListadoState}
            />
          </section>
         
            <aside className="side-bar">
              <Buscador
                listadoState={listadoState}
                setListadoState={setListadoState}
              />
              <Crear setListadoState={setListadoState} />
              <GuardarProductos
                listadoState={listadoState}
                setListadoState={setListadoState}
              />
            </aside>
          
        </div>
    </>
  );
};
