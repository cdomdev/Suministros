import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsDatabaseX } from "react-icons/bs";

import {
  obtenerMarcasUnicas,
  obtenerSubCategorias,
} from "../../../utils/filtrosDeProductos";

export const CardCategorias = ({ rutaCategoria, nombreCategoria }) => {
  const [categorias, setCategorias] = useState([]);
  const [subCategorias, setSubCategorias] = useState([]);
  const [marcasUnicas, setMarcasUnicas] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [marcaSeleccionada, setMarcasSeleccionada] = useState("");

  const navigate = useNavigate();

  // Solcicitud de lar categorias
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(`http://localhost:3000/categoria-padre/${rutaCategoria}`)
          .then((response) => {
            if (response.status === 200) {
              setCategorias(response.data.productos);
            }
          })
      } catch (e) {
        console.log("Error en el proceso de solicitud ", e);
      }
    };
    fetchData();
  }, []);

  // Extraer las categorias de los productos
  useEffect(() => {
    const marcasUnicas = obtenerMarcasUnicas(categorias);
    const categoriasUnicas = obtenerSubCategorias(categorias);
    setSubCategorias(categoriasUnicas);
    setMarcasUnicas(marcasUnicas);
  }, [categorias]);

  // Navegacion a la pagina de detalles del producto
  function navigateDetail(producto) {
    localStorage.setItem("selectedProduct", JSON.stringify(producto));
    localStorage.setItem("categroyselectedProduct", JSON.stringify(categorias));
    navigate(`/suministros/details/${producto.title}`);
  }
  // Función para manejar cambios de acuerdo a las subcategorias
  const handleCategoriaChange = (subcategoria) => {
    // Verificar si la subcategoría ya está seleccionada
    if (categoriaSeleccionada === subcategoria) {
      // Si está seleccionada, la deseleccionamos
      setCategoriaSeleccionada("");
    } else {
      // Si no está seleccionada, la seleccionamos
      setCategoriaSeleccionada(subcategoria);
    }
  };

  // Función para manejar cambios de acuerdo a las subcategorias
  const handleMarcaChange = (marca) => {
    // Verificar si la marca ya está seleccionada
    if (marcaSeleccionada === marca) {
      // Si está seleccionada, la deseleccionamos
      setMarcasSeleccionada("");
    } else {
      // Si no está seleccionada, la seleccionamos
      setMarcasSeleccionada(marca);
    }
  };

  // Filtrar productos basados en la subcategoría seleccionada
  const productosFiltro = categorias.filter((producto) => {
    const subcategoria =
      !categoriaSeleccionada ||
      producto.Categorium.nombre === categoriaSeleccionada;
    const marca =
      marcaSeleccionada.length === 0 ||
      marcaSeleccionada.includes(producto.title);
    return marca && subcategoria;
  });

  return (
    <>
      <div className="filtros">
        <h2>{nombreCategoria}</h2>
        <span>Filtros*</span>
        <h3>Categorias</h3>
        {subCategorias &&
          subCategorias.map((categoria) => (
            <ul key={categoria}>
              <li>
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
            </ul>
          ))}

        <h3>Marcas</h3>
        {marcasUnicas &&
          marcasUnicas.map((marca) => (
            <ul key={marca}>
              <li>
                <input
                  className="m-2"
                  type="checkbox"
                  id={marca}
                  value={marca}
                  checked={marcaSeleccionada === marca}
                  onChange={(e) => handleMarcaChange(e.target.value)}
                />
                <label htmlFor={marca}>{marca}</label>
              </li>
            </ul>
          ))}
      </div>
      <div className="header" style={{ marginTop: "-2em" }}>
        <div className="count-products">
          <div className="count">
            <p>{categorias.length}</p>
          </div>
          <p>Productos</p>
        </div>
        <div className="filter-form"></div>
      </div>
      <div className="contenedor-card">
        {categorias.length === 0 ? (
          <p>No hay productos </p>
        ) : (
          <>
            {productosFiltro.length === 0 && (
              <div className="empty-filter">
                <BsDatabaseX className="icon" />
                <span>No hay productos</span>
              </div>
            )}
            {productosFiltro.map((producto) => (
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
                    $ {producto.valor}
                    <span className="unidad"> * UN</span>
                  </li>
                </div>
                <Link to={`/suministros/details/${producto.nombre}`}>
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
