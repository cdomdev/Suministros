import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiPersonCircle } from "../components/BipersonCircle";
import { Login } from "../components/Login";
import { Register } from "../components/Register";


export const LoginModal = ({ setIsLoggedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleShowLoginModal = () => {
    setShowModal(true);
    setIsLoginMode(true);
  };

  const handleShowRegisterModal = () => {
    setShowModal(true);
    setIsLoginMode(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderContent = () => {
    if (isLoginMode) {
      return (
        <>
         <Login setIsLoggedIn={setIsLoggedIn} handleCloseModal={handleCloseModal}/>
          <button className="btn-alter-modal" onClick={handleShowRegisterModal}>
            Quiero registrarme
          </button>
        </>
      );
    } else {
      return (
        <>
          <Register />
          <button className="btn-alter-modal" onClick={handleShowLoginModal}>
            Ya tengo una cuenta
          </button>
        </>
      );
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShowLoginModal}
        className="btn-modal-login"
      >
        <BiPersonCircle />
      </Button>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="content-modal-login"
      >
        <Modal.Header closeButton className="btn-close-custom"></Modal.Header>
        <Modal.Body>{renderContent()}</Modal.Body>
        <Modal.Footer className="footer-modal-custom"></Modal.Footer>
      </Modal>
    </>
  );
};
