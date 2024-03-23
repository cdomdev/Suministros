import React from "react";
import { Button, Form } from "react-bootstrap";


export const FormAdd = ({
  message,
  getFormValues,
  productState,
  handleFileChange,
  handleCategoriaChange,
  handleCategoriaPadreChange,
  setProductState,
  selectedCategoria,
  categorias,
  fileName,
  categoriaPadre, 
  categoriaPadreId 
}) => {


  
  return (
    <div className="add">
      <h3 className="text-titles-admin">Añadir productos </h3>
      {message && (
        <span
          style={{
            color: message.includes("exito") ? "green" : "red",
            fontWeight: "400",
            fontSize: "18px",
            margin: "10px",
            height: "20px",
          }}>
          {message}
        </span>
      )}
      <Form onSubmit={getFormValues}>
        <Form.Control
          type="text"
          placeholder="Ej: Corona..."
          value={productState.title}
          onChange={(e) =>
            setProductState({ ...productState, title: e.target.value })
          }
          minLength={1}
          maxLength={50}
        />
        <Form.Label>Marca del producto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Concolor..."
          value={productState.nombre}
          onChange={(e) =>
            setProductState({ ...productState, nombre: e.target.value })
          }
          minLength={1}
          maxLength={100}
        />
        <Form.Label>Nombre del producto</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ej: 120000"
          value={productState.valor}
          onChange={(e) =>
            setProductState({ ...productState, valor: e.target.value })
          }
          maxLength={30}
          minLength={1}
        />
        <Form.Label>Precio del producto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: 90123232"
          value={productState.referencia}
          onChange={(e) => {
            setProductState({ ...productState, referencia: e.target.value });
          }}
          maxLength={20}
          minLength={1}
        />
        <Form.Label>Referencia del producto</Form.Label>
        <span className="contenedor-refStock">
          <Form.Control
            type="number"
            placeholder="Cantidad"
            value={productState.cantidad}
            onChange={(e) => {
              setProductState({ ...productState, cantidad: e.target.value });
            }}
            className=" form-ref"
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
          className="mt-2"
          onChange={handleCategoriaPadreChange}
          value={categoriaPadreId}>
          <option>Seleccionar categoria</option>
        {categoriaPadre.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
        ))}
        </Form.Select>
        {/* categoria padre */}
        <Form.Label>Ralcionar a una categoria</Form.Label>
        <Form.Select
          className="mt-1"
          onChange={handleCategoriaChange}
          value={selectedCategoria}>
          <option>Relacionar a Subcategoria</option>
          {Object.keys(categorias).map((categoriaId) => (
            <option key={categoriaId} value={categoriaId}>
              {categorias[categoriaId]}
            </option>
          ))}
        </Form.Select>
        <Form.Label>Añadir a una subcategoria</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Descripcion... "
          value={productState.description}
          onChange={(e) =>
            setProductState({ ...productState, description: e.target.value })
          }
        />
         <Form.Label>Agregar descripcion de producto</Form.Label>
        <span className="container-btn">
          <Button
            className="btn btn-custom mt-2"
            variant="primary"
            type="submit">
            Añadir
          </Button>
        </span>
      </Form>
    </div>
  );
};
