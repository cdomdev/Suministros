import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

export const Editar = ({ producto, getProductos, setEditar, setListadoState }) => {
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
      valor: parseInt(target.valor.value).toFixed(2) || producto.valor,
      nombre: target.nombre.value || producto.nombre,
      description: target.descripcion.value || producto.description,
      cantidad: target.cantidad.value || producto.cantidad,
      image: selectedImage ? null : producto.image,
      referencia: target.referencia.value || producto.referencia,
      displayImages: selectedImage ? URL.createObjectURL(selectedImage) : previewImage,
      categoria: producto.categoria,
      categoria_id: producto.categoria_id
    };

    if (selectedImage) {
      const formData = new FormData();
      formData.append('files', selectedImage);

      try {
        const response = await axios.post("http://localhost:3000/api/upload", formData);
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


  return (
    <div className="edit-form">
      <h3>Ediatar producto</h3>
      <Form onSubmit={(e) => guardarEdicion(e, producto.id)}>
        <Form.Control
          type="text"
          name="titulo"
          className="titulo-editado mt-1"
          defaultValue={producto.title}
        />
          <Form.Control
          type="text"
          name="nombre"
          className="titulo-editado mt-1"
          defaultValue={producto.nombre}
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
          <Form.Control
          placeholder="Actualizar referencia"
          name="referencia"
          defaultValue={producto.referencia}
          className="mt-2"
        />
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
