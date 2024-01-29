import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useCarShop } from "../../../hook/CarShopContext";
import { Steps } from "../carShop/Steps";
import { IoIosPerson } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

export const PagoPage = () => {
  const { cartItems, activeStep } = useCarShop();

  console.log(cartItems);
  return (
    <section>
      <Steps activeStep={activeStep} />
      <div className="details">
        <div className="info">
          <div className="box1">
            <h3>Ya casi es tuya</h3>
          </div>
          <div className="box2">
            <div className="info">
              <div className="user">
                <DataUser />
              </div>
            </div>
            <div className="products">
              <p>metodo de pago</p>
            </div>
          </div>
        </div>
        <div className="summary">
          <div className="box3">
            <span>Resumen</span>
          </div>
          <div className="box4">
            <Detail cartItems={cartItems} />
          </div>
        </div>
      </div>
    </section>
  );
};

const DataUser = () => {
  const [date, setDate] = useState([]);
  useEffect(() => {
    const dataUser = sessionStorage.getItem("DtUerForEnComp");
    if (dataUser) {
      const data = JSON.parse(dataUser);
      setDate(data);
    }
  }, []);

  return (
    <>
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
    </>
  );
};

const Detail = ({ cartItems }) => {
  return (
    <>
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
        <div className="total">
            pasas
        </div>
      </div>
    </>
  );
};
