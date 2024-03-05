// import "../styles/App.css";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import imgFav from "../../../assets/img/favicon.webp";
import EventEmitter from "../../../hook/EventEmitter";
import { useUser } from "../../../hook";
import { GoogleLogin } from "./Google/GoogleLogin";

export const Login = ({ handleCloseModal, handleLoginSuccess }) => {
  const [message, setMessage] = useState("");
  const emailRefLogin = useRef();
  const navigate = useNavigate();

  const { login, setIsLoggedIn } = useUser();

  useEffect(() => {
    const authChangeCallback = (isLoggedIn) => {
      if (isLoggedIn) {
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
    handleCloseModal();
    navigate("/suministros/recovery-password");
  };

  const notifyAuthChange = (isLoggedIn) => {
    EventEmitter.emit("authChange", isLoggedIn);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email1 = emailRefLogin.current?.value;
    const password = event.target.password.value;

    if (email1 && password) {
      try {
        const URL = "http://localhost:3000/user/login";
        const response = await axios.post(URL, { email1, password });
        const { token } = response.data;

        const { name, email, picture, telefono, direccion } = response.data;
        const dataUserSesion = {
          name: name,
          telefono: telefono,
          direccion: direccion,
          email: email,
          picture: picture || null,
        };

        localStorage.setItem(
          "userOnValidateScesOnline",
          JSON.stringify(dataUserSesion)
        );

        if (response.status === 200) {
          const userData = response.data;
          login(userData);
          notifyAuthChange(true);
          handleLoginSuccess(true);
          setMessage("¡Inicio de sesión exitoso!");
          setTimeout(() => setMessage(""), 2000);
          if (userData.role === "admin") {
            localStorage.setItem("HttpOnlyAdmin", token);
            navigate("/admin");
          } else {
            const previousLocation =
              sessionStorage.getItem("previousLocation") || "/";
            navigate(previousLocation);
          }
        } else {
          setMessage("¡Usuario o contraseña incorrectos!");
          setTimeout(() => setMessage(""), 3000);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage("¡Usuario o contraseña incorrectos!");
          setTimeout(() => setMessage(""), 3000);
        } else {
          console.log("Error inesperado", error);
          setMessage("Error inesperado!");
        }
      }
    }
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <img src={imgFav} className="fav-login" alt="Favicon" />
      <h3 className="text-form">Bienvenido a suministros</h3>
      <GoogleLogin
        handleCloseModal={handleCloseModal}
        setIsLoggedIn={setIsLoggedIn}
        handleLoginSuccess={handleLoginSuccess}
        texto={"Inicar sesion con google"}
      />
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
