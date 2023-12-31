import React, { useState, useEffect } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import { Button, Form, Modal, Table } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { ListarCategorias } from "./ListarCategorias";
import { EliminarCategoria } from "./EliminarCategoria";

export const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [messageCategory, setMessageCategory] = useState("");

  // Control del estado del modal
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCategory = async () => {
    try {
      if (!categoryName) {
        setMessageCategory("Por favor, ingrese un nombre para la categoría");
        setTimeout(() => {
          setMessageCategory("");
        }, 3000);
        return;
      }

      const data = { nombre: categoryName };
      const response = await axios.post(
        "http://localhost:3000/api/crear/categoria",
        data
      );

      if (response.status === 200 || response.status === 201) {
        setMessageCategory("Categoría agregada con éxito");
        setTimeout(() => {
          setMessageCategory("");
          setCategoryName("");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessageCategory(
          error.response.data.error ||
            "¡Error en el registro, inténtelo de nuevo!"
        );
      } else {
        setMessageCategory("¡Error en la solicitud!");
      }
    }
  };

  return (
    <>
      <div className="box-rutas-admin" onClick={handleShow}>
        <MdAssignmentAdd className="icon-box" style={{ color: "#213C65" }} />
        <div className="text-primiry-box-rutas">
          <p className="text-box-routes">Categorías</p>
          <span className="span-box-rutas">
            Ver / Eliminar/ Agregar categoria{" "}
          </span>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="modal-category">
        <Modal.Header closeButton className="header-modal-category">
          <Modal.Title className="title-modal-category">
            Agregar Categoría
          </Modal.Title>
        </Modal.Header>
        <div className="body-modal-category">
          <FloatingLabel
            controlId="floatingInput"
            label="Nombre de la categoría"
            className="mb-3">
            <Form.Control
              type="text"
              placeholder="Agregar categoría"
              className="input-category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </FloatingLabel>
          {messageCategory && (
            <p
              style={{
                color: messageCategory.includes("éxito") ? "green" : "red",
                fontSize: "18px",
                margin: "auto",
              }}>
              {messageCategory}
            </p>
          )}
        </div>
        <Modal.Footer className="footer-modal-category">
          <Button variant="primary" onClick={handleCategory}>
            Agregar categoría
          </Button>
        </Modal.Footer>
        <hr />
        {/* compoennte de elimanr categorias */}
        <EliminarCategoria />
        {/* lista de categorias */}
        <hr />
        <ListarCategorias />
      </Modal>
    </>
  );
};
