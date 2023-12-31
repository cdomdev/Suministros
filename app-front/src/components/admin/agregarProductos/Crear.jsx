import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const Crear = ({ setListadoState, listadoState }) => {
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [categorias, setCategoria] = useState({});
  const [selectedCategoria, setSelectedCategoria] = useState("");

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
          setCategoria(categoriasObj);
        }
      })
      .catch((e) => {
        if (
          error.response &&
          error.response.status === 500 &&
          error.response.data.error
        ) {
          console.error("Error interno del servidor");
        }
        console.log(`Error al obtener las categorias ${e}`);
      });
  }, []);

  const [productState, setProductState] = useState({
    title: "",
    description: "",
    valor: "",
    displayImages: "",
    cantidad: "",
    referencia: "",
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

  const handleCategoriaChange = (event) => {
    setSelectedCategoria(event.target.value);
  };
  const getFormValues = async (e) => {
    e.preventDefault();

    const { title, description, valor, cantidad, referencia, imagesToSend } =
      productState;

    if (
      !title ||
      !description ||
      !valor ||
      !cantidad ||
      !referencia ||
      imagesToSend.length === 0
    ) {
      setMessage("¡Por favor, complete todos los campos!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    const formData = new FormData();
    formData.append("files", imagesToSend);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        const { uploadedFiles } = response.data;
        const imageUrls = uploadedFiles.map((file) => file.imageUrl);

        const newProduct = {
          id: uuidv4(),
          title: title,
          description: description,
          valor: valor,
          cantidad: cantidad,
          referencia: referencia,
          image: imageUrls[0],
          categoria: categorias[selectedCategoria],
          categoria_id: selectedCategoria[0],
        };

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
          cantidad: "",
          referencia: "",
          image: "",
        });
        setMessage("¡Producto creado con exito!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error
      ) {
        setMessage(error.response.data.error);
      } else {
        setMessage("¡ Error en el registro, intentelo de nuevo !");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
      console.log(`Hubo un error en la solicitud ${error}`);
    }
  };

  return (
    <div className="add">
      <h3 className="text-titles-admin">Añadir productos: </h3>
      {message && (
        <span
          style={{
            color: message.includes("exito") ? "green" : "red",
            fontWeight: "340",
            fontSize: "18px",
            margin: "10px",
          }}>
          {message}
        </span>
      )}
      <Form onSubmit={getFormValues}>
        <Form.Control
          className="mt-2"
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

        <Form.Control
          type="number"
          placeholder="Referencia del producto"
          value={productState.referencia}
          onChange={(e) => {
            setProductState({ ...productState, referencia: e.target.value });
          }}
          className="mt-2"
          maxLength={20}
          minLength={1}
        />
        <span className="contenedor-refStock">
          <Form.Control
            type="number"
            placeholder="Cantidad en stock"
            value={productState.cantidad}
            onChange={(e) => {
              setProductState({ ...productState, cantidad: e.target.value });
            }}
            className="mt-2 form-ref"
            maxLength={10}
            minLength={1}
          />
          <label htmlFor="file-upload" className="custom-file-upload form-ref">
            <span className="container-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-5 h-5 uploap ">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Añadir imagen
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            name="imagen"
          />
        </span>
        <span style={{ color: "#213C65" }}>{fileName}</span>
        <Form.Select
          className="mt-3"
          onChange={handleCategoriaChange}
          value={selectedCategoria}>
          <option>Seleccionar categoria</option>
          {Object.keys(categorias).map((categoriaId) => (
            <option key={categoriaId} value={categoriaId}>
              {categorias[categoriaId]}
            </option>
          ))}
        </Form.Select>
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
