import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
export const Profile = () => {
  const [data, setData] = useState({});
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const local = localStorage.getItem("userOnValidateScesOnline");
    if (local) {
      const localData = JSON.parse(local);
      setData(localData);
    }
  }, []);

  useEffect(() => {
    // validar datos antes de la solcitud
    if (data.email) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:3000/user/profile",
            {
              email: data.email,
            }
          );

          if (response.status === 200) {
            setInfo(response.data.dataUser);
          }
        } catch (error) {
          console.log("Error:", error);
          console.log("Response data:", error.response.data);
        }
      };

      fetchData();
    }
  }, [data.email]);


  return (
    <div className="body-profile">
      <h1>Perfil</h1>
      {info.length > 0 ? (
        <div className="data-user">
          <div className="row info-user">
            <Col xs={6} className="d-flex flex-column">
              <Form.Label>Nombre</Form.Label>
              <span>{info[0].name || "nombre"}</span>
            </Col>
            <Col xs={6} className="d-flex flex-column">
              <Form.Label>Apellidos</Form.Label>
              <span>{info[0].apellido || "Sin apellidos"}</span>
            </Col>
          </div>
          <div className="row info-user">
            <Col xs={6} className="d-flex flex-column">
              <Form.Label>Direcccion</Form.Label>
              <span>
                {info[0].direccion || "Aun no tienes una direccion registrada"}
              </span>
            </Col>
            <Col xs={6} className="d-flex flex-column">
              <Form.Label>Telefono</Form.Label>
              <span>
                {info[0].telefono || "Aun no tienes un telefono registrado"}
              </span>
            </Col>
          </div>
          <div className="row info-user">
            <Col xs={6} className="d-flex flex-column">
              <Form.Label>Correo</Form.Label>
              <span>{info[0].email}</span>
            </Col>
            <Col xs={6} className="mt-4">
              <Link to={"data"}>Editar infromacion</Link>
            </Col>
          </div>
        </div>
      ) : (
        <p>Cargando información...</p>
      )}
    </div>
  );
};
