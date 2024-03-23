import React, {  useEffect } from "react";
import { Button } from "react-bootstrap";
import { Editar } from "./Editar";

export const Listado = ({
  listadoState,
  setListadoState,
}) => {

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = () => {
    const storedProductos = JSON.parse(localStorage.getItem("productos"));
    setListadoState(storedProductos);
    return storedProductos;
  };

  const borrarProducto = (id) => {
    let productosAlmacenadas = getProductos();
    let nuevoListadoProductos = productosAlmacenadas.filter(
      (producto) => producto.id !== id
    );
    setListadoState([...nuevoListadoProductos]);
    localStorage.removeItem(`productos${id}`);
    if (nuevoListadoProductos.length === 0) {
      localStorage.removeItem("productos");
    } else {
      localStorage.setItem("productos", JSON.stringify(nuevoListadoProductos));
    }
  };

  console.log(listadoState)
  return (
    <>
      {listadoState != null ? (
        listadoState.map((producto, index) => {
          return (
            <article key={producto.id || index} className="container-card">
              <div className="productos-cards">
                {producto.image && <img src={producto.image} alt="Preview" />}
                <div className="details">
                  <span>
                    <strong>Marca: </strong>
                    {producto.title}
                  </span>
                  <span>
                    <strong>Nombre: </strong>
                    {producto.nombre}
                  </span>
                  <span>
                    <strong>Valor: $ </strong>
                    {producto.valor}
                  </span>
                  <span>
                    <strong>Cantidad: </strong>
                    {producto.cantidad}
                  </span>
                  <span>
                    <strong>Referencia: </strong>
                    {producto.referencia}
                  </span>
                  <span>
                    <strong>Categoria: </strong>
                    {producto.categoriaPadre}
                  </span>
                  <span>
                    <strong>Subcategoria: </strong>
                    {producto.categoria}
                  </span>
                  <strong>Descripción:</strong>
                  <p className="description">{producto.description}</p>
                </div>
                <div className="content-btn-card">
                  <Editar
                    producto={producto}
                    setListadoState={setListadoState}
                    getProductos={getProductos}
                  />
                  <Button
                    className="btn-custom"
                    variant="primary"
                    onClick={() => borrarProducto(producto.id)}>
                    Borrar
                  </Button>
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <div className="contendor-alter-products-card d-flex">
          <span className="text-shadow" style={{ margin: "auto" }}>
            Agregue nuevos productos para verlos aquí.
          </span>
        </div>
      )}
    </>
  );
};
