import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import { Eliminar } from "./Eliminar";
import { Actualizar } from "./Actualizar";
import { SaveStorage } from "../../../helper/SaveStorage";

export const Listado = () => {
  const [ofertaListado, setOfertaListado] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/listar/ofertas")
      .then((response) => {
        if (response.status === 200) {
          setOfertaListado(response.data.ofertas);
          SaveStorage('ofertas', ofertaListado)
        } else {
          setOfertaListado("No hay ofertas disponibles");
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
        {ofertaListado.map((oferta, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header><strong>{oferta.nombre}</strong></Accordion.Header>
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
                        {producto.title} - {producto.description} - Ref:{" "}
                        {producto.referencia}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="content-buttons-section">
                  <Eliminar ofertaId={oferta.id}  oferta={oferta}/>
                  <Actualizar oferta={oferta} ofertaId={oferta.id} />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};
