import React, { useEffect, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../../../auth";
import { Modal, Button } from "react-bootstrap";
import { LoginModal } from "../autenticacion/LoginModal";
import { IoPersonSharp } from "react-icons/io5";
import { TfiPackage } from "react-icons/tfi";

export const Pedidos = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [showPedidos, setShowPedidos] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [isLoggedIn]);

  const handleClosePedidos = () => setShowPedidos(false);
  const handleShowPedidos = () => setShowPedidos(true);

  const redirecToPedido = () => {
    if (isAuthenticated()) {
      navigate("/suministros/user/");
    } else {
      handleShowPedidos(true);
    }
  };

  return (
    <div>
      <>
        <BsBoxSeam className="box-pedidos" onClick={redirecToPedido} />
        <span>MIS PEDIDOS</span>
        {!isLoggedIn && (
          <Modal
            show={showPedidos}
            onHide={handleClosePedidos}
            className="modal-pedido">
            <Modal.Header
              closeButton
              style={{ border: "none", padding: "0 10px" }}
            />
            <Modal.Body>
              <h1>Debes inicar sesion par ver tus pedidos</h1>
              <LoginModal
                setIsLoggedIn={setIsLoggedIn}
                controlComponent={(handleShow) => (
                  <Button variant="primary" onClick={handleShow}>
                    Iniciar sesion
                  </Button>
                )}
              />
            </Modal.Body>
          </Modal>
        )}
      </>
    </div>
  );
};
