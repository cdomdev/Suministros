import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef } from "react";

export const Actualizar = ({ oferta, ofertaId }) => {
  const [showModal, setShowModal] = useState(false);
  const [messageUpdate, setMessageUpdate] = useState("");
  const [updatedValues, setUpdatedValues] = useState({});

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const nombreRef = useRef(null);
  const descuentoRef = useRef(null);
  const fechaIniRef = useRef(null);
  const fechaFinRef = useRef(null);

  const handleInputChange = (e) => {
    e.preventDefault();

    const nombreUPdate = nombreRef.current.value || oferta.nombre;
    const descuentoUpdate = descuentoRef.current.value || oferta.descuento;
    const fechaIniUpdate = fechaIniRef.current.value || oferta.fecha_inicio;
    const fechaFinUpdate = fechaFinRef.current.value || oferta.fecha_fin;

    console.log(nombreUPdate, descuentoUpdate, fechaIniUpdate, fechaFinUpdate);
    const updatedValues = {
      nombre: nombreUPdate,
      descuento: descuentoUpdate,
      fecheIni: fechaIniUpdate,
      fechaFin: fechaFinUpdate,
    };

    console.log(updatedValues);
    setUpdatedValues(updatedValues);
    // Actualizar el estado con el nuevo objeto
  };

  const handleUpdate = () => {
    //  hacer solicitud
    axios
      .put(`http://localhost:3000/api/oferta/${ofertaId}/actualizar`, {
        oferta_id: ofertaId,
        updatedValues: updatedValues,
      })
      .then((response) => {
        console.log(response.data);
        setMessageUpdate("Producto actualizado");
      })
      .catch((error) => {});

    // setShowModal(false);
  };
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Actualizar
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="modal-ofertas-update">
        <Modal.Header closeButton className="header-modal-update">
          <Modal.Title className="title-modal-update">
            Modificar oferta
          </Modal.Title>
        </Modal.Header>
        <p className="text-ofertas">
          Aqui podra modificar valores de la oferta actual <br />( nombre,
          descuento, fechas )
        </p>
        <div className="body-modal-ofertas-update">
          <Form className="mt-4">
            <Form.Control
              ref={nombreRef}
              type="text"
              placeholder="Nombre de la oferta"
              defaultValue={oferta.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
            <Form.Control
              ref={descuentoRef}
              type="number"
              min={1}
              name="descuento"
              max={100}
              placeholder="Porcentaje de descuento"
              className="mt-2"
              defaultValue={oferta.descuento}
              onChange={handleInputChange}
            />
            <Row className="mt-2">
              <Col>
                <Form.Control
                  ref={fechaIniRef}
                  type="date"
                  defaultValue={oferta.fecha_inicio}
                  name="fechaIni"
                  onChange={handleInputChange}
                />
                <Form.Label className="label-date">
                  Fecha inicial de la oferta
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  ref={fechaFinRef}
                  type="date"
                  defaultValue={oferta.fecha_fin}
                  name="fechaFin"
                  onChange={handleInputChange}
                />
                <Form.Label className="label-date">
                  Fecha final de la oferta
                </Form.Label>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="content-button-ofertas">
          <Button variant="secondary" onClick={handleUpdate}>
            Actualizar oferta
          </Button>
        </div>
      </Modal>
    </>
  );
};
