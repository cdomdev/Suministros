import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export const GuardarProductos = ({ listadoState, setListadoState}) => {

  const [messageSave, setMessageSave] = useState('')
  const handleGuardarProducto = async () => {
    try {
      if (listadoState === null) {
        setMessageSave("¡No hay productos para guardar!");
        setTimeout(() => {
          setMessageSave("");
        }, 5000);
        return;
      }

      if (listadoState.length === 0) {
        setMessageSave("¡No hay elementos en la lista para guardar!.");
        setTimeout(() => {
          setMessageSave("");
        }, 2000);
        return;
      }

      const updatedList = listadoState.map((producto) => ({
        ...producto,
        displayImages: undefined,
        image: producto.image,
      }));

      const response = await axios.post(
        "http://localhost:3000/api/guardarproductos",
        {
          productos: updatedList,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessageSave("Productos guardados con éxito!");
        setListadoState([]);
        localStorage.removeItem("productos");
        setTimeout(() => {
          setMessageSave("");
        }, 2000);
      } else {
        setMessageSave("Hubo un error al guardar los productos");
      }
    } catch (error) {
      console.error("Error al subir y guardar imágenes:", error);
    }
  };

  return (
    <>
      
      <div className="container-btn">
        <Button variant="secondary" onClick={handleGuardarProducto}>
          Guardar productos
        </Button>
      </div>

      <span style={{ display: "flex", height: "20px", margin: "auto" }}>
        {messageSave && (
          <p
            style={{
              color: messageSave.includes("éxito") ? "green" : "red",
              fontSize: "20px",
              margin: "auto",
            }}>
            {messageSave}
          </p>
        )}
      </span>
    </>
  );
};
