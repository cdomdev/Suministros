import React from "react";
import { NavAdmin } from "../Nav/NavAdmin";
import { Container } from "react-bootstrap";
import { RutasBox } from "./RutasBox";

export const HomeAdmin = () => {
  return (
    <>
      <header>
        <NavAdmin />
      </header>
      <div className="body-components-admin">
        <div className="layout-admin-home">
          <section className="section-cards-home-admin">
            <Container>
              <h1 className="text-menu-admin">Menu de adminitrador</h1>
              <div className="container-cards-home-admin">
                <RutasBox />
              </div>
            </Container>
          </section>
        </div>
      </div>
    </>
  );
};
