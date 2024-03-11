import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Accordion, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsDatabaseX } from "react-icons/bs";

export const CardPegantes = () => {
  const [productos, setProductos] = useState([]);
  const [marcasDisponibles, setMarcasDisponibles] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  const [precioSeleccionado, setPrecioSeleccionado] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/categorias/pegantes")
      .then((response) => {
        if (response.status === 200) {
          setProductos(response.data.categoria.Productos);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Extraer marcas únicas de los productos
    const marcasUnicas = [
      ...new Set(productos.map((producto) => producto.title)),
    ];
    setMarcasDisponibles(marcasUnicas);
  }, [productos]);

  // Función para manejar cambios en la marca seleccionada en moile
  const handleMarcaChangeMobile = (e) => {
    // Obtenemos el valor de la marca seleccionada del evento
    const marcaSeleccionada = e.target.value;

    // Verificar si la marca ya está seleccionada
    if (marcasSeleccionadas.includes(marcaSeleccionada)) {
      // Si está seleccionada, la eliminamos del estado de marcas seleccionadas
      setMarcasSeleccionadas(
        marcasSeleccionadas.filter((m) => m !== marcaSeleccionada)
      );
    } else {
      // Si no está seleccionada, la agregamos al estado de marcas seleccionadas
      setMarcasSeleccionadas([...marcasSeleccionadas, marcaSeleccionada]);
    }
  };

  // Función para manejar cambios en las marcas seleccionadas
  const handleMarcaChange = (marca) => {
    // Verificar si la marca ya está seleccionada
    if (marcasSeleccionadas.includes(marca)) {
      // Si está seleccionada, la eliminamos del estado de marcas seleccionadas
      setMarcasSeleccionadas(marcasSeleccionadas.filter((m) => m !== marca));
    } else {
      // Si no está seleccionada, la agregamos al estado de marcas seleccionadas
      setMarcasSeleccionadas([...marcasSeleccionadas, marca]);
    }
  };

  function navigateDetail(producto) {
    localStorage.setItem("selectedProduct", JSON.stringify(producto));
    localStorage.setItem("categroyselectedProduct", JSON.stringify(productos));
    navigate(`/suministros/details/${producto.description}`);
  }

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

  const handleSelectChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };
  const productosFiltrados = productos.filter((producto) => {
    const categoriaPass =
      !categoriaSeleccionada || producto.title === categoriaSeleccionada;
    const marcaPass =
      marcasSeleccionadas.length === 0 ||
      marcasSeleccionadas.includes(producto.title);
    return categoriaPass && marcaPass;
  });

  return (
    <>
      <div className="filtros">
        <h2>Pegantes ceramicos</h2>
        <span>Filtros*</span>
        <h3>Marca</h3>
        {marcasDisponibles.length === 0 ? (
          <p>No hay marcas para filtrar</p>
        ) : (
          <>
            {marcasDisponibles.map((marca) => (
              <ul key={marca}>
                <li>
                  <input
                    className="m-2"
                    type="checkbox"
                    id={marca}
                    value={marca}
                    checked={marcasSeleccionadas.includes(marca)}
                    onChange={(e) => handleMarcaChange(e.target.value)}
                  />
                  <label htmlFor={marca}>{marca}</label>
                </li>
              </ul>
            ))}
          </>
        )}
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
        <div className="mobile-select">
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
        </div>
      </div>
      <div className="contenedor-card">
        {productos.length === 0 ? (
          <p>No hay productos disponibles...</p>
        ) : (
          <>
            {productosFiltrados.length === 0 && (
              <span className="empty-filter">
                <BsDatabaseX className="icon" /> <br />
                No hay productos
              </span>
            )}
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
                      $ {producto.valor}
                      <span className="unidad">
                        * M <span className="number">2</span>
                      </span>
                    </li>
                  </div>
                  <Button onClick={() => navigateDetail(producto)}>
                    Ver producto
                  </Button>
                </Link>
              </ul>
            ))}
          </>
        )}
      </div>
    </>
  );
};
