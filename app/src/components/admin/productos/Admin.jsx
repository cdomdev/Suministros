import { useState } from "react";
import { Crear } from "./Crear";
import { Listado } from "./Listado";
import { GuardarProductos } from "../Guardar/GuardarProductos";
import { RutasAside } from "../aside";

export const Admin = () => {
  const [listadoState, setListadoState] = useState([]);
  return (
    <>
      <div className="body-components-admin">
        <div className="layout-crear-productos">
        <div className="contenedor-rutas">
          <div className="aside-rutas">
            <RutasAside />
          </div>
        </div>
          <section>
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
          </section>
          <section>
            <div className="content">
              <Listado
                listadoState={listadoState}
                setListadoState={setListadoState}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

