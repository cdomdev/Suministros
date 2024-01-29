import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";

export const CrearPrimary = ({setCategoriasPriMary}) => {
  const [categoryName, setCategoryName] = useState("");
  const [messageCategory, setMessageCategory] = useState("");

  const handleCategory = async () => {
    try {
      if (!categoryName) {
        setMessageCategory("¡Ingrese un nombre para la categoría!");
        setTimeout(() => {
          setMessageCategory("");
        }, 1000);
        return;
      }

      const data = { nombre: categoryName };
      const response = await axios.post(
        "http://localhost:3000/api/crear/categoria-primary",
        data
      );

      if (response.status === 200 || response.status === 201) {
        setMessageCategory("¡Categoría agregada con éxito!");
        setCategoriasPriMary(response.data.categoriasPrincipales)
        setTimeout(() => {
          setMessageCategory("");
          setCategoryName("");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessageCategory(
          error.response.data.error ||
            "¡Error en el registro, inténtelo de nuevo!"
        );
      } else {
        setMessageCategory("¡Error en la solicitud!");
        setTimeout(() =>{
            setMessageCategory('')
        }, 1000)
      }
    }
  };
  return (
    <div className="body-category">
      <h2 className="title-add-category">Agregar nueva categoria</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Nombre de la categoría"
        className="mb-3">
        <Form.Control
          type="text"
          placeholder="Agregar categoría"
          className="input-category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </FloatingLabel>
     
      <div>
        <Button variant="primary" onClick={handleCategory}>
          Agregar categoría
        </Button>
      </div>
      <div className="contenedor-message-server">
      {messageCategory && (
        <p
          style={{
            color: messageCategory.includes("éxito") ? "green" : "red",
            fontSize: "18px",
            height: '20px',
            marginTop: '10px'
          }}>
          {messageCategory}
        </p>
      )}
      </div>
     
    </div>
  );
};
