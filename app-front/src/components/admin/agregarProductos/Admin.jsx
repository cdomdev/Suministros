import { useState } from "react";
import { Crear } from "../agregarProductos/Crear";
import { Listado } from "../agregarProductos/Listado";
import { GuardarProductos } from "../GuardarProductos/GuardarProductos";
import { NavAdmin } from "../Nav/NavAdmin";

export const Admin = () => {
  const [listadoState, setListadoState] = useState([]);
  return (
    <>
      <div className="body-components-admin">
        <div className="layout-crear-productos">
          <NavAdmin />
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
          <section >
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
