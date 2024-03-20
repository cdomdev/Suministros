import { Outlet, NavLink, Link } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { ContenidoSubmenus } from "../nav/ContenidoSubmenus";
import { Buscador } from "../buscador/Buscador";

import { useUser } from "../../../hook";
import LogoImg from "../../../assets/images/logo.webp";
import { BoxIcons } from "./BoxIcons";

export const NavCustome = () => {
  const { isAdmin } = useUser();
  const expand = "lg";

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <Navbar expand={expand} className="mb-3 nav-custom" fixed="top">
        <Container fluid>
          <div className="header-nav">
            <div className="header">
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Brand>
                <Link to="/suministros/home">
                  <img src={LogoImg} alt="img-logo" className="logotipo" />
                </Link>
              </Navbar.Brand>
              <Buscador />
              <BoxIcons />
            </div>
            <hr />
            <div className="menu-navegacion">
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-${expand}`}
                  />
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className=" flex-grow-1 pe-3 nav-list  align-items-center;">
                    <ContenidoSubmenus />
                    <NavLink
                      to="/suministros/ofertas"
                      className="nav-link-custom ofertas">
                      OFERTAS
                    </NavLink>
                    <Buscador />
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </div>
        </Container>
      </Navbar>
      <section style={{ marginTop: "10em" }}>
        <Outlet />
      </section>
    </>
  );
};
