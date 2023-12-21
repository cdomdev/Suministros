import React, { useEffect, useState } from "react";
import { Editar } from "./Editar";
import { Button } from "react-bootstrap";

export const Listado = ({
  listadoState,
  setListadoState,
  setProductoState,
}) => {
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
    setListadoState([...nuevoListadoProductos]);
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
            <article key={producto.id} className="container-card">
              <div className=" productos-cards">
                {producto.displayImages && (
                  <img
                    className="img-productos"
                    src={producto.displayImages}
                    alt="Preview"
                  />
                )}
                <div className="container-datail-product-edits">
                  <span className="title-cards">Marca: {producto.title}</span>
                  <span className="valor-cards">
                    {" "}
                    valor: $ {producto.valor}
                  </span>
                  <span className="cantidad">
                    Cantidad: {producto.cantidad}
                  </span>
                  <span className="descripcion">
                    Descripcion: {producto.description}
                  </span>
                  <span> Referencia: {producto.referencia}</span>
                  <span>Categoria: {producto.categoria}</span>
                  <div className="content-btn-card mt-3">
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
                </div>
                {editar === producto.id && (
                  <Editar
                    producto={producto}
                    getProductos={getProductos}
                    setEditar={setEditar}
                    setListadoState={setListadoState}
                  />
                )}
              </div>
            </article>
          );
        })
      ) : (
        <h2 className="text-listar-products-admin">
          No hay productos para mostrar
        </h2>
      )}
    </>
  );
};
