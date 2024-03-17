import React, { useState } from "react";
import axios from "axios";
import { initMercadoPago , Wallet} from "@mercadopago/sdk-react";

export const MercadoPago = () => {
  const [orderId, setOrderId] = useState(null);

  // Inicializar mercado pago
  initMercadoPago("TEST-1eb0203c-5a68-4143-8770-2a87ea70ccd9", {
    locale: "es-CO",
  });

  // funcion para obtener los productos de la compra
  const createOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create-order-mercadopago",
        {
         title: 'compra',
         quiantity: 1,
         unit_price: 200
        }
      );

      if (response) {
        const { id } = response.data;
        setOrderId(id);
      }
    } catch (e) {
      console.log("Hubo un error en el proceso de pago", e);
    }
  };

  return (
    <>
      <div id="wallet_container">
        <Wallet
          initialization={{ preferenceId: orderId }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      </div>
    </>
  );
};
