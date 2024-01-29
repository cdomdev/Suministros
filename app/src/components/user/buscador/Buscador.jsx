import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { BsSearch } from "react-icons/bs";

export const Buscador = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      // Enviar la solicitud al servidor con el término de búsqueda
      if (!searchTerm) {
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/busqueda-productos",
        { query: searchTerm }
      );
      if (response.data.resultados) {
        const dataResponse = response.data.resultados;
        // Almacenar resultados en sessionStorage después de recibir la respuesta del servidor
        sessionStorage.setItem(
          "searchResultProducts",
          JSON.stringify(dataResponse)
        );
        // Navegar a la página de resultados de búsqueda
        navigate(`/suministros/resultados-busqueda/${searchTerm}`);
        setTimeout(() => setSearchTerm(""), 1000);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      navigate(`/suministros/resultados-busqueda/${searchTerm}`);
      setTimeout(() => setSearchTerm(""), 1000);
      console.log("Error al buscar productos:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="contenedor-search">
      <Form className="input-nav">
        <Form.Control
          type="search"
          placeholder="¿Buscas algo especial? "
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <div className="btn-icon">
        <BsSearch className='icon' onClick={handleSearch} />
      </div>
    </div>
  );
};
