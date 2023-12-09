import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const Crear = ({ setListadoState }) => {
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [productState, setProductState] = useState({
    title: "",
    description: "",
    valor: "",
    displayImages: "",
    imagesToSend: "",
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileName(selectedFile ? selectedFile.name : "");

    setProductState({
      ...productState,
      displayImages: URL.createObjectURL(selectedFile),
      imagesToSend: selectedFile,
    });
  };

  const getFormValues = async (e) => {
    e.preventDefault();

    const { title, description, valor, imagesToSend } = productState;

    if (!title || !description || !valor || imagesToSend.length === 0) {
      setMessage("Por favor, complete todos los campos");
      return;
    }

    const formData = new FormData();
    formData.append("files", imagesToSend);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData
      );
      console.log(response.data);

      if (response.status === 200) {
        const { uploadedFiles } = response.data;
        const imageUrls = uploadedFiles.map((file) => file.imageUrl);

        const newProduct = {
          id: uuidv4(),
          title: title,
          description: description,
          valor: valor,
          displayImages: productState.displayImages,
          image: imageUrls[0],
        };
        // hasta aqui va todo bien
        setListadoState((prevListado) => {
          const newListado = prevListado
            ? [...prevListado, newProduct]
            : [newProduct];
          localStorage.setItem("productos", JSON.stringify(newListado));
          return newListado;
        });

        setProductState({
          title: "",
          description: "",
          valor: "",
          displayImages: "",
          imagesToSend: "",
        });

        setMessage("Producto añadido con éxito");
      }
    } catch (error) {
      console.log(`Hubo un error en la solicitud ${error}`);
    }
  };

  return (
    <div className="add">
      <h3 className="text-titles-admin">Añadir productos: </h3>
      <Form onSubmit={getFormValues}>
        <Form.Control
          type="text"
          placeholder="Marca del producto"
          value={productState.title}
          onChange={(e) =>
            setProductState({ ...productState, title: e.target.value })
          }
          minLength={1}
          maxLength={20}
        />
        <Form.Control
          type="number"
          placeholder="Precio del producto"
          value={productState.valor}
          onChange={(e) =>
            setProductState({ ...productState, valor: e.target.value })
          }
          className="mt-2"
          maxLength={30}
          minLength={1}
        />
        {message && <span style={{ color: "red" }}>{message}</span>}
        <label htmlFor="file-upload" className="custom-file-upload">
          <span className="container-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-5 h-5 uploap">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Añadir imagen del producto
          </span>
        </label>
        <br />
        <span>{fileName}</span>
        <input
          id="file-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
          name="imagen"
        />
        <Form.Control
          as="textarea"
          placeholder="Descripcion (Nombre del producto) "
          value={productState.description}
          onChange={(e) =>
            setProductState({ ...productState, description: e.target.value })
          }
          className="mt-3"
        />
        <span className="container-btn">
          <Button
            className="btn btn-custom mt-3"
            variant="primary"
            type="submit">
            Añadir
          </Button>
        </span>
      </Form>
    </div>
  );
};
