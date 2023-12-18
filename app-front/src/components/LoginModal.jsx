import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import Avatar from "@mui/material/Avatar";

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
          <Login
            setIsLoggedIn={setIsLoggedIn}
            handleCloseModal={handleCloseModal}
          />
          <button className="btn-alter-modal" onClick={handleShowRegisterModal}>
            Quiero registrarme
          </button>
        </>
      );
    } else {
      return (
        <>
          <Register
            setIsLoggedIn={setIsLoggedIn}
            handleCloseModal={handleCloseModal}
          />
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
        className="btn-modal-login">
        <Avatar src="/broken-image.jpg" sx={{ width: 34, height: 34 }} />
      </Button>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="content-modal-login">
        <Modal.Header closeButton className="btn-close-custom"></Modal.Header>
        <Modal.Body>{renderContent()}</Modal.Body>
      </Modal>
    </>
  );
};
