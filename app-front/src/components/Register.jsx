import "../styles/App.css";
import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { BtnGoogle } from "../auth/BtnGoogle";

export const Register = ({ setIsLoggedIn, handleCloseModal }) => {
  const [message, setMessage] = useState("");

  const nanvigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const URL = "http://localhost:3000/registro";
      const response = await axios.post(URL, values);
      if (response.status === 201) {
        setMessage("Registro exitoso");
        setIsLoggedIn(true);
        handleCloseModal();
        nanvigate("/home");
      } else {
        setMessage("El correo ya está registrado");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error
      ) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Ocurrió un error al registrar el usuario");
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Este campo no puede quedar vacío";
          }
          if (!values.email) {
            errors.email = "Se requiere el correo";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Ingrese una dirección de correo válida";
          }
          if (!values.password) {
            errors.password = "Es necesaria una contraseña";
          } else if (
            !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{1,8}$/.test(values.password)
          ) {
            errors.password =
              "La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener un máximo de 8 caracteres";
          }
          return errors;
        }}
        onSubmit={handleSubmit}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          handleSubmit,
        }) => (
          <Form className="form-register" onSubmit={handleSubmit}>
            <h3 className="text-form">Formulario de registro</h3>
            <div className="container-btn-login">
              <BtnGoogle
                handleCloseModal={handleCloseModal}
                setIsLoggedIn={setIsLoggedIn}
              />
            </div>
            <Form.Label className="txt-form-login">
                Registrate con tu cuenta de Google
              </Form.Label>
            <div className="contenedor-liner">
              <hr style={{ border: "solid black", width: "13em" }} />
              <span style={{ margin: "0 10px" }}>O</span>
              <hr style={{ border: "solid black", width: "13em" }} />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre y apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese un nombre y apellido"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                isInvalid={touched.name && errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Dirección de correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el correo electrónico"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"></Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Regístrame
            </Button>
          </Form>
        )}
      </Formik>
      {message && (
        <p
          className={`message-response-server ${
            message === "Registro exitoso" ? "success-message" : "error-message"
          }`}>
          {message}
        </p>
      )}
    </div>
  );
};
