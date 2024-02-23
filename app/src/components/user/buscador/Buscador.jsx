import axios from "axios";
import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { BsSearch } from "react-icons/bs";

export const Buscador = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      if (!searchTerm) {
        setIsLoading(false);
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/busqueda-productos",
        { query: searchTerm }
      );
      if (response.data.resultados) {
        const dataResponse = response.data.resultados;
        sessionStorage.setItem(
          "searchResultProducts",
          JSON.stringify(dataResponse)
        );
        // Navegar a la página de resultados de búsqueda
        navigate(`/suministros/resultados-busqueda/${searchTerm}`);

        setSearchTerm("");
        setIsLoading(false);
      } else {
        setSearchResults([]);
        setIsLoading(false);
      }
    } catch (error) {
      navigate(`/suministros/resultados-busqueda/${searchTerm}`);

      setSearchTerm("");
      setIsLoading(false);

      console.log("Error al buscar productos:", error);
      setSearchResults([]);
    }
  };

  return (
    <>
      <Form className="input-nav">
        <Form.Control
          type="search"
          placeholder="¿Buscas algo en especial? "
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <div className="btn-icon" onClick={handleSearch}>
        {isLoading ? (
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "25px", height: "25px" }}
          />
        ) : (
          <BsSearch className="icon" />
        )}
      </div>
    </>
  );
};
