import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { BtnGoogle } from "./Google/BtnGoogle";
import { useUser } from "../../../hook/UserDataProvider";

export const Register = ({ handleCloseModal }) => {
  const [message, setMessage] = useState("");
  const nanvigate = useNavigate();
  const { login, setUser, setIsLoggedIn } = useUser();

  const handleSubmit = async (values) => {
    try {
      const URL = "http://localhost:3000/api/register";
      const response = await axios.post(URL, values);
      const previousLocation = sessionStorage.getItem("previousLocation");

      if (response.status === 201) {
        login(response.data);
        setMessage("Registro exitoso");
        setIsLoggedIn(true);
        handleCloseModal();
        nanvigate(previousLocation || "/");
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
        setMessage("¡ Error en el registro, intentelo de nuevo !");
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
            <div className="contenedor-liner">
              <hr className="liner-separator" />
              <span className="m-1">O</span>
              <hr className="liner-separator" />
            </div>
            <Form.Group className="mb-1" controlId="formBasicName">
              <Form.Control
                className="login-custome"
                type="text"
                placeholder="Ingrese su nombre "
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
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Control
                className="login-custome mt-3"
                type="email"
                placeholder="Ingrese su correo electrónico"
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
              <Form.Control
                type="password"
                className="login-custome mt-3"
                placeholder="Ingrese una contraseña"
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
            <Button
              variant="primary"
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}>
              Regístrame
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
        )}
      </Formik>
    </div>
  );
};
