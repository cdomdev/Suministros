import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export const Editar = ({ productId, currentStock, onEditInventory, setProductos }) => {
  const [showModal, setShowModal] = useState(false);
  const [newStock, setNewStock] = useState(currentStock);
  const [messageUpdate, setMessageUpdate] = useState("");

  const handleSaveChanges = () => {
    if (!isNaN(newStock) && newStock.trim() !== "") {
      const updatedStock = parseInt(newStock);
      axios
        .put(`http://localhost:3000/api/productos/${productId}/inventario`, {
          producto_Id: productId,
          newStock: updatedStock,
        })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setProductos(response.data.inventaryUpdate)
            setMessageUpdate("Inventario actualizado con exito");
            onEditInventory(productId, newStock);
            setTimeout(() => {
              setShowModal(false);
              setMessageUpdate("");
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response.status === 400 || error.response.status === 500) {
            setMessageUpdate("Hubo un problema al actulizar el inventario");
            setTimeout(() => {
              setMessageUpdate("");
            }, 2000);
          }
          console.error("Error al actulizar el inventario", error);
        });
    } else {
      setMessageUpdate(
        "Ingrese un valor válido para la cantidad en inventario."
      );
      setTimeout(() => {
        setMessageUpdate("");
      }, 3000);
    }
  };

  return (
    <>
      <Button
        variant="outline-primary"
        className="btn-custome-inventary"
        onClick={() => setShowModal(true)}>
        Actualizar Stock
      </Button>
      
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-edit-inventary">
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title>Editar stock</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-editar-inventary">
          <p className="text-modal-inventary">
            En esta seccion podra modificar la cantidad en stock del producto
            seleccionado.
          </p>
          <br />
          <span className="text-recorderi ">
            <strong style={{ color: "orange" }}>¡A tener en cuenta! </strong>
            esto solo modifica la cantidad del producto, si desea eliminarlo
            valla a la parte de elimiar producto.
          </span>
          <br />
          <p className="text-modal ">
            Ingrese la nueva cantidad en inventario:
          </p>
          <Form.Control
            className="mt-3"
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
          {setMessageUpdate && (
            <span
              style={{
                color: messageUpdate.includes("exito") ? "green" : "red",
                fontWeight: "bold",
                fontSize: "18px",
                margin: "10px",
                height: "20px",
                transition: "color 0.3s, font-size 0.3s",
              }}>
              {messageUpdate}
            </span>
          )}
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
