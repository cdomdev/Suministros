import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Cards } from "../cards/Card";

export const Productos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const filtrarPorCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  console.log(categoriaSeleccionada)
  return (
    <>
      <section>
        <Container>
          <div className="container-productos">
            <h1>VARIEDAD DE PRODUCTOS PARA REMODELAR TUS ESPACIOS</h1>
            <p>
              Aqui encontraras los productos que necesitas para remodelar tus
              espacios, de alta calidad, esteticos y funcionales.
            </p>
            <div className="filtro-categorias">
              <button onClick={() => filtrarPorCategoria("sanitarios")}>espejos</button>
              <button onClick={() => filtrarPorCategoria("espejos")}>espejos</button>
              <button onClick={() => filtrarPorCategoria("pisos")}>piso</button>
              {/* Agrega botones para otras categorías */}
              <button onClick={() => filtrarPorCategoria(null)}>Mostrar Todos</button>
            </div>
            <div className="contanier-cards">
              <Cards categoriaSeleccionada={categoriaSeleccionada} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
