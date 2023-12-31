import React, {useState, useEffect} from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

export const ListarCategorias = () => {
  const [categorias, setCategoria] = useState({});

  // listar categorias en el modal
  useEffect(() => {
    // Peticion de la categoria
    axios
      .get("http://localhost:3000/api/obtener/categorias")
      .then((response) => {
        const categoriasObj = {};
        if (response.status === 200 || response.status === 201) {
          response.data.categorias.forEach((categoria) => {
            categoriasObj[categoria.id] = categoria.nombre;
          });
        }
        setCategoria(categoriasObj);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 500 &&
          error.response.data.error
        ) {
          console.error("Error interno del servidor");
        }
        console.log(`Error al obtener las categorias ${error}`);
      });
  }, []);
  return (
    <>
      <div className="lista-categrtorias-modal">
          <h4 className="title-modal-category">Lista de categorias:</h4>
          <Table striped bordered hover size="sm" responsive className="table-category">
            <thead>
              <tr>
                <th className="thead-table-users">Categorias:</th>
              </tr>
            </thead>
            <tbody className="">
              {Object.keys(categorias).map((categoriaId) => (
                <tr key={categoriaId}>
                  <td colSpan="3">{categorias[categoriaId]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
    </>
  );
};
