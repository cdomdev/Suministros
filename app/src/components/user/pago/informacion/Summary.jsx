import React from "react";
import { useCarShop } from "../../../../hook";

export const Summary = () => {
  const { cartItems } = useCarShop();

  return (
    <>
      <div className="box3">
        <h3>Resumen de tu compra</h3>
      </div>
      <div className="box4">
        <div>
          {cartItems.map((item) => (
            <ul key={item.id} className="card-product">
              <li>
                <img src={item.image} alt="" className="img-car-shop" />
                <ul className="data-products">
                  <li>{item.nombre}</li>
                  <li>Ref: {item.referencia} </li>
                  <li>Unidades: {item.cantidad} </li>
                </ul>
              </li>
              <div className="item-sub">
                <p className="total-value-productos">
                  <strong className="sub">Valor unidad: </strong>$ {item.valor}{" "}
                  <span className="line-in-info-car" />
                  <strong>Subtotal:</strong>$ {item.cantidad * item.valor}
                </p>
              </div>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};
