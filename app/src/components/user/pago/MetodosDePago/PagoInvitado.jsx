import React, { useState, useEffect } from "react";
import { ModalEntrega } from "../../Modal/ModalEntrega";
import { Button } from "react-bootstrap";
import { useCarShop } from "../../../../hook";
import axios from "axios";
import { useNavigate } from "react-router";

export const PagoInvitado = () => {
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
        texto={'Pagar al recibir'}
      />
    </>
  );
};

const Informacion = ({ handleClose }) => {
  const [data, setData] = useState([]);
  // const [succes, setSucess] = useState(false)
  const navigate = useNavigate();
  const { activeStep, setStep, cartItems, setCartItems } = useCarShop();

  useEffect(() => {
    const dataUser = sessionStorage.getItem("DtUerForEnComp");
    if (dataUser) {
      const data = JSON.parse(dataUser);
      setData(data);
    }
  }, []);

  const finnalyBuy = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/finish/buy/invited",
        {
          dataUser: data,
          dataProducts: cartItems,
          metodoPago: "contraEntrega",
        }
      );

      if (response.status === 200) {
        // setSucess(true)
        setStep(activeStep + 1);
        handleClose(false);
        navigate(`/purchaseProcessCompleted/${response.data.message}`);
        localStorage.setItem("dataUForFact", JSON.stringify(data));
        localStorage.setItem("itemsUForFact", JSON.stringify(cartItems));
        setCartItems([]);
      }
    } catch (error) {
      console.log("Se produjo un error en el servidor", error);
    }
  };

  return (
    <>
      <h4>Tenga en cuenta lo siguiente</h4>
      <ul>
        <li>
          En caso de no poder recibir la compra, por favor deje a
          alguien encargado para que la reciba.
        </li>
      </ul>
      <div className="buttons-content">
        <Button variant="secondary" onClick={handleClose}>Cambiar el metodo de pago</Button>
        <Button variant="primary" onClick={finnalyBuy}>
          Continuar
        </Button>
      </div>
    </>
  );
};
