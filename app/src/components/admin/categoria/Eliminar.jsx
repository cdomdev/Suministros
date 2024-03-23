import React, { useState} from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export const Eliminar = ({ setCategoriasPriMary, categoriasPriMary  }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
  };
  const handleCategoryDelete = async () => {
    try {
      if (!selectedCategoryId) {
        setDeleteMessage(
          "¡No se ha seleccionado ninguna categoría para eliminar!."
        );
        setTimeout(() => {
          setDeleteMessage("");
        }, 1000);
        return;
      }
      const categoriaId = parseInt(selectedCategoryId);

      const response = await axios.delete(
        `http://localhost:3000/api/delete/${categoriaId}/categorias-primary`,
        {
          data: { categoriaId },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setDeleteMessage("¡Categoria eliminada con éxito!");
        setCategoriasPriMary(response.data.categorias)
        setTimeout(() => {
          setDeleteMessage("");
        }, 2000);
      } else {
        setDeleteMessage("¡Error al intentar eliminar la categoría!");
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
        setErrorMessage("¡Error al intentar eliminar la categoría!");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="contenedor-category-delete">
        <h4 className="title-delete-category">Eliminar categoria:</h4>
        <p className="text">
          Antes de eliminar una categoria, asegurece que no tenga productos
          asociados.
          <br />
          <br />
        </p>
        <p className="text">Selecione la categoria a eliminar:</p>
        <Form.Select className="mt-3" onChange={(e) => handleCategoryChange(e)}>
          <option>Seleccionar categoría</option>
          {categoriasPriMary.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </Form.Select>
        <div className="contenedor-message-server">
          {deleteMessage && (
            <p
              style={{
                color: deleteMessage.includes("éxito") ? "green" : "red",
                fontSize: "17px",
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
        </div>

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
