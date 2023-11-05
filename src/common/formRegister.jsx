import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/App.css'

const Register = () => (
  <div>
    <Formik
      initialValues={{ email: "", password: "" , name:""}}
      validate={(values) => {
        const errors = {};
        if(!values.name){
          errors.name = "Este campo no puede quedar vacio"
        }
        if (!values.email) {
          errors.email = "Se requiere el correo";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Ingrese una direccion de correo valida";
        }
        if (!values.password) {
          errors.password = "Es necesaria una contraseña";
        } else if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{1,8}$/.test(values.password)){
          errors.password = "La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener un máximo de 8 caracteres"
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} className='form-register'>
          <h3 className='text-form'>Formulario de registro</h3>
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
            <Form.Label>Direccion de correro electronico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
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
              placeholder="Password"
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
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Registrame
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Register;
