import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";
import axios from "axios";

export const Eliminar = ({ ofertaId, oferta,  setOfertaListado, ofertaListado }) => {
  const [showModal, setShowModal] = useState(false);
  const [messagedelete, setMessageDelete] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function handleDeleteOferta() {
    axios
      .delete(`http://localhost:3000/api/oferta/${ofertaId}/eliminar`, {
        data: { id: ofertaId },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const updatedOfertas = ofertaListado.filter(
            (oferta) => oferta.id !== ofertaId
          );
          setOfertaListado(updatedOfertas);
          setMessageDelete("Oferta eliminada con éxito");
          setTimeout(() => {
            setMessageDelete("");
            setShowModal(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessageDelete("Hubo un error al eliminar la oferta");
        setTimeout(() => {
          setShowModal(false);
          setMessageDelete("");
        }, 2000);
      });
  }
  
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Eliminar
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="modal-ofertas-delete">
        <Modal.Title className="title-modal-delete">
          Eliminar oferta
        </Modal.Title>
        <div className="body-modal-ofertas-delete">
          <CiWarning className="w-ofertas" />
          <p className="text-delete-oferta">
            Esta seguro de elminar:{" "}
            <strong className="t">{oferta.nombre}</strong>{" "}
          </p>
        </div>
        {setMessageDelete && (
          <p
            style={{
              color: messagedelete.includes("éxito") ? "green" : "red",
              fontWeight: "bold",
              fontSize: "18px",
              margin: "auto",
              height: "20px",
              transition: "color 0.3s, font-size 0.3s",
            }}>
            {messagedelete}
            {""}
          </p>
        )}
        <div className="content-button-ofertas">
          <Button onClick={handleClose} variant="secondary">
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteOferta}>
            Eliminar oferta
          </Button>
        </div>
      </Modal>
    </>
  );
};
