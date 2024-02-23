import React, {  useState } from "react";
import {  Modal } from "react-bootstrap";
import { Login } from "./Login";
import { Register } from "./Register";
import { useLocation } from "react-router-dom";

export const LoginModal = ({ setIsLoggedIn, controlComponent }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const location = useLocation();
 

  const handleShowLoginModal = () => {
    setShowModal(true);
    setIsLoginMode(true);
    sessionStorage.setItem("previousLocation", location.pathname);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowRegisterModal = () => {
    setShowModal(true);
    setIsLoginMode(false);
    sessionStorage.setItem("previousLocation", location.pathname);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleCloseModal();
  };

  const renderContent = () => {
    if (isLoginMode) {
      return (
        <>
          <Login
            setIsLoggedIn={setIsLoggedIn}
            handleCloseModal={handleCloseModal}
            handleLoginSuccess={handleLoginSuccess}
          />
          <span className="btn-alter-modal" onClick={handleShowRegisterModal}>
            Quiero registrarme
          </span>
        </>
      );
    } else {
      return (
        <>
          <Register
            setIsLoggedIn={setIsLoggedIn}
            handleCloseModal={handleCloseModal}
            handleLoginSuccess={handleLoginSuccess}
          />
          <span className="btn-alter-modal" onClick={handleShowLoginModal}>
            Ya tengo una cuenta
          </span>
        </>
      );
    }
  };

  return (
    <>
      {controlComponent(handleShowLoginModal)}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="content-modal-login">
        <Modal.Header closeButton className="btn-close-custom" />
        <Modal.Body>{renderContent()}</Modal.Body>
      </Modal>
    </>
  );
};
