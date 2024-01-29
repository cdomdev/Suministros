import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useCarShop } from "../../../hook/CarShopContext";
import { IoCartOutline } from "react-icons/io5";
import { NotProduct } from "../buscador/NotProduct";

export const BuscadorPage = () => {
  const [busqueda, setBusqueda] = useState([]);

  useEffect(() => {
    const productosSave = sessionStorage.getItem("searchResultProducts");
    if (productosSave) {
      const productos = JSON.parse(productosSave);
      if (JSON.stringify(productos) !== JSON.stringify(busqueda)) {
        setBusqueda(productos);
      }
    }
  }, [busqueda]);

  setTimeout(() => {
    sessionStorage.removeItem("searchResultProducts");
  }, 1000);
  return (
    <>
      <section>
        <Container>
          <div className="container-productos">
            <h1>Resultados de tu busqueda</h1>
            <div className="contanier-cards">
              {busqueda.length > 0 && (
                <span className="total">{busqueda.length} Productos</span>
              )}
              <Resulatdos busqueda={busqueda} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

const Resulatdos = ({ busqueda }) => {
  const { addToCart } = useCarShop();

  const handleAgregarAlCarrito = (producto) => {
    addToCart({ ...producto, cantidad: 1 });
  };

  return (
    <>
      {busqueda.length === 0 ? (
        <NotProduct />
      ) : (
        <div className="contenedor-card">
          {busqueda.map((producto) => (
            <ul key={producto.id} className="card-products">
              <span className="text-ref">REF: {producto.referencia}</span>
              <img
                src={producto.image}
                alt="not found"
                className="img-products"
              />
              <div className="contenido-card">
                <li className="title">{producto.title}</li>
                <li className="text">{producto.nombre}</li>
                <li className="valor">
                  $ {producto.valor} <span className="unidad"></span>
                </li>
              </div>
              <div className="icons">
                <IoCartOutline
                  className="icon"
                  onClick={() => handleAgregarAlCarrito(producto)}
                />
              </div>
            </ul>
          ))}
        </div>
      )}
    </>
  );
};
