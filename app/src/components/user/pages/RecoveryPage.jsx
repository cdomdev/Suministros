import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { CiCircleChevRight } from "react-icons/ci";
import { Formik, Field, ErrorMessage } from "formik";
import axios from "axios";

export const RecoveryPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const URL = "http://localhost:3000/update/password";
      const response = await axios.post(URL, values);
      if (response.status === 200) {
        setMessage("¡Contraseña actulizada con éxito!");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(
          "¡El correo ingresado no existe, por favor valide o nuevamente!"
        );
      }
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="container-recovery">
        <Text />
        <Formik
          initialValues={{
            email: "",
            password: "",
            password2: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "El correo es requerido";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
              errors.email = "Ingrese un correo electrónico válido";
            }
            if (!values.password) {
              errors.password = "Se requiere una contraseña";
            }
            if (!values.password2) {
              errors.password2 = "Se requiere confirmar la contraseña";
            } else if (values.password !== values.password2) {
              errors.password2 = "Las contraseñas deben coincidir";
            }
            return errors;
          }}
          onSubmit={handleSubmit}>
          {(formik) => <FormOnFormik formik={formik} message={message} />}
        </Formik>
      </div>
    </>
  );
};

const FormOnFormik = ({ formik, message }) => {
  return (
    <>
      <Form className="form-recovery" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3 form-login">
          <Form.Label className="mt-2">
            Ingrese su correo electrónico
          </Form.Label>
          <Field
            type="email"
            name="email"
            placeholder="Email@example.com"
            className="form-control"
          />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </Form.Group>
        <Form.Group className="mb-3 form-login">
          <Form.Label className="mt-2 pass">
            Ingrese una nueva contraseña
          </Form.Label>
          <Field
            type="password"
            name="password"
            placeholder="*********"
            className="form-control"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-danger"
          />
        </Form.Group>
        <Form.Group className="mb-3 form-login">
          <Form.Label className="mt-2">Confirme la contraseña</Form.Label>
          <Field
            type="password"
            name="password2"
            placeholder="*********"
            className="form-control"
          />
          <ErrorMessage
            name="password2"
            component="div"
            className="text-danger"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="btn-recovery-password"
          disabled={formik.isSubmitting}>
          Restablecer contraseña
        </Button>
        {message && (
          <div
            style={{
              color: message.includes("éxito") ? "green" : "red",
              fontSize: "18px",
              height: "20px",
              padding: "5px",
              marginTop: "20px",
              textAlign: "center",
            }}>
            {message}
          </div>
        )}
      </Form>
    </>
  );
};

 const Text = () => {
  return (
    <>
      <h2 className="text-page-recovery-password">
        Solicitud para restablecer contraseña
      </h2>
      <h3 className="text-recovery-label">
        A continuación encontrará un formulario para restablecer su contraseña,
        por favor siga las indicaciones
      </h3>
      <ul className="list-indications-recovery-password">
        <li>
          <CiCircleChevRight className="check" />
          Ingrese el correo electrónico con el que realizó su registro
        </li>
        <li>
          <CiCircleChevRight className="check" />
          Ingrese una nueva contraseña
        </li>
        <li>
          <CiCircleChevRight className="check" />
          Confirme la contraseña
        </li>
        <li>
          <CiCircleChevRight className="check" />
          La contraseña debe contener al menos una mayúscula, una minúscula, un
          número y tener un máximo de 8 caracteres
        </li>
      </ul>
    </>
  );
};

