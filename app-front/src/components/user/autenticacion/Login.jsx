// import "../styles/App.css";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import imgFav from "../../../../public/favicon.png";
import { RecoveryPassword } from "./RecoveryPassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BtnGoogle } from "./BtnGoogle";
import { useUserData } from "../../../hook/UserDataProvider";

export const Login = ({ setIsLoggedIn, handleCloseModal }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useUserData();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const URL = "http://localhost:3000/login";
      const response = await axios.post(URL, { email, password });
      const { role, name, token } = response.data;

      sessionStorage.setItem("userToken", token);
      sessionStorage.setItem("role", role);
      if (response.status === 200 || response.status === 201) {
        setMessage("Inicio de sesión exitoso");
        setIsLoggedIn(true);
        handleCloseModal();
        setUserData(role);
        console.log('role del usuario en el contexto general:', role)
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setMessage("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.log(error);
      setMessage("¡ Error en el inicio de sesion !");
    }
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <img src={imgFav} className="fav-login" alt="Favicon" />
      <h3 className="text-form">Bienvenido a suministros</h3>
      <BtnGoogle
        handleCloseModal={handleCloseModal}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Form.Label className="txt-form-login">
        Ingresa con tu cuenta de Google
      </Form.Label>
      <div className="contenedor-liner">
        <hr className="liner-separator" />
        <span className="m-1">O</span>
        <hr className="liner-separator" />
      </div>
      <Form.Group className="mb-3 form-login" controlId="formGroupEmail">
        <Form.Label>Dirección de correo electrónico</Form.Label>
        <Form.Control
          className="login-email"
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
      <Button variant="primary" type="submit" className="mt-1">
        Iniciar sesión
      </Button>
      <span>
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
      </span>
    </Form>
  );
};
