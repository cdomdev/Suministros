import React from "react";
import { GrSecure } from "react-icons/gr";
import { LuPackageCheck } from "react-icons/lu";
import { BsCardChecklist } from "react-icons/bs";


export const BoxText = () => {
  return (
    <>
      <div className="contenedor-box-text">
        <div className="box-text">
          <GrSecure className="icon1" />
          <div>
            <h5>Compra segura</h5>
            <p>
              Tus datos personales se mantienen bajo estricta confidencialidad y
              estan protegidos.
            </p>
          </div>
        </div>
        <div className="box-text">
          <LuPackageCheck className="icon2" />
          <div>
            <h5>Envio gratis</h5>
            <p>
              Por compras mayores a $ 90.000. <br />{" "}
              <strong>El envio es total mente gratis</strong>
            </p>
          </div>
        </div>
        <div className="box-text">
          <BsCardChecklist className="icon3" />
          <div>
            <h5>Garantia para tus compras</h5>
            <p>
              Puedes devolver tu compra en un plazo máximo de 30 días, el
              producto debe estar en perfecto estado: sin uso, tener todos sus
              accesorios, manuales y embalaje original. Si tienes dudas,
              comunícate a nuestra línea de atención al cliente desde Bogotá
              3077115 o a la línea nacional 320 889 9933.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
