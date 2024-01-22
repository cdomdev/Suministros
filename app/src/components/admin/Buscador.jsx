import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const Buscador = ({ listadoState, setListadoState }) => {
  const [busqueda, setBusqueda] = useState("");
  const [noEncontrado, setNoEncontrado] = useState(false);

  const buscarProducto = (e) => {
    // crear estado y actulizarlo
    setBusqueda(e.target.value);

    // filtar para buscar coincidencias
    let productosEncontrados = listadoState.filter((producto) => {
      return producto.title
        .toLowerCase()
        .includes(busqueda.toLocaleLowerCase());
    });

    // comprobar si hay resultados
    // dar valor que esta en el localStorage
    if (busqueda.length <= 1) {
      productosEncontrados = JSON.parse(localStorage.getItem("productos"));
      setNoEncontrado(true);
    } else {
      setNoEncontrado(false);
    }

    // actulizar estado del listado principal con lo que logrado filtrar

    setListadoState(productosEncontrados);
  };
  return (
    <div className="buscador">
      <h3 className="text-titles-admin">Buscar producto</h3>
      {noEncontrado == true && busqueda.length > 1 && (
        <span className="no-encontrado mb-2" style={{color: 'red'}}>
          No se ha encontrado ninguna coincidencia
        </span>
      )}
      <Form>
        <Form.Control
          placeholder="Buscar productos..."
          name="busqueda"
          autoComplete="off"
          onChange={buscarProducto}
          className="mt-2"
        />
      </Form>
      <span className="container-btn">
        <Button className="btn btn-custom mt-3">Buscar</Button>
      </span>
    </div>
  );
};
