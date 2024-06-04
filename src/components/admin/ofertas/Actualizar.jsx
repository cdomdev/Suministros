import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef } from "react";
import { useNotification } from "../../../hook";
import { NotificationToast } from "../../../utils";
import {API_HOST} from '../../../config/config'

export const Actualizar = ({ ofertaData, ofertaListado, setOfertaListado }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});

  const { setShowToast, setToastMessage, setBgToast } = useNotification();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const nombreRef = useRef(null);
  const descuentoRef = useRef(null);
  const fechaIniRef = useRef(null);
  const fechaFinRef = useRef(null);

  const handleInputChange = (e) => {
    e.preventDefault();

    const nombreUPdate = nombreRef.current.value || ofertaData.nombre;
    const descuentoUpdate = descuentoRef.current.value || ofertaData.descuento;
    const fechaIniUpdate = fechaIniRef.current.value || ofertaData.fecha_inicio;
    const fechaFinUpdate = fechaFinRef.current.value || ofertaData.fecha_fin;

    const updatedValues = {
      nombre: nombreUPdate,
      descuento: descuentoUpdate,
      fecheIni: fechaIniUpdate,
      fechaFin: fechaFinUpdate,
    };
    setUpdatedValues(updatedValues);
    // Actualizar el estado con el nuevo objeto
  };
  const handleUpdate = () => {
    // Realizar la solicitud para actualizar la oferta

    if (ofertaData.id || updatedValues === null || updatedValues.length === 0) {
      setToastMessage("¡No hay datos para actualizar la oferta!");
      setBgToast("danger");
      setShowToast(true);
      return;
    }

    const fechtData = async () => {
      await axios
        .put(`${API_HOST}/api/oferta/${ofertaData.id}/actualizar`, {
          oferta_id: ofertaData.id,
          updatedValues: updatedValues,
        })
        .then((response) => {
          const updatedOferta = response.data.ofertas;
          if (updatedOferta) {
            const updatedList = ofertaListado.map((oferta) =>
              oferta.id === ofertaData.id ? updatedOferta : oferta
            );
            setOfertaListado(updatedList);
            setToastMessage("¡ Se aactulizo una oferta !");
            setBgToast("succes");
            setShowToast(true);
            setTimeout(() => {
              setShowModal(false);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      fechtData();
    };
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
        <NotificationToast text={"Actualizacion de productos"} />
        <Modal.Header closeButton className="header-modal-update">
          <Modal.Title className="title-modal-update">
            Modificar oferta
          </Modal.Title>
        </Modal.Header>
        <p className="text-ofertas">Ingrese los nuevos valores de la oferta</p>
        <div className="body-modal-ofertas-update">
          <Form className="mt-4">
            <Form.Control
              ref={nombreRef}
              type="text"
              placeholder="Nombre de la oferta"
              defaultValue={ofertaData.nombre}
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
              defaultValue={ofertaData.descuento}
              onChange={handleInputChange}
            />
            <Row className="mt-2">
              <Col>
                <Form.Control
                  ref={fechaIniRef}
                  type="date"
                  defaultValue={ofertaData.fecha_inicio}
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
                  defaultValue={ofertaData.fecha_fin}
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
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar oferta
          </Button>
        </div>
      </Modal>
    </>
  );
};
