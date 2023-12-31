import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { CiWarning } from "react-icons/ci";
import axios from "axios";

export const Elminar = ({ productId, productInfo }) => {
  const [showModal, setShowModal] = useState(false);
  const [messagedelete, setMessageDelete] = useState("");

  //   solcitud para elminar producto seleccionado

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/productos/${productId}/eliminar`, {
        data: {producto_Id: productId },
      })
      .then((responseProducto) => {
        if(responseProducto.status === 200){
            setMessageDelete('Producto y cantidad en inventario eliminados con éxito');
            setTimeout(() =>{
                setShowModal(false)
            }, 3000)
        }
        
      })
      .catch((error) => {
        console.error(error);
        // Actualizar mensaje de error
        setMessageDelete('Hubo un error al eliminar el producto');
      });
  };
 
  return (
    <>
      <Button
        variant="outline-danger"
        className="btn-custome-inventary"
        onClick={() => setShowModal(true)}>
        Eliminar
      </Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        className="modal-delete-inventary">
        <Modal.Header style={{ border: "none" }}>
          <Modal.Title className="title-delete-modal">
            ¡Eliminar producto!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-delete-inventary">
          <CiWarning className="icon-warning-modal-delete" />
          <span className="warning">
            Al eliminar este producto se eliminara la cantidad total en el
            inventario, <br /> si solo desea eliminar cierta cantidad, esa
            operacion la puede hacer modificando el stock en inventario. <br />
            si desea continuar presione <strong> Eliminar producto </strong>
          </span>
          <p className="text-modal-delete">
            ! Esta seguro de quere eliminar {"  "}
            <strong>{productInfo.description}</strong> con una cantidad en  el
            inventario de
            <strong>
              {" "}
              {productInfo.Inventarios[0].cantidad} productos{" "}
            </strong>{" "} !
          </p>
          {setMessageDelete && (
              <p
                style={{
                  color: messagedelete.includes("éxito") ? "green" : "red",
                  fontWeight: "bold",
                  fontSize: "18px",
                  margin: "10px",
                  height: "20px",
                  transition: "color 0.3s, font-size 0.3s",
                }}>
                {messagedelete}
                {""}
              </p>
            )}
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" className="mt-3" onClick={handleDelete}>
            Elimininar productos
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
