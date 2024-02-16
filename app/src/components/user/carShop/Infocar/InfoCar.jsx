import React, { useState, useEffect } from "react";
import { UserNotLoggin } from "./UserNotLoggin";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router";
import { AddToCar } from "./AddCar";
import { useCarShop } from "../../../../hook";
import { isAuthenticated } from "../../../../auth";

export const InfoCar = ({ cartItems }) => {
  const { deleFromCar} = useCarShop();
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
                  <div className="cont-lis-delete">
                    <li>
                      <img src={item.image} alt="" className="img-car-shop" />
                      <div>
                        <ul className="data-products">
                          <li>{item.nombre}</li>
                          <li>Ref: {item.referencia} </li>
                          <li>Unidades: {item.cantidad} </li>
                        </ul>
                      </div>
                    </li>
                    <div>
                      <DeleteOneProductCar
                        IdCar={item.id}
                        onDelete={() => handleDeleteProduct(item.id)}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="item-sub">
                    <p className="total-value-productos">
                      <strong className="sub">Valor unidad: </strong>${" "}
                      {item.valor} <span className="line-in-info-car" />
                      <strong>Subtotal:</strong>$ {item.cantidad * item.valor}
                    </p>
                  </div>
                </ul>
              ))
            )}
          </>
        )}
        {cartItems.length !== 0 && (
          <button
            onClick={() => navigate("/suministros/productos")}
            className="add-product">
            Agregar mas productos <TiShoppingCart />
          </button>
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
        Eliminar <RiDeleteBin5Line className="icon" />
      </button>
    </>
  );
};
