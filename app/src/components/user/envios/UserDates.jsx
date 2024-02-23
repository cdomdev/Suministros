import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { IoIosMedical } from "react-icons/io";
import { Formik } from "formik";
import { useCarShop } from "../../../hook";
import { useNavigate } from "react-router";

export const UserDates = ({ handleClose }) => {
  const [message, setMessage] = useState("");
  const { activeStep, setStep } = useCarShop();
  const navigate = useNavigate();

  const updateStep = () => {
    setStep(activeStep + 1);
  };

  const handleSubmit = async (values) => {
    sessionStorage.setItem("DtUerForEnComp", JSON.stringify(values));
    handleClose();
    updateStep();
    navigate("/suministros/pago");
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
        <p>Los campos marcados con ( * ) son obligatorios</p>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3"></Form.Group>
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
              Por favor ingrese detalles adicionales para esta entrega, como
              conjunto ( Torre, Apto ) barrio ( Nombre del barrio ) localidad
              (Nombre de la localidad).
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
