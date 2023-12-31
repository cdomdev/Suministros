import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { PopoverProductos } from "./PopoverProductos";
import {SaveStorage} from '../../../helper/SaveStorage'

export const NuevaOferta = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [message, setMessage] = useState("");

  // inicar el estado de la oferta
  const [oferta, setOferta] = useState({
    nombre: "",
    descuento: "",
    fechaIni: "",
    fechaFin: "",
  });

  // solcuiar la lista de productos para ofertas
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/productos")
      .then((response) => {
        if (response.status === 200) {
          setListaProductos(response.data.data);
        } else {
          setMessage("No hay productos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // tomar valores de los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOferta({
      ...oferta,
      [name]: value,
    });
  };

  // sleccion del id del la lista de productos
  const handleProductSelection = (e, productId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      const updatedSelections = selectedProducts.filter(
        (selectedId) => selectedId !== productId
      );
      setSelectedProducts(updatedSelections);
      console.log(updatedSelections);
    }
  };

  // hacer la solcitud con validaciones antes de enviar los datos
  const handleNuevaOferta = async (e) => {
    e.preventDefault();

    const { nombre, descuento, fechaIni, fechaFin } = oferta;

    if (!nombre || !descuento || !fechaIni || !fechaFin) {
      setMessage("Por favor complete todos los campos de la oferta");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }
    try {
      const newOferta = {
        nombre: nombre,
        descuento: parseInt(descuento),
        fechaIni: fechaIni,
        fechaFin: fechaFin,
        productos: selectedProducts,
      };

      const responseOferta = await axios.post(
        "http://localhost:3000/api/crear/ofertas",
        newOferta
      );
      if (responseOferta.status === 200 || responseOferta.status === 201) {
        setSelectedProducts("");
        setMessage("Oferta creada con éxito");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        setMessage("Ocurrio un error al crear la oferta");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }

      // reestablecer el estado
      setOferta({
        nombre: "",
        descuento: "",
        fechaIni: "",
        fechaFin: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-ofertas">
      <h3 className="title-add-ofertas">Crear una nueva oferta</h3>
      <p className="text">
        Aqui podra agragar un nueva oforta a los productos existentes,
        <strong> ( Marca - producto - cantidad )</strong> , esta es la
        referencia de como se listan los productos disponibles para nuevas
        ofertas.
      </p>
      <Form className="mt-4" onSubmit={handleNuevaOferta}>
        <Form.Control
          type="text"
          placeholder="Nombre de la oferta"
          value={oferta.nombre}
          onChange={handleInputChange}
          name="nombre"
        />
        <Form.Control
          type="number"
          min={1}
          max={100}
          placeholder="Porcentaje de descuento"
          className="mt-2"
          value={oferta.descuento}
          onChange={(e) => setOferta({ ...oferta, descuento: e.target.value })}
        />
        <Row className="mt-2">
          <Col>
            <Form.Control
              type="date"
              value={oferta.fechaIni}
              name="fechaIni"
              onChange={handleInputChange}
            />
            <Form.Label className="label-date">
              Fecha inicial de la oferta
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="date"
              value={oferta.fechaFin}
              name="fechaFin"
              onChange={handleInputChange}
            />
            <Form.Label className="label-date">
              Fecha final de la oferta
            </Form.Label>
          </Col>
        </Row>
        <div className="container-popover mt-3">
          <PopoverProductos
            listaProductos={listaProductos}
            handleProductSelection={handleProductSelection}
            selectedProducts={selectedProducts}
          />
        </div>
        {message && (
          <span
            style={{
              color: message.includes(" éxito") ? "green" : "red",
              fontWeight: "340",
              fontSize: "18px",
              margin: "10px",
            }}>
            {message}
          </span>
        )}
        <Button className="mt-4" type="submit">
          Crear nueva oferta
        </Button>
      </Form>
    </div>
  );
};
