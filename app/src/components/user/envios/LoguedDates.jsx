import { Form, Button } from "react-bootstrap";
import { IoIosMedical } from "react-icons/io";
import { Formik } from "formik";
import React, { useState } from "react";
import axios from "axios";

export const LoguedDates = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log("datos del usuarios:", values);
    try {
      // const URL = ""; // Agrega la URL de tu endpoint aquí
      // const response = await axios.post(URL, values);
      // if (response.status === 200) {
      //   setMessage("¡Contraseña actualizada con éxito!");
      //   setTimeout(() => {
      //     setMessage("");
      //   }, 2000);
      // }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage("¡Hubo un error al guardar los datos!");
      }
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          direccion: "",
          telefono: "",
          detalles: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.direccion) {
            errors.direccion = "*La dirección es requerida*";
          }
          if (!values.telefono) {
            errors.telefono = "*El teléfono es requerido*";
          }
          return errors;
        }}
        onSubmit={handleSubmit}>
        {(formik) => <FormFormik formik={formik} message={message} />}
      </Formik>
    </>
  );
};

const FormFormik = ({ formik }) => {
  return (
    <>
      <div className="modal-envio">
        <h4>Datos de envío</h4>
        <p>Los campos marcados con (*) son obligatorios</p>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Dirección <IoIosMedical className="icon" />
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su dirección"
              name="direccion"
              value={formik.values.direccion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.direccion && formik.errors.direccion ? (
              <div className="error">{formik.errors.direccion}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Número de teléfono <IoIosMedical className="icon" />
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese su número"
              name="telefono"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.telefono && formik.errors.telefono ? (
              <div className="error">{formik.errors.telefono}</div>
            ) : null}
          </Form.Group>
          <div className="add">
            <span>
              Ingrese detalles adicionales, como conjunto (Torre, Apto), barrio
              (Nombre del barrio), localidad (Nombre de la localidad)
            </span>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                className="mt-3"
                rows={3}
                placeholder="Detalles"
                name="detalles"
                value={formik.values.detalles}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
          </div>
          <Button
            variant="primary"
            type="submit"
            disabled={formik.isSubmitting}>
            Guardar Datos
          </Button>
        </Form>
      </div>
    </>
  );
};
