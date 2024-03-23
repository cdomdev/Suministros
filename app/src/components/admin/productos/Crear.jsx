import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { FormAdd } from "./FormAdd";

export const Crear = ({ setListadoState }) => {
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [categorias, setCategoria] = useState({});
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [categoriaPadreId, setCategoriaPadreId] = useState('')
  const [categoriaPadre, setCategoriaPadre] = useState([]);
  const [fechtSuccess, setFechtSuccess] = useState(false);
  const [productState, setProductState] = useState({
    title: "",
    nombre: "",
    description: "",
    valor: "",
    displayImages: "",
    cantidad: "",
    referencia: "",
    imagesToSend: "",
  });

  useEffect(() => {
    // Peticion de la categoria
    const fetchData = async () => {
      await axios
        .get("http://localhost:3000/api/obtener/categorias")
        .then((response) => {
          const categoriasObj = {};
          if (response.status === 200 || response.status === 201) {
            response.data.categorias.forEach((categoria) => {
              categoriasObj[categoria.id] = categoria.nombre;
            });
            setCategoria(categoriasObj);
            setFechtSuccess(true);
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
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (fechtSuccess) {
      const fetchData = async () => {
        await axios
          .get("http://localhost:3000/api/obtener/categorias-primary")
          .then((response) => {
            if (response.status === 200) {
              setCategoriaPadre(response.data.categoriasPrincipales);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      };
      fetchData();
    }
  }, [fechtSuccess]);


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
  const handleCategoriaPadreChange = (event) => {
    setCategoriaPadreId(event.target.value);
  };

  const getFormValues = async (e) => {
    e.preventDefault();

    const {
      title,
      description,
      nombre,
      valor,
      cantidad,
      referencia,
      imagesToSend,
    } = productState;

    // formateo a valor real
    const precio = parseInt(valor).toFixed(2);

    if (
      !title ||
      !description ||
      !precio ||
      !cantidad ||
      !referencia ||
      !nombre ||
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
          title: title.toUpperCase(),
          nombre: nombre,
          description: description,
          valor: precio,
          cantidad: cantidad,
          referencia: referencia,
          image: imageUrls[0],
          categoria: categorias[selectedCategoria],
          categoriaPadre_id: categoriaPadreId,  
          categoriaPadre: categoriaPadre[categoriaPadreId].nombre, 
          categoria_id: selectedCategoria,
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
          nombre: "",
          valor: "",
          cantidad: "",
          referencia: "",
          image: "",
        });

        setMessage("¡Producto creado con exito!");
        setTimeout(() => {
          setMessage("");
        }, 2000);
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
    <FormAdd
      categorias={categorias}
      getFormValues={getFormValues}
      handleCategoriaChange={handleCategoriaChange}
      handleFileChange={handleFileChange}
      message={message}
      categoriaPadreId={categoriaPadreId}
      productState={productState}
      selectedCategoria={selectedCategoria}
      setProductState={setProductState}
      fileName={fileName}
      categoriaPadre={categoriaPadre}
      handleCategoriaPadreChange={handleCategoriaPadreChange}
    />
  );
};
