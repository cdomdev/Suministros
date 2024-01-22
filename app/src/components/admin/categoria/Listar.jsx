import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

export const Listar = ({ setCategoria, categorias }) => {
  // listar categorias
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/obtener/categorias")
      .then((response) => {
        const { categorias } = response.data;
        if (response.status === 200) {
          setCategoria(categorias);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }, []);

  return (
    <>
      <div className="lista-categrtorias">
        <h4 className="title-table-category">Lista de categorias:</h4>
        <Table
          striped
          bordered
          hover
          size="sm"
          responsive
          className="table-category">
          <thead>
            <tr>
              <th className="thead-table">Categorias:</th>
            </tr>
          </thead>
          <tbody className="tbody-table-category">
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.nombre}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
