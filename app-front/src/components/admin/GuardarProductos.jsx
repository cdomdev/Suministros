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
        image: producto.image, // Mantienes solo la URL del servidor
      }));
      console.log(`lista de productos actulizados que van en la solicitud ${updatedList}`)

      console.log(updatedList)
      const response = await axios.post('http://localhost:3000/api/guardarproductos', {
        productos: JSON.stringify(updatedList) 
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log('Productos con URL guardados con éxito');
      } else {
        console.log('Hubo un error al guardar los productos');
      }
    } catch (error) {
      console.error('Error al subir y guardar imágenes:', error);
      setMessage("Error al guardar los productos");
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
