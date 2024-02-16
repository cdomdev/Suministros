import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

export const Buscador = ({ productos, setProductos, productosOriginales }) => {
  const [busqueda, setBusqueda] = useState("");
  const [noEncontrado, setNoEncontrado] = useState(false);
  const productosOriginalesRef = useRef([]);

  useEffect(() => {
    productosOriginalesRef.current = productosOriginales;
  }, [productosOriginales]);

  const buscarProducto = (e) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);

    const productosEncontrados = productosOriginalesRef.current.filter((producto) =>
      producto.nombre.toLowerCase().includes(valorBusqueda.toLowerCase())
    );

    setProductos(
      valorBusqueda.length > 0 ? productosEncontrados : productosOriginalesRef.current
    );

    setNoEncontrado(productosEncontrados.length === 0 && valorBusqueda.length > 0);
  };

  const mostrarNoEncontrado = () => {
    if (noEncontrado && busqueda.length > 0) {
      return (
        <span className="no-encontrado mb-2" style={{ color: "red", marginTop: '15px'}}>
          No se han encontrado coincidencia
        </span>
      );
    }
    return null;
  };

  return (
    <>
    <div style={{height: '40px'}}>

      <Form>
        <Form.Control
          placeholder="Buscar productos..."
          name="busqueda"
          autoComplete="off"
          onChange={buscarProducto}
          value={busqueda}
          className="mt-2"
          />
      </Form>
      {mostrarNoEncontrado()}

          </div>
    </>
  );
};
