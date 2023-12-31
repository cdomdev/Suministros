import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export const EliminarCategoria = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categorias, setCategoria] = useState({});
  const [deleteMessage, setDeleteMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

 
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

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
  };
  const handleCategoryDelete = async () => {
    try {
      if (!selectedCategoryId) {
        console.error("No se ha seleccionado ninguna categoría para eliminar.");
        return;
      }

      const categoriaId = parseInt(selectedCategoryId);

      const response = await axios.delete(
        `http://localhost:3000/api/categorias/${categoriaId}/eliminar`,
        {
          data: { id: categoriaId },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setDeleteMessage("Categoria eliminada con éxito");
        setTimeout(() => {
          setDeleteMessage("");
        }, 2000);
      } else {
        setDeleteMessage("Error al intentar eliminar la categoría");
        setTimeout(() => {
          setDeleteMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error al intentar eliminar la categoría", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      } else {
        setErrorMessage("Error al intentar eliminar la categoría");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="contendor-category-delete">
        <h4 className="title-modal-category">Eliminar categoria</h4>
        <span className="text-category-warning">
          <strong> Tenga en cuanta lo siguinte: </strong>
          <br />
          Antes de eliminar una categoria asegurece de que esta no tenga
          productos asociados.
          <br />
        </span>
        <p className="text">Selecione la categoria a eliminar:</p>
        <Form.Select className="mt-3" onChange={(e) => handleCategoryChange(e)}>
          <option>Seleccionar categoria</option>
          {Object.keys(categorias).map((categoriaId) => (
            <option key={categoriaId} value={categoriaId}>
              {categorias[categoriaId]}
            </option>
          ))}
        </Form.Select>
        {deleteMessage && (
          <p
            style={{
              color: deleteMessage.includes("éxito") ? "green" : "red",
              fontSize: "18px",
              margin: "auto",
            }}>
            {deleteMessage}
          </p>
        )}
        {errorMessage && (
          <p style={{ color: "red", fontSize: "18px", margin: "auto" }}>
            {errorMessage}
          </p>
        )}
        <div className="mt-5">
          <Button
            variant="danger "
            style={{ float: "right" }}
            onClick={handleCategoryDelete}>
            Eliminar categoría
          </Button>
        </div>
      </div>
    </>
  );
};
