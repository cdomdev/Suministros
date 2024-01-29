import { Form, Button } from "react-bootstrap";
import { IoIosMedical } from "react-icons/io";
import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export const Dates = ({ handleClose }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log("datos del usuarios:", values);
    sessionStorage.setItem("DtUerForEnComp", JSON.stringify(values));
    handleClose();
    navigate("/suministros/pago");
  };

  return (
    <>
      <Formik
        initialValues={{
          nombre: "",
          apellidos: "",
          email: "",
          direccion: "",
          telefono: "",
          detalles: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.nombre) {
            errors.nombre = "*El nombre es requerido*";
          }
          if (!values.direccion) {
            errors.direccion = "*La dirección es requerida*";
          }
          if (!values.email) {
            errors.email = "Este campo es requerido";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Ingrese un correo electrónico válido";
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
            <Form.Label>
              Nombres <IoIosMedical className="icon" />
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese Nombres"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="error">{formik.errors.nombre}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese Apellidos"
              name="apellidos"
              value={formik.values.apellidos}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su correo"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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
