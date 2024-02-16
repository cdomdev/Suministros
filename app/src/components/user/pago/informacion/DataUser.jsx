import React, { useState, useEffect } from "react";
import { useCarShop } from "../../../../hook";
import { IoIosPerson } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

export const DataUser = () => {
  const [date, setDate] = useState([]);
  const { cartItems } = useCarShop();

  useEffect(() => {
    const dataUser = sessionStorage.getItem("DtUerForEnComp");
    if (dataUser) {
      const data = JSON.parse(dataUser);
      setDate(data);
    }
  }, []);
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.cantidad * item.valor,
      0
    );
  };

  return (
    <>
      <div className="user">
        <div className="card-user">
          <div className="header">
            <IoIosPerson className="icon" /> <span>Identificacion</span>
          </div>
          <div>
            <ul>
              <li>
                {date.nombre} {date.apellidos}
              </li>
              <li>{date.email}</li>
              <li>{date.telefono}</li>
            </ul>
          </div>
        </div>
        <div className="adrres-user">
          <div className="header">
            <FaLocationDot className="icon" /> <span>Envio</span>
          </div>
          <div>
            <ul>
              <li>{date.direccion}</li>
              <li>{date.detalles}</li>
            </ul>
          </div>
        </div>
        <div className="total">
          <span>TOTAL A PAGAR </span>
          <strong>$: {calculateTotal()}</strong>
        </div>
      </div>
    </>
  );
};
