import React from "react";
import { NavAdmin } from "../Nav/NavAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card} from "react-bootstrap";
import { Editar } from "./Editar";
import { Elminar } from "./Eliminar";
import { Actualizar } from "./Actualizar";

export const GestionInventary = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newStock, setNewStock] = useState(0);

  // Solictud de productos a la base de datos
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

  // funcion para modificar la cantidad del producto en inventario
  const handleEditInventory = (productId, currentStock) => {
    setCurrentProduct(productId);
    setNewStock(currentStock);
    setShowModal(true);
  };


  return (
    <>
      <NavAdmin />
      <div className="body-components-inventary">
        <Container className="contenedor-inventario">
          {productos.map((producto) => (
            <Card key={producto.id} className="card-products-inventario">
              <Card.Img
                variant="top"
                src={producto.image}
                alt="producto"
                className="img-productos-inventario"
              />
              <Card.Body>
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text>
                  Descripción: {producto.description}
                  <br />
                  Precio: $: {producto.valor}
                  <br />
                  Referencia: {producto.referencia}
                  <br />
                  Cantidad en inventario:{" "}
                  {producto.Inventarios.length > 0
                    ? producto.Inventarios[0].cantidad
                    : 0}
                  <br />
                  Categoria: {producto.Categorium?.nombre || "No disponible"}
                </Card.Text>
              </Card.Body>
              <div className="container-btn-card-products-inventary">
              <Actualizar productInfo={producto} productId={producto.id}/>
                <Editar
                  productId={producto.id}
                  currentStock={
                    producto.Inventarios.length > 0
                      ? producto.Inventarios[0].cantidad
                      : 0
                  }
                  onEditInventory={handleEditInventory}
                />
                <Elminar productInfo={producto} productId={producto.id}/>
              </div>
            </Card> 
          ))}
        </Container>
      </div>
    </>
  );
};
