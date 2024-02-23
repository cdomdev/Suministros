import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import { Eliminar } from "./Eliminar";
import { Actualizar } from "./Actualizar";

export const Listado = ({ ofertaListado, setOfertaListado }) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/listar/ofertas")
      .then((response) => {
        const { ofertas } = response.data;
        if (response.status === 200) {
          setOfertaListado(ofertas || []);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); 


  return (
    <div className="section-listado-ofertas">
      <h4 className="title-list-ofertas">Ofertas vigentes</h4>
      <Accordion defaultActiveKey="0">
        {ofertaListado.length === 0 ||
        ofertaListado === "No hay ofertas disponibles" ? (
          <p className="ofertas-no-disponibles">No hay ofertas disponibles...</p>
        ) : (
          ofertaListado.map((oferta, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>
                <strong>{oferta.nombre}</strong>
              </Accordion.Header>
              <Accordion.Body>
                <div className="body-ofertas-acordeon">
                  <div className="oferta-informacion">
                    <p className="text-oferta">
                      Descuento:{" "}
                      <strong className="sale">{oferta.descuento}%</strong>
                    </p>
                    <p className="text-oferta">
                      Fecha de inicio: {oferta.fecha_inicio}
                    </p>
                    <p className="text-oferta">
                      Fecha de fin: {oferta.fecha_fin}
                    </p>
                  </div>
                  <div className="productos-de-la-oferta">
                    <h5 className="text-producto-oferta">
                      Productos en la oferta:
                    </h5>
                    <ul>
                      {oferta.Productos.map((producto) => (
                        <li key={producto.id}>
                          {producto.title} - {producto.nombre} - Ref:{" "}
                          {producto.referencia}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="content-buttons-section">
                    <Eliminar
                      ofertaId={oferta.id}
                      oferta={oferta}
                      setOfertaListado={setOfertaListado}
                      ofertaListado={ofertaListado}
                    />
                    <Actualizar
                      ofertaData={oferta}
                      ofertaId={oferta.id}
                      setOfertaListado={setOfertaListado}
                      ofertaListado={ofertaListado}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))
        )}
      </Accordion>
    </div>
  );
};
