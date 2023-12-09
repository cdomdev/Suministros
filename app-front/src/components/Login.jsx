import "../styles/App.css";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import imgFav from "../assets/img/favicon.png";
import RecoveryPassword from "./recoveryPassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SaveStorage } from "../helper/SaveStorage";
import { BtnGoogle } from "../auth/BtnGoogle";

export const Login = ({ setIsLoggedIn, handleCloseModal }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const URL = "http://localhost:3000/login";
      const response = await axios.post(URL, { email, password });
      const { role, name, token } = response.data;

      SaveStorage("userToken", token);
      SaveStorage("role", role);
      if (response.status === 200 || response.status === 201) {
        setMessage("Inicio de sesión exitoso");
        setIsLoggedIn(true);
        handleCloseModal();
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setMessage("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setMessage("Ocurrió un error al iniciar sesión");
    }
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <img src={imgFav} className="fav-login" alt="Fav Icon" />
      <h3 className="text-form">Bienvenido a suministros</h3>
      <div className="container-btn-login">
        <BtnGoogle
          handleCloseModal={handleCloseModal}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Form.Label className="txt-form-login">
          Ingresa con tu cuenta de Google
        </Form.Label>
      </div>
      <div className="contenedor-liner">
        <hr style={{ border: "solid black", width: "13em" }} />
        <span style={{ margin: "0 10px" }}>O</span>
        <hr style={{ border: "solid black", width: "13em" }} />
      </div>
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
      {setMessage && (
        <p
          className={`message-response-server ${
            message === "Inicio de sesión exitoso"
              ? "success-message"
              : "error-message"
          }`}>
          {message}
        </p>
      )}
    </Form>
  );
};
