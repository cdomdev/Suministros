import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export const Cards = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [precioSeleccionado, setPrecioSeleccionado] = useState("");
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Creamos un conjunto (Set) para almacenar las categorías únicas
    const categoriasUnicas = new Set();

    // Iteramos sobre los productos para extraer las categorías únicas
    productos.forEach((producto) => {
      categoriasUnicas.add(producto.Categorium.nombre);
    });

    // Convertimos el conjunto a un array para poder utilizarlo en el estado
    const categoriasArray = Array.from(categoriasUnicas);

    // Establecemos las categorías en el estado
    setCategoriasDisponibles(categoriasArray);
  }, [productos]);

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

  // Función para manejar los cambios en la selección de categorías
  const handleCategoriaChange = (categoria) => {
    // Verifica si la categoría ya está seleccionada
    if (categoriaSeleccionada === categoria) {
      // Si la categoría ya está seleccionada, la deselecciona
      setCategoriaSeleccionada("");
    } else {
      // Si la categoría no está seleccionada, la selecciona
      setCategoriaSeleccionada(categoria);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    return (
      !categoriaSeleccionada ||
      producto.Categorium.nombre.trim() === categoriaSeleccionada.trim()
    );
  });

  return (
    <>
      <div className="filtros">
        <h2>Productos</h2>
        <span>
          Filtros*
        </span>
        <h3>Categorias</h3>
        <ul>
          {categoriasDisponibles.map((categoria) => (
            <li key={categoria}>
              <input
                className="m-2"
                type="checkbox"
                id={categoria}
                value={categoria}
                checked={categoriaSeleccionada.includes(categoria)}
                onChange={(e) => handleCategoriaChange(e.target.value)}
              />
              <label htmlFor={categoria}>{categoria}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="header">
        <div className="count-products">
          <div className="count">
            <span>{productos.length}</span>
          </div>
          <p>Productos</p>
        </div>
        <div className="filter-form">
          <p>Filtro por:</p>
          <div>
            <Form.Select
              aria-label="Default select example"
              value={precioSeleccionado}
              onChange={handlePrecioChange}
              className="select">
              <option value="">Seleccione</option>
              <option value="menor-mayor">
                De menor precio a mayor precio
              </option>
              <option value="mayor-menor">
                De mayor precio a menor precio
              </option>
            </Form.Select>
          </div>
        </div>
        {/* <div className="mobile-select">
          <Form.Select
            aria-label="Default select example"
            value={categoriaSeleccionada}
            onChange={handleSelectChange}
            className="select-mobile">
            <option value="">Todas las marcas</option>
            {marcasDisponibles.map((marca, index) => (
              <option key={index} value={marca}>
                {marca}
              </option>
            ))}
          </Form.Select>
        </div> */}
      </div>
      <div className="contenedor-card">
        {productosFiltrados.map((producto) => (
          <ul key={producto.id} className="card-products">
            <Link to={`/suministros/details/${producto.nombre}`}>
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
