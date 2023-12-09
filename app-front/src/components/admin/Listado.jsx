import React, { useEffect, useState } from "react";
import { Editar } from "./Editar";
import { Button } from "react-bootstrap";

export const Listado = ({ listadoState, setListadoState, setProductoState}) => {
  const [editar, setEditar] = useState(0);

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = () => {
    const storedProductos = JSON.parse(localStorage.getItem("productos"));
    setListadoState(storedProductos);
    return storedProductos;
  };

  const borrarProducto = (id) => {
    // conseguir peliculas almacenadas en el localStorage
    let productosAlmacenadas = getProductos();
    // filtar pelicula para eliminar del array la qu no quiero
    let nuevoListadoProductos = productosAlmacenadas.filter(
      (prodcuto) => prodcuto.id !== id
    );
    // Actulizar estado del listado
    setListadoState(nuevoListadoProductos);
    // Actuliza datos en el localStorage eliminando el producto por su ID
    localStorage.removeItem(`productos${id}`);

    // actulizar datos en el localStorage
    if (nuevoListadoProductos.length === 0) {
      localStorage.removeItem("productos");
    } else {
      localStorage.setItem("productos", JSON.stringify(nuevoListadoProductos));
    }
  };


  return (
    <>
      {listadoState != null ? (
        listadoState.map((producto) => {
          return (
            <article key={producto.id} className="productos-cards">
              {producto.displayImages && (
                <img
                  className="img-productos"
                  src={producto.displayImages}
                  alt="Preview"
                />
              )}
              <span className="title-cards">{producto.title}</span> <br />
              <span className="valor-cards">$: {producto.valor}</span>
              <p className="descripcion">{producto.description}</p>
              <div className="content-btn-card">
                <Button
                  className="btn-custom"
                  onClick={() => {
                    setEditar(producto.id);
                  }}>
                  Editar
                </Button>
                <Button
                  className="btn-custom"
                  variant="primary"
                  onClick={() => borrarProducto(producto.id)}>
                  Borrar
                </Button>
              </div>
              {/* {aparece el fomulario  para editar} */}
              {editar === producto.id && (
                <Editar
                  producto={producto}
                  getProductos={getProductos}
                  setEditar={setEditar}
                  setListadoState={setListadoState}
                />
              )}
            </article>
          );
        })
      ) : (
        <h2>No hay productos para mostrar</h2>
      )}
    </>
  );
};
