// import "../styles/App.css";
import React, { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import imgFav from "../../../../public/favicon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BtnGoogle } from "./Google/BtnGoogle";
import EventEmitter from "../../../hook/EventEmitter";

export const Login = ({
  setIsLoggedIn,
  handleCloseModal,
  handleLoginSuccess,
}) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const emailRefLogin = useRef();

  useEffect(() => {
    const authChangeCallback = (isLoggedIn) => {
      if (isLoggedIn) {
        //  podemos hacer una llamada para los datos del usuario
      }
    };
    const unsubscribe = EventEmitter.subscribe(
      "authChange",
      authChangeCallback
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const recoveryRoute = () => {
    navigate("/suministros/recovery-password");
    handleCloseModal();
  };
  const notifyAuthChange = (isLoggedIn) => {
    EventEmitter.emit("authChange", isLoggedIn);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRefLogin.current?.value;
    const password = event.target.password.value;

    if (email && password) {
      try {
        const URL = "http://localhost:3000/login";
        const response = await axios.post(URL, { email, password });
        const { role, name, token } = response.data;
        const previousLocation = sessionStorage.getItem("previousLocation");

        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("role", role);
        if (response && response.status === 200) {
          handleLoginSuccess("actulizado", true);
          notifyAuthChange(true);
          setMessage("¡ Inicio de sesión con éxito !");
          handleCloseModal();
          handleLoginSuccess("actulaizasdo", true);
          setIsLoggedIn("si se actulizo", true);
          setTimeout(() => {
            setMessage(" ");
          });
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate(previousLocation || "/");
          }
        } else {
          setMessage("¡ Usuario o contraseña incorrectos !");
          setTimeout(() => {
            setMessage(" ");
          }, 3000);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage("¡Usuario o contraseña incorrectos !");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else {
          console.log("error inesperado", error);
        }
      }
    }
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <img src={imgFav} className="fav-login" alt="Favicon" />
      <h3 className="text-form">Bienvenido a suministros</h3>
      <div className="container-btn-google">
        <BtnGoogle
          handleCloseModal={handleCloseModal}
          setIsLoggedIn={setIsLoggedIn}
          handleLoginSuccess={handleLoginSuccess}
        />
      </div>
      <div className="contenedor-liner">
        <hr className="liner-separator" />
        <span className="m-1 o">O</span>
        <hr className="liner-separator" />
      </div>
      <Form.Group className="mb-3 form-login" controlId="formGroupEmail">
        <Form.Control
          className="login-email login-custome mt-2"
          type="email"
          name="email"
          ref={emailRefLogin}
          placeholder="Correo electrónico"
        />
      </Form.Group>
      <Form.Group className="mb-3 form-login" controlId="formGroupPassword">
        <Form.Control
          className="login-custome"
          type="password"
          name="password"
          placeholder="Contraseña"
        />
      </Form.Group>
      <span className="btn-recovery" onClick={recoveryRoute}>
        ¿ Has olvidado tu contraseña ?
      </span>
      <Button variant="primary" type="submit" className="mt-3 btn-submit">
        Iniciar sesión
      </Button>
      <span>
        {setMessage && (
          <p
            className="message-response-server"
            style={{
              color: message.includes("éxito") ? "green" : "red",
              fontSize: "18px",
            }}>
            {message}
          </p>
        )}
      </span>
    </Form>
  );
};
