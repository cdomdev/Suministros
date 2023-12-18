import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export const GuardarProductos = ({ listadoState, setListadoState }) => {
  const [message, setMessage] = useState("");
  const handleGuardarProducto = async () => {
    try {
    
      const updatedList = listadoState.map((producto) => ({
        ...producto,
        displayImages: undefined,
        image: producto.image, 
      }));
      const response = await axios.post('http://localhost:3000/api/guardarproductos', {
        productos: updatedList 
      });
  
      if (response.status === 200 || response.status === 201) {
        setMessage('Productos guardados con éxito!');
        setListadoState([])
        localStorage.removeItem('productos')
      } else {
        setMessage('Hubo un error al guardar los productos');
      }
    } catch (error) {
      console.error('Error al subir y guardar imágenes:', error);
    }
  };
  
  return (
    <>
      <span style={{ display: "flex", height: "20px", marginLeft: "7em" }}>
        {!listadoState && (
          <p style={{ color: "red", fontSize: "14px" }}>{message}</p>
        )}
      </span>
      <div className="container-btn">
        <Button variant="secondary" onClick={handleGuardarProducto}>
          Guardar productos
        </Button>
      </div>
    </>
  );
};
