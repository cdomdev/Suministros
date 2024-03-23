import React, { useState, useEffect } from "react";
import axios from "axios";
import { Editar, Actualizar, Elminar } from "./";
import { Form } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { Filtros } from "./Filtros";

export const GestionInventary = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newStock, setNewStock] = useState(0);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [precioSeleccionado, setPrecioSeleccionado] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:3000/api/listar/productos")
          .then((response) => {
            setProductos(response.data.productos);
          })
          .catch((error) => {
            console.error("Error al obtener productos:", error);
          });
      } catch (error) {
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

  const handlePrecioChange = (e) => {
    setPrecioSeleccionado(e.target.value);

    if (e.target.value === "menor-mayor") {
      // Ordenar de menor a mayor
      const productosOrdenados = [...productos].sort(
        (a, b) => parseFloat(a.valor) - parseFloat(b.valor)
      );
      setProductos(productosOrdenados);
    } else if (e.target.value === "mayor-menor") {
      // Ordenar de mayor a menor
      const productosOrdenados = [...productos].sort(
        (a, b) => parseFloat(b.valor) - parseFloat(a.valor)
      );
      setProductos(productosOrdenados);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    return (
      !categoriaSeleccionada ||
      producto.Categorium.nombre.trim() === categoriaSeleccionada
    );
  });

  return (
    <>
      <Layout
        title={"Gestion del inventario"}
        component={
          <div className="body-components-inventary">
            <div className="filtros-content">
              <div className="filtros">
                <Filtros
                  categoriaSeleccionada={categoriaSeleccionada}
                  handlePrecioChange={handlePrecioChange}
                  precioSeleccionado={precioSeleccionado}
                  productos={productos}
                  setCategoriaSeleccionada={setCategoriaSeleccionada}
                />
              </div>
            </div>
            <div className="contenedor-inventario">
              {productos.length === 0 ? (
                <p className="chage-text">Cargadndo...</p>
              ) : (
                <>
                  {productosFiltrados.map((producto) => (
                    <div key={producto.id} className="card-products-inventario">
                      <div className="contenedor-det-img">
                        <div className="content-img">
                          <img
                            variant="top"
                            src={producto.image}
                            alt="producto"
                            className="img-productos-inventario"
                          />
                          <span className="nombre">{producto.nombre}</span>
                        </div>
                        <div className="details">
                          <span>
                            <strong>Marca:</strong>
                            {producto.title}
                          </span>
                          <strong>Descripción:</strong>
                          <p>{producto.description}</p>
                          <span>
                            <strong>Precio $: </strong>
                            {producto.valor.toLocaleString("es-CO")}
                          </span>
                          <span>
                            <strong>Referencia: </strong> {producto.referencia}
                          </span>
                          <span>
                            <strong>Cantidad en inventario: </strong>
                            {producto.Inventarios.length > 0
                              ? producto.Inventarios[0].cantidad
                              : 0}
                          </span>
                          <span>
                            <strong>Categoria: </strong>
                            {producto.categoria_padre.nombre || "No disponible"}
                          </span>
                          <span>
                            <strong>Subcategoria: </strong>
                            {producto.Categorium?.nombre || "No disponible"}
                          </span>
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
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        }
      />
    </>
  );
};
