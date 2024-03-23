import { Button, Modal, Form } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export const Actualizar = ({ productId, productInfo, setProductos }) => {
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategoria] = useState({});
  const [categoriPadre, setcategoriaPadre] = useState([]);
  const [updateProduct, setUpdatedProduct] = useState({ ...productInfo });
  const [messageUpdate, setMessageUpdate] = useState("");

  // referencias para los productos

  const tituloRef = useRef(null);
  const nombreRef = useRef(null);
  const valorRef = useRef(null);
  const referenciaRef = useRef(null);
  const descripcionRef = useRef(null);
  const categoriaRef = useRef(null);
  const categoriaPadreRef = useRef(null);
  
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
        if (response.status === 400 || response.status === 500) {
          console.error("Error interno del servidor");
        }
        console.log(`Error al obtener las categorias ${error}`);
      });
  }, []);

  // listar categorias padre en el modal (con espera de 1 segundo)
  useEffect(() => {
    // Peticion de la categoria
    const timeout = setTimeout(() => {
      axios
        .get("http://localhost:3000/api/obtener/categorias-primary")
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            const dataResonse = response.data.categoriasPrincipales;
            setcategoriaPadre(dataResonse);
          }
        })
        .catch((error) => {
          if (response.status === 400 || response.status === 500) {
            console.error("Error interno del servidor");
          }
          console.log(`Error al obtener las categorias ${error}`);
        });
    }, 1000); // Espera de 1 segundo antes de realizar la solicitud

    // Limpieza del timeout para evitar fugas de memoria
    return () => clearTimeout(timeout);
  }, []);

  // funcion para ctulializare el producto

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategoryName = categorias[selectedCategoryId];

    setUpdatedProduct({
      ...updateProduct,
      categoria: selectedCategoryName,
    });
  };

  const handleInputChange = (e) => {
    e.preventDefault();

    // Obtener los valores actuales de los campos o utilizar los valores por defecto del producto

    const updatedNombre = nombreRef.current.value || productInfo.nombre;
    const updatedTitle = tituloRef.current.value || productInfo.title;
    const updatedValor =
      parseFloat(valorRef.current.value) || productInfo.valor;
    const updatedDescripcion =
      descripcionRef.current.value || productInfo.description;
    const updatedReferencia =
      referenciaRef.current.value || productInfo.referencia;
    const selectedCategoryId = categoriaRef.current.value;
    const selectedCategoryName = categorias[selectedCategoryId];
    const selecIdCategoriaPadre = categoriaPadreRef.current.value;

    console.log(selecIdCategoriaPadre);
    console.log(selectedCategoryId);

    //  nuevo objeto con la informacion el producto
    const productosActulizado = {
      nombre: updatedNombre,
      title: updatedTitle,
      valor: updatedValor,
      description: updatedDescripcion,
      referencia: updatedReferencia,
      categoria: selectedCategoryName || productInfo.Categorium.nombre,
      categoria_Id: parseInt(selectedCategoryId) || productInfo.categoria_id,
      categoria_padre_id: parseInt(selecIdCategoriaPadre),
    };
    // Actualizar el estado del producto
    setUpdatedProduct(productosActulizado);

    // hacer solicitud para actulizar el producto en db
    // validamos que haya un nuevo producto
    if (productosActulizado) {
      axios
        .put(`http://localhost:3000/api/productos/${productId}/actualizar`, {
          producto_Id: productId,
          newProduct: productosActulizado,
        })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setProductos(response.data.productosUpdate);
            setMessageUpdate("Producto actualizado con exito");
            setTimeout(() => {
              setMessageUpdate("");
              setShowModal(false);
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400 || error.response.status === 500) {
            setMessageUpdate("Hubo un problema al actulizar el Producto");
            setTimeout(() => {
              setMessageUpdate("");
            }, 2000);
          }
          console.log("Error interno del servisor", error);
        });
    }
  };

  return (
    <>
      <Button
        variant="outline-success"
        className="btn-custome-inventary"
        onClick={() => setShowModal(true)}>
        Actualizar inventario
      </Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-update-inventory-products">
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title className="title-modal-update">
            Actulizar informacion del producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-update-inventory">
          <p className="text-modal-update-inventary">
            En esta seccion puede modificar valores como: <br />
            Nombre, precio, referencia, categoria o descripcion del producto
            selecionado.
          </p>
          <span className="text-update">
            <strong>Recuerde, </strong>
            para elimiar o modificar la cantida o el producto de inventario
            usar. <strong>Actulizar stock</strong> o <strong>Eliminar</strong>
          </span>
          <Form>
            <Form.Control
              type="text"
              name="titulo"
              className="titulo-editado mt-3"
              defaultValue={productInfo.nombre}
              ref={nombreRef}
            />
            <Form.Control
              type="text"
              name="titulo"
              className="titulo-editado mt-3"
              defaultValue={productInfo.title}
              ref={tituloRef}
            />
            <Form.Control
              placeholder="Actualizar precio"
              name="valor"
              defaultValue={productInfo.valor}
              className="mt-2"
              ref={valorRef}
            />
            <Form.Control
              placeholder="Actualizar referencia"
              name="referencia"
              defaultValue={productInfo.referencia}
              className="mt-2"
              ref={referenciaRef}
            />
            <Form.Select
              className="mt-3"
              ref={categoriaRef}
              onChange={(e) => handleCategoryChange(e)}>
              <option>{productInfo.Categorium.nombre}</option>
              {Object.keys(categorias).map((categoriaId) => (
                <option key={categoriaId} value={categoriaId}>
                  {categorias[categoriaId]}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              className="mt-3"
              ref={categoriaPadreRef}
              onChange={(e) => handleCategoryChange(e)}>
              <option>{productInfo.categoria_padre.nombre}</option>
              {categoriPadre.map((categoria) => {
                return (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Control
              as="textarea"
              name="descripcion"
              defaultValue={productInfo.description}
              className="descripcion-editada mt-3"
              ref={descripcionRef}
            />
            {setMessageUpdate && (
              <p
                style={{
                  color: messageUpdate.includes("exito") ? "green" : "red",
                  fontWeight: "bold",
                  fontSize: "18px",
                  margin: "10px",
                  height: "20px",
                  transition: "color 0.3s, font-size 0.3s",
                }}>
                {messageUpdate}
                {""}
              </p>
            )}
            <span className="content-btn-card">
              <Button onClick={handleInputChange} className="btn-custom mt-3">
                Actualizar
              </Button>
            </span>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
