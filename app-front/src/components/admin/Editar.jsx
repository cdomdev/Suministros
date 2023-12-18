import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

export const Editar = ({ producto, getProductos, setEditar, setListadoState }) => {
  const tituloComponente = "Editar Producto:";
  const [previewImage, setPreviewImage] = useState(producto.displayImages);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setPreviewImage(producto.displayImages);
  }, [producto]);

  const guardarEdicion = async (e, id) => {
    e.preventDefault();

    const target = e.target;
    const productosAlmacenados = getProductos();
    const indice = productosAlmacenados ? productosAlmacenados.findIndex((p) => p.id === id) : -1;

    let productoActualizado = {
      id,
      title: target.titulo.value || producto.title,
      valor: target.valor.value || producto.valor,
      description: target.descripcion.value || producto.description,
      cantidad: target.cantidad.value || producto.cantidad,
      image: selectedImage ? null : producto.image,
      displayImages: selectedImage ? URL.createObjectURL(selectedImage) : previewImage,
     
    };

    if (selectedImage) {
      const formData = new FormData();
      formData.append('files', selectedImage);

      try {
        const response = await axios.post("http://localhost:3000/api/upload", formData);
        console.log(response);
        if (response.status === 200) {
          const { uploadedFiles } = response.data;
          const imageUrls = uploadedFiles.map((file) => file.imageUrl);
          productoActualizado.image = imageUrls[0];

          // Actualizar la URL de la imagen solo si se cargó una nueva
          productoActualizado.displayImages = URL.createObjectURL(selectedImage);
        }

        productosAlmacenados[indice] = productoActualizado;
        localStorage.setItem("productos", JSON.stringify(productosAlmacenados));
        setListadoState((prevListado) =>
          prevListado.map((item) =>
            item.id === productoActualizado.id ? productoActualizado : item
          )
        );

        setEditar(0);
      } catch (e) {
        console.log(e);
      }
    } else {
      productosAlmacenados[indice] = productoActualizado;
      localStorage.setItem("productos", JSON.stringify(productosAlmacenados));
      setListadoState((prevListado) =>
        prevListado.map((item) =>
          item.id === productoActualizado.id ? productoActualizado : item
        )
      );

      setEditar(0);
    }
  };

  const handleImagenChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="edit-form">
      <h3 className="text-titles-admin mt-4">{tituloComponente}</h3>
      <Form onSubmit={(e) => guardarEdicion(e, producto.id)}>
        <Form.Control
          type="text"
          name="titulo"
          className="titulo-editado mt-1"
          defaultValue={producto.title}
        />
        <Form.Control
          placeholder="Actualizar precio"
          name="valor"
          defaultValue={producto.valor}
          className="mt-2"
        />
         <Form.Control
          placeholder="Actualizar cantidad"
          name="cantidad"
          defaultValue={producto.cantidad}
          className="mt-2"
        />
        {/** para el cambio de imagen, queda en revision */}
        {/* <input
          type="file"
          name="imagen"
          id="file-actulizar"
          style={{ display: "none" }}
          className="imagen-editada "
          onChange={handleImagenChange}
        />
        <label htmlFor="file-actulizar" className="custom-file-upload mt">
          <span className="container-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-1 h-1 uploap">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Añadir imagen del producto
          </span>
        </label> */}
        <Form.Control
          as="textarea"
          name="descripcion"
          defaultValue={producto.description}
          className="descripcion-editada mt-3"
        />
        <span className="content-btn-card">
          <Button type="submit" className="btn-custom mt-3">
            Actualizar
          </Button>
        </span>
      </Form>
    </div>
  );
};
