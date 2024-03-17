import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useCarShop } from "../../../../hook";
import { mercadoPagoIcon } from "../../../../assets/icons/iconos";
export const MercadoPago = () => {
  const [productos, setProductos] = useState([]);
  const [refernceId, setReferenceId] = useState(null);
  initMercadoPago("TEST-1eb0203c-5a68-4143-8770-2a87ea70ccd9", {
    locale: "es-CO",
  });

  const { cartItems } = useCarShop();

  const createOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/finish/buy/mercadopago",
        {
          cartItems,
        }
      );
      if (response.status === 200) {
        const { id } = response.data;
        const { init_point } = response.data;
        console.log();
        console.log(response.data);
        setReferenceId(id);
        window.location.href = init_point;
      }
      console.log(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button onClick={createOrder}>
        comprar
      </button>
      {refernceId && (
        <Wallet
          initialization={{ preferenceId: refernceId }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      )}
    </>
  );
};
