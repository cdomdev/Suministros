import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

export const DataUserUpdate = () => {
  const [dataSesion, setDataSesion] = useState({});
  const [newDatas, setNewDatas] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dataStorage = localStorage.getItem("userOnValidateScesOnline");
    if (dataStorage) {
      const dataSesion = JSON.parse(dataStorage);
      setDataSesion(dataSesion);
    }
    setIsLoading(false);
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewDatas((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateData = async () => {
    if (!newDatas || newDatas.length === 0) {
      setMessage("No has modificado ningun dato");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }
    // Solcitud para actulizar datos
    try {
      setIsLoading(true);
      const emailSend = dataSesion.email;
      const response = await axios.post(
        "http://localhost:3000/user/profile/update",
        {
          email: emailSend,
          dataUpdate: newDatas,
        }
      );
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
        setMessage("¡ Datos actulizados con exito !");
        sessionStorage.setItem('changeData', true)
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (e) {
      console.log("Error al actulziar datos", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="body-profile">
      <h1>Actualizar informacion</h1>
      <Link to={"/suministros/user/"}>
        <BiArrowBack className="icon" /> Atras
      </Link>
      <div className="data-info">
        {dataSesion !== null ? (
          <Form>
            <Form.Group className="mb-3" controlId="formGrouName">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={dataSesion.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="number"
                name="telefono"
                defaultValue={dataSesion.telefono}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAddress">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                defaultValue={dataSesion.direccion}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        ) : (
          <p> Cargando datos...</p>
        )}
        <div className="box-message">
          {setMessage && (
            <p
              className="message-response-server"
              style={{
                color: message.includes("exito") ? "green" : "red",
                fontSize: "17px",
              }}>
              {message}
            </p>
          )}
        </div>
        <Button onClick={handleUpdateData}>
          {isLoading ? (
            <Spinner animation="border" role="status" size="sm" />
          ) : (
            "Actulizar"
          )}
        </Button>
      </div>
    </div>
  );
};
