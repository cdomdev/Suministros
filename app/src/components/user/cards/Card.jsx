import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export const Cards = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [precioSeleccionado, setPrecioSeleccionado] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/listar/productos")
      .then((response) => {
        if (response.status === 200) {
          setProductos(response.data.productos);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  function navigateDetail(producto) {
    localStorage.setItem("selectedProduct", JSON.stringify(producto));
    navigate(`/suministros/details/${producto.description}`);
  }

  const productosFiltrados = productos.filter((producto) => {
    return (
      !categoriaSeleccionada ||
      producto.Categorium.nombre.trim() === categoriaSeleccionada
    );
  });

  return (
    <>
      <div className="filtros">
        <Form.Select
          className="mt-3 f-select"
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          value={categoriaSeleccionada}>
          <option value=''>Categorias</option>
          {[
            ...new Set(productos.map((producto) => producto.Categorium.nombre)),
          ].map((categoria, index) => (
            <option key={index} >{categoria}</option>
          ))}
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          value={precioSeleccionado}
          onChange={handlePrecioChange}>
          <option value="">Recomendado</option>
          <option value="menor-mayor"> De menor precio a mayor precio</option>
          <option value="mayor-menor"> De mayor precio a menor precio</option>
        </Form.Select>
      </div>
      <div className="header">
        <span>{productos.length} Productos</span>
      </div>
      <div className="contenedor-card">
        {productosFiltrados.map((producto) => (
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
                $ {producto.valor} <span className="unidad">* UN</span>
              </li>
            </div>
            <Link to={`/suministros/details/${producto.nombre}`}>
              <Button onClick={() => navigateDetail(producto)}>
                Ver producto
              </Button>
            </Link>
          </ul>
        ))}
      </div>
    </>
  );
};
