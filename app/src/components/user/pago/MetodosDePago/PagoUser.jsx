import React, { useState, useEffect } from "react";
import { ModalEntrega } from "../../Modal/ModalEntrega";
import { Button, Spinner } from "react-bootstrap";
import { useCarShop } from "../../../../hook";
import axios from "axios";
import { useNavigate } from "react-router";

export const PagoUser = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <ModalEntrega
        variant="primary"
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
        content={<Informacion handleClose={handleClose} />}
        texto={"Pagar al recibir"}
      />
    </>
  );
};

const Informacion = ({ handleClose }) => {
  const navigate = useNavigate();
  const { activeStep, setStep, cartItems, setCartItems } = useCarShop();
  const [loading, setLoading] = useState(false);

  const sessionData = JSON.parse(sessionStorage.getItem("DtUerForEnComp"));
  const localStorageData = JSON.parse(
    localStorage.getItem("userOnValidateScesOnline")
  );

  const combinedData = { ...sessionData, email: localStorageData.email };

  const finnalyBuy = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/finish/buy/user",
        {
          dataUser: combinedData,
          dataProducts: cartItems,
          metodoPago: "contraEntrega",
        }
      );

      if (response.status === 200) {
        setStep(activeStep + 1);
        handleClose(false);
        navigate(`/purchaseProcessCompleted/${response.data.message}`);
        localStorage.setItem("dataUForFact", JSON.stringify(combinedData));
        localStorage.setItem("itemsUForFact", JSON.stringify(cartItems));
        setCartItems([]);
      }
    } catch (error) {
      console.log("Se produjo un error en el servidor", error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <h4>Tenga en cuenta lo siguiente</h4>
      <ul>
        <li>
          En caso de no poder recibir la compra, por favor deje a alguien
          encargado para que la reciba por usted.
        </li>
      </ul>
      <div className="buttons-content">
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={finnalyBuy} disabled={loading}>
          {loading ? (
            <Spinner animation="border" role="status" size="sm" />
          ) : (
            "Continuar"
          )}
        </Button>
      </div>
    </>
  );
};
