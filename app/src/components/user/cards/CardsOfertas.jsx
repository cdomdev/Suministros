import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Accordion, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsDatabaseX } from "react-icons/bs";

export const CardsOfertas = () => {
  const [ofertas, setOfertas] = useState([]);
  const [marcasDisponibles, setMarcasDisponibles] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  const [precioSeleccionado, setPrecioSeleccionado] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:3000/listar/ofertas")
        .then((response) => {
          if (response.status === 200) {
            setOfertas(response.data.ofertas || []);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="filtros"></div>
      <div className="header">
        <div></div>
        <div className="count-products">
          <div className="count">
            <span>{ofertas.length}</span>
          </div>
          <p>Productos</p>
        </div>
      </div>
      {ofertas.length === 0 ? (
        <p>No hay ofertas disponibles</p>
      ) : (
        <div className="contenedor-card">
          {ofertas.map((oferta) => (
            <div key={oferta.id} className="productos-container">
              {oferta.Productos.map((producto) => (
                <ul key={producto.id} className="card-products">
                  <div className="header-car">
                    <li className="descuento">{oferta.descuento}%</li>
                    <li className="ref">REF: {producto.referencia}</li>
                  </div>
                  <img src={producto.image} alt="img" className="image" />
                  <li className="name">{producto.title}</li>
                  <li>{producto.nombre}</li>
                  <li className="valor">$: {producto.valor}</li>
                  <Link to={`/suministros/details/${producto.nombre}`}>
                    <Button onClick={() => navigateDetail(producto)}>
                      Ver producto
                    </Button>
                  </Link>
                </ul>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
