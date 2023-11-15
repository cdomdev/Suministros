import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import imgFav from "../assets/img/favicon.png";
import Form from "react-bootstrap/Form";
import RecoveryPassword from "../common/recoveryPassword";
import "../styles/App.css";
import Register from "./formRegister";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BiPersonCircle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 16 16"
      {...props}
    >
      <g fill="currentColor">
        <path d="M11 6a3 3 0 1 1-6 0a3 3 0 0 1 6 0z" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        />
      </g>
    </svg>
  );
}
export { BiPersonCircle };



function FormLogin() {

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const URL = "http://localhost:3000/login";
      const response = await axios.post(URL, { email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", response.data.role === 1 ? "1" : "0");
        if (response.data.role === 1) {
          navigate("/Admin");
        } else {
          navigate("/profile");
        }
        setMessage("Inicio de sesión exitoso");
      } else {
        setMessage("");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error
      ) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Usuario o contraseña incorrectos");
      }
    }
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <img src={imgFav} className="fav-login" alt="Fav Icon" />
      <h3 className="text-form">Bienvenido a suministros</h3>
      <Form.Group className="mb-3 form-login" controlId="formGroupEmail">
        <Form.Label>Dirección de correo electrónico</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Email@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3 form-login" controlId="formGroupPassword">
        <Form.Label>Contraseña</Form.Label>
        <RecoveryPassword />
        <Form.Control
          type="password"
          name="password"
          placeholder="Contraseña"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Iniciar sesión
      </Button>
      {message && (
        <p
          className={`message-response-server ${
            message === "Inicio de sesión exitoso"
              ? "success-message"
              : "error-message"
          }`}
        >
          {message}
        </p>
      )}
    </Form>
  );
}

export { FormLogin };

function LoginModal() {
  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowLoginModal = () => {
    setShowModal(true);
    setIsLoginMode(true);
  };

  const handleShowRegisterModal = () => {
    setShowModal(true);
    setIsLoginMode(false);
  };

  const renderContent = () => {
    if (isLoginMode) {
      return (
        <>
          <FormLogin />
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
}

export default LoginModal;
