import React from "react";
import { RutasBox } from "./RutasBox";
import { Layout } from "../layout/Layout";

export const HomeAdmin = () => {
  return (
    <>
      <Layout
        title={"Dashboard admin"}
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
