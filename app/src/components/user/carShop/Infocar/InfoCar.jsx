import React, { useState, useEffect } from "react";
import { UserNotLoggin } from "./UserNotLoggin";
import { isAuthenticated } from "../../../../auth/Auth";
import { AddToCar } from "./AddCar";
import { useCarShop } from "../../../../hook/CarShopContext";
import { useNavigate } from "react-router";
import { TiShoppingCart } from "react-icons/ti";
export const InfoCar = ({ cartItems }) => {
  const { deleFromCar } = useCarShop();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [isLoggedIn]);

  const handleDeleteProduct = (productId) => {
    deleFromCar(productId);
  };

  return (
    <>
      <div className="box2">
        {isLoggedIn && cartItems.length === 0 ? (
          <AddToCar />
        ) : (
          <>
            {cartItems.length === 0 ? (
              <UserNotLoggin setIsLoggedIn={setIsLoggedIn} />
            ) : (
              cartItems.map((item) => (
                <ul key={item.id} className="card-product">
                  <li>
                    <img src={item.image} alt="" className="img-car-shop" />
                    <div>
                      <ul className="data-products">
                        <li>{item.description}</li>
                        <li>Ref: {item.referencia} </li>
                        <li>Unidades: {item.cantidad} </li>
                      </ul>
                    </div>
                  </li>
                  <div className="item-sub">
                    <p className="total-value-productos">
                      <strong className="sub">Valor unidad: </strong>${" "}
                      {item.valor} <span className="line-in-info-car" />
                      <strong>Subtotal:</strong>$ {item.cantidad * item.valor}
                    </p>
                  </div>
                  <div>
                    <DeleteOneProductCar
                      IdCar={item.id}
                      onDelete={() => handleDeleteProduct(item.id)}
                    />
                  </div>
                </ul>
              ))
            )}
          </>
        )}
        {cartItems.length !== 0 ? (
          <button
            onClick={() => navigate("/suministros/productos")}
            className="add-product">
            Agregar mas productos <TiShoppingCart />
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export const DeleteOneProductCar = ({ IdCar, onDelete }) => {
  const handleDeleteProduct = () => {
    onDelete(IdCar);
  };

  return (
    <>
      <button className="delete" onClick={handleDeleteProduct}>
        Eliminar
      </button>
    </>
  );
};
