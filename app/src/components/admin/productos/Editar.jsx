import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const Editar = ({ producto, getProductos, setListadoState }) => {
  const [previewImage, setPreviewImage] = useState(producto.displayImages);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setmessage] = useState("");

  useEffect(() => {
    setPreviewImage(producto.displayImages);
  }, [producto]);

  const guardarEdicion = async (e, id) => {
    e.preventDefault();

    const target = e.target;
    const productosAlmacenados = getProductos();
    const indice = productosAlmacenados
      ? productosAlmacenados.findIndex((p) => p.id === id)
      : -1;

    let productoActualizado = {
      id,
      title: target.titulo.value || producto.title,
      valor: parseInt(target.valor.value).toFixed(2) || producto.valor,
      nombre: target.nombre.value || producto.nombre,
      description: target.descripcion.value || producto.description,
      cantidad: target.cantidad.value || producto.cantidad,
      image: selectedImage ? null : producto.image,
      referencia: target.referencia.value || producto.referencia,
      displayImages: selectedImage
        ? URL.createObjectURL(selectedImage)
        : previewImage,
      categoria: producto.categoria,
      categoria_id: producto.categoria_id,
      categoriaPadre: producto.categoriaPadre,
      categoriaPadre_id: producto.categoriaPadre_id
    };

    productosAlmacenados[indice] = productoActualizado;
    localStorage.setItem("productos", JSON.stringify(productosAlmacenados));
    setListadoState((prevListado) =>
      prevListado.map((item) =>
        item.id === productoActualizado.id ? productoActualizado : item
      )
    );
    if (productoActualizado) {
      setmessage("¡Cambios guardados!");
      setTimeout(() => {
        setmessage('')
        setShowModal(false);
      }, 2000);
    }
  };

  return (
    <div className="edit-form">
      <Button
        variant="primary"
        className="btn-custome"
        onClick={() => setShowModal(true)}>
        Editar
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-editar">
          <Form onSubmit={(e) => guardarEdicion(e, producto.id)}>
            <Form.Control
              type="text"
              name="titulo"
              className="titulo-editado "
              defaultValue={producto.title}
            />
          <Form.Label>Cambiar marca del producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              className="titulo-editado "
              defaultValue={producto.nombre}
            />
            <Form.Label>Cambiar nombre del producto</Form.Label>
            <Form.Control
              placeholder="Actualizar precio"
              name="valor"
              defaultValue={producto.valor}
            />
            <Form.Label>Cambiar valor del producto</Form.Label>
            <Form.Control
              placeholder="Actualizar cantidad"
              name="cantidad"
              defaultValue={producto.cantidad}
            />
            <Form.Label>Cambiar catidad del producto</Form.Label>
            <Form.Control
              placeholder="Actualizar referencia"
              name="referencia"
              defaultValue={producto.referencia}
            />
             <Form.Label>Cambiar referencia del producto</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              defaultValue={producto.description}
              className="descripcion-editada "
            />
            <Form.Label>Cambiar descripcion del producto</Form.Label>
            <p className="message">{message}</p>
            <span className="content-btn-card">
              <Button type="submit" className="btn-custom ">
                Guardar
              </Button>
            </span>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
