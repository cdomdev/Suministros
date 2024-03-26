import React from "react";
import { Layout } from "../layout/Layout";
import { Usuarios } from "./Usuarios";
import { Invitados } from "./Invitados";

export const GestionUsuarios = () => {
  return (
    <>
      <Layout
        title={"Gestionar ordenes de compra"}
        component={
          <div className="contendor">
            <Usuarios />
            <Invitados/>
          </div>
        }
      />
    </>
  );
};
