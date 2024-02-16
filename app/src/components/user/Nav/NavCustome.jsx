import { Outlet, NavLink, Link } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { ContenidoSubmenus } from "../nav/ContenidoSubmenus";
import { Buscador } from "../buscador/Buscador";
import { Logo } from "../Logo/Logo";
import { CarShop } from "../carShop";
import { Pedidos } from "../pedidos/Pedidos";
import { useUser } from "../../../hook";
import { Perfil } from "../nav/Perfil";

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
            <div className=" contenedor-header-nav">
              <div className="header-logo">
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Brand>
                  <Link to="/suministros/home">
                    <Logo />
                  </Link>
                </Navbar.Brand>
                <div className="contenedor-search">
                  <Buscador />
                </div>
                <div className="content-icons-nav">
                  <div className="pedidos">
                    <Pedidos />
                  </div>
                  <div className="car">
                    <CarShop />
                  </div>
                  <div className="perfil">
                    <Perfil />
                  </div>
                </div>
              </div>
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
                      style={{ color: "blue" }}
                      to="/suministros/ofertas"
                      className="nav-link-custom">
                      OFERTAS
                    </NavLink>
                    <div className="contenedor-search">
                      <Buscador />
                    </div>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </div>
        </Container>
      </Navbar>
      <section style={{ marginTop: "13em" }}>
        <Outlet />
      </section>
    </>
  );
};
