import { useState } from "react";
import { Crear } from "./Crear";
import { Listado } from "./Listado";
import { GuardarProductos } from "../Guardar/GuardarProductos";
import { Layout } from "../layout/Layout";

export const Admin = () => {
  const [listadoState, setListadoState] = useState([]);
  return (
    <>
      <Layout
        title={"Agregar productos"}
        component={
          <div className="layout-crear-productos">
            <div className="sidebar">
              <aside>
                <Crear setListadoState={setListadoState} />
              </aside>
              <article>
                <GuardarProductos
                  setListadoState={setListadoState}
                  listadoState={listadoState}
                />
              </article>
            </div>
            <div className="content-add-products">
              <div className="content">
                <Listado
                  listadoState={listadoState}
                  setListadoState={setListadoState}
                />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
