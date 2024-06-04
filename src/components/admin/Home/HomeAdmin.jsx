import React from "react";
import { RutasBox } from "./RutasBox";
import Layout from "../layout/Layout";

const HomeAdmin = () => {
  return (
    <>
      <Layout
        title={"Rutas de administrador"}
        component={
          <div className="container-cards-home-admin">
            <div className="box-rutas-admin">
              <RutasBox />
            </div>
          </div>
        }
      />
    </>
  );
};

export default HomeAdmin;
