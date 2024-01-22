import React, { useState } from "react";
import { FaTruck } from "react-icons/fa6";
import { ModalEntrega } from "../Modal/ModalEntrega";

export const EnvioNormal = () => {
  const [check, setCheck] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [show, setshow] = useState(false);

  const handleShow = () => setshow(true);
  const handleClose = () => setshow(false);

  const handleToggle = () => {
    setCheck(!check);
    setExpanded(!expanded);
  };

  return (
    <div className={`envio-programado ${expanded ? "expanded" : ""}`}>
      <div className="check-container">
        <input
          type="checkbox"
          id="envio-normal-checkbox"
          checked={check}
          onChange={handleToggle}
          className="hidden-checkbox"
        />
        <div className="contenedor-label-delivery">
          <div className="label-de" onClick={handleToggle}>
            <label
              className={`custom-checkbox ${check ? "checked" : ""}`}
              htmlFor="envio-normal-checkbox">
              <span className="circle"></span>
            </label>
            <span>
              <FaTruck className="truck" />
              Envío
            </span>
          </div>
          <div>
            <span className="value">$ 25.200</span>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="contenido">
          Ingresa la informacion de quien recibe el pedido
          <div>
            <ModalEntrega
              variant="outline-info"
              handleShow={handleShow}
              handleClose={handleClose}
              show={show}
              content={content()}
              texto="Ingrese informacion de cliente"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const content = () => {
  return (
    <>
      <p>Aqui podras organizar tu envio c</p>
    </>
  );
};
