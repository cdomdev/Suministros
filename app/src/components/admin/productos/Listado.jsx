import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Editar } from "./Editar";

export const Listado = ({
  listadoState,
  setListadoState,
  setProductoState,
}) => {
  const [editar, setEditar] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleEditar = (producto) => {
    setEditar(producto.id);
    setSelectedProduct(producto);
  };

  const handleCloseModal = () => {
    setEditar(0);
    setSelectedProduct(null);
  };

  return (
    <>
      {listadoState != null ? (
        listadoState.map((producto) => {
          return (
            <article key={producto.id} className="container-card">
              <div className="productos-cards-listar">
                {producto.image && (
                  <img
                    className="img-productos"
                    src={producto.image}
                    alt="Preview"
                  />
                )}
                <div className="container-datail-product-edits">
                  <span className="title-cards">Marca: {producto.title}</span>
                  <span className="title-cards">Nombre: {producto.nombre}</span>
                  <span className="valor-cards">Valor: $ {producto.valor}</span>
                  <span className="cantidad">
                    Cantidad: {producto.cantidad}
                  </span>
                  <span className="descripcion">
                    Descripcion: {producto.description}
                  </span>
                  <span> Referencia: {producto.referencia}</span>
                  <span>Categoria: {producto.categoria}</span>
                </div>
                <div className="content-btn-card">
                  <Button
                    className="btn-custom"
                    onClick={() => handleEditar(producto)}>
                    Editar
                  </Button>
                  <Button
                    className="btn-custom"
                    variant="primary"
                    onClick={() => borrarProducto(producto.id)}>
                    Borrar
                  </Button>
                </div>
                {editar === producto.id && (
                  <Modal
                    show={editar === producto.id}
                    onHide={handleCloseModal}
                    className="modal-editar">
                    <Modal.Header closeButton style={{ border: "none" }}>
                      <Modal.Title>Editar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body-editar">
                      <Editar
                        producto={selectedProduct}
                        getProductos={getProductos}
                        setEditar={setEditar}
                        setListadoState={setListadoState}
                      />
                    </Modal.Body>
                  </Modal>
                )}
              </div>
            </article>
          );
        })
      ) : (
        <div className="contendor-alter-products-card d-flex" >
          <span className="text-shadow"style={{margin: 'auto'}}>
            Agregue nuevos productos para verlos aquí.
          </span>
        </div>
      )}
    </>
  );
};
