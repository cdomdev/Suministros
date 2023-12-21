import React from 'react'
import { NavAdmin } from './NavAdmin'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';

export const GestionInventary = () => {
  const [productos, setProductos] = useState([]);

  
  useEffect(() => {
    // solicitud al servido
    try {
      axios
        .get("http://localhost:3000/api/listar/productos")
        .then((response) => {
          // Manejar la respuesta exitosa
          setProductos(response.data.productos);
        })
        .catch((error) => {
          // Manejar errores en la solicitud
          console.error("Error al obtener productos:", error);
        });
    } catch (error) {
      // Manejar otros errores
      console.error("Error:", error);
    }
  }, []);
  return (
    <>
      <NavAdmin />
      <Container>
        {productos.map((producto) => (
          <Card key={producto.id} style={{ width: "14rem", margin: "1rem" }}>
            <Card.Img
              variant="top"
              src={producto.image}
              alt="producto"
            />
            <Card.Body>
              <Card.Title>{producto.title}</Card.Title>
              <Card.Text>
                Descripción: {producto.description}
                <br />
                Precio: {producto.valor}
                <br />
                Referencia: {producto.referencia}
              </Card.Text>
              <Button variant="primary">Ver detalles</Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
}
