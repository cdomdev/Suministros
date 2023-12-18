import React from "react";
import { NavAdmin } from "./NavAdmin";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { IoBagAddSharp } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { BiSolidStore } from "react-icons/bi";

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
              <div className="navbar-admin-section">
                <p>Menu</p>
              </div>
              <div className="container-cards-home-admin">
                <Link className="link-box" to="/admin/gestion/usuarios">
                  <div className="box-rutas-admin">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fill="#213C65"
                        className="bi bi-people-fill"
                        viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                      </svg>
                    </span>
                    <p className="text-box-routes">Gestion de usuarios</p>
                  </div>
                </Link>
                <Link className="link-box" to="/admin/añadir/productos">
                  <div className="box-rutas-admin">
                    <IoBagAddSharp className="icon-box" />
                    <p className="text-box-routes">Agregar Productos</p>
                  </div>
                </Link>
                <Link className="link-box" to="/admin/gestion/categorias">
                  <div className="box-rutas-admin">
                  <MdAssignmentAdd  className="icon-box" />
                    <p className="text-box-routes">Agregar categorias</p>
                  </div>
                </Link>
                <Link className="link-box" to="/admin/gestion/inventario">
                  <div className="box-rutas-admin">
                  <MdOutlineInventory className="icon-box" />
                  <p className="text-box-routes">Gestion de inventario</p>
                  </div>
                </Link>
                <Link className="link-box" to="/admin/ver/tienda">
                  <div className="box-rutas-admin">
                  <BiSolidStore className="icon-box" />
                    <p className="text-box-routes">Ver tienda</p>
                  </div>
                </Link>
                <Link className="link-box" to="/">
                  <div className="box-rutas-admin">Gestion de inventario</div>
                </Link>
              </div>
            </Container>
          </section>
          <footer className="footer-admin"></footer>
        </div>
      </div>
    </>
  );
};
