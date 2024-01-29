import React from "react";
import { NavAdmin } from "../Nav/NavAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
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
    const fetchData = async () => {
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
    };
    fetchData();
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
            <>
              <Card key={producto.id} className="card-products-inventario">
                <div className="contenedor-det-img">
                  <div className="content-img">
                    <Card.Img
                      variant="top"
                      src={producto.image}
                      alt="producto"
                      className="img-productos-inventario"
                    />
                    <span className="nombre">
                      {producto.nombre}
                    </span>
                  </div>
                  <div className="details">
                    <strong>
                      Marca: <span>{producto.title}</span>
                    </strong>
                    <strong>Descripción:</strong>
                    <span>{producto.description}</span>
                    <strong>
                      Precio $: <span>{producto.valor}</span>
                    </strong>
                    <strong>Referencia: {producto.referencia}</strong>
                    <strong>
                      Cantidad en inventario:{" "}
                      <span>
                        {producto.Inventarios.length > 0
                          ? producto.Inventarios[0].cantidad
                          : 0}
                      </span>
                    </strong>
                    <strong>
                      Categoria:{" "}
                      <span>
                        {producto.Categorium?.nombre || "No disponible"}
                      </span>
                    </strong>
                  </div>
                </div>
                <div className="container-btn">
                  <Actualizar
                    productInfo={producto}
                    productId={producto.id}
                    setProductos={setProductos}
                  />
                  <Editar
                    productId={producto.id}
                    currentStock={
                      producto.Inventarios.length > 0
                        ? producto.Inventarios[0].cantidad
                        : 0
                    }
                    onEditInventory={handleEditInventory}
                    setProductos={setProductos}
                  />
                  <Elminar
                    productInfo={producto}
                    productId={producto.id}
                    setProductos={setProductos}
                  />
                </div>
              </Card>
            </>
          ))}
        </Container>
      </div>
    </>
  );
};
