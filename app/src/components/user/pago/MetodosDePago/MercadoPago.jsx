import React, { useState } from "react";
import mercadopagoIMg from "../../../../assets/images/mercadopago.webp";
import { initMercadoPago } from "@mercadopago/sdk-react";
import axios from "axios";
import { useCarShop } from "../../../../hook";
import { Spinner } from "react-bootstrap";

export const MercadoPago = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMesage] = useState("");

  initMercadoPago("TEST-1eb0203c-5a68-4143-8770-2a87ea70ccd9", {
    locale: "es-CO",
  });

  const { cartItems } = useCarShop();

  const createOrder = async () => {
    try {
      if (! cartItems || cartItems.length === 0) {
        setMesage("¡ No hay productos para procesar un pago !");
        setTimeout(() => {
          setMesage("");
        }, 3000);
        return
      }

      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/finish/buy/mercadopago",
        {
          cartItems,
        }
      );
      if (response.status === 200) {
        const { init_point } = response.data;
        window.location.href = init_point;
      }
    } catch (e) {
      console.log(e);
      setMesage("! Hubo un problema al procesar tu pago ¡");
      setTimeout(() => {
        setMesage("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mercadopago-content">
      <span>{message}</span>
      <button onClick={createOrder} className="btn-mercadopago">
        {isLoading ? (
          <div className="spinner-container">
            <Spinner animation="border" role="status" size="sm" />
          </div>
        ) : (
          <>
            <img src={mercadopagoIMg} alt="img" className="mercadopago-img" />
            Pagar con Mercado Pago
          </>
        )}
      </button>
      <p>Paga de forma segura</p>
    </div>
  );
};
