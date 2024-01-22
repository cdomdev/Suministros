import { useState } from "react";
import { Crear } from "../Productos/Crear";
import { Listado } from "../productos/Listado";
import { GuardarProductos } from "../Guardar/GuardarProductos";
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
