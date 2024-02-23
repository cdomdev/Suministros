import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export const Profile = () => {
  const [data, setData] = useState({});
 
  return (
    <div className="body-profile">
      <h1>Perfil</h1>
      <div className="data-user">
        <div className="row">
          <Col xs={6}>
            <Form.Label>Nombre</Form.Label>
            <span></span>
          </Col>
          <Col xs={6}>
            <Form.Label>Apellidos</Form.Label>
            <span></span>
          </Col>
        </div>
        <div className="row">
          <Col xs={6}>
            <Form.Label>Direcccion</Form.Label>
            <span></span>
          </Col>
          <Col xs={6}>
            <Form.Label>Telefono</Form.Label>
            <span></span>
          </Col>
        </div>
        <div className="row">
          <Col xs={6}>
            <Form.Label>Correo</Form.Label>
            <span></span>
          </Col>
          <Col xs={6} className="mt-4">
            <Link to={'data'}>Editar infromacion</Link> 
          </Col>
        </div>
      </div>
    </div>
  );
};
