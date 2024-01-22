import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Form,
  Button,
} from "react-bootstrap";
import { Logo } from "../Logo/Logo";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { LoginModal } from "../autenticacion/LoginModal";
import { isAuthenticated } from "../../../auth/Auth";
import { useState, useEffect } from "react";
import { UserProfile } from "../perfilUsuario/UserProfile";
import { CarShop } from "../carShop/Infocar/CarShop";
import Avatar from "@mui/material/Avatar";
import EventEmitter from "../../../hook/EventEmitter";
import { Pedidos } from "../pedidos/Pedidos";

export const NavCustome = () => {
  const expand = "lg";
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [isLoggedIn]);

  const redirectToHome = () => {
    navigate("/suministros/home");
  };
  useEffect(() => {
    const authChangeCallback = (isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    };

    const unsubscribe = EventEmitter.subscribe(
      "authChange",
      authChangeCallback
    );

    return () => {
      unsubscribe();
    };
  }, []);

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
                  <Link to="/suministros/home" onClick={redirectToHome}>
                    <Logo />
                  </Link>
                </Navbar.Brand>
                <Form className="input-nav">
                  <Form.Control
                    type="search"
                    placeholder="¿Buscas algo especial? "
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
                <div className="content-icons-nav">
                  <div className="cont-icon">
                    <Pedidos />
                    <span className="pedidos">PEDIDOS</span>
                  </div>
                  <div className="cont-icon">
                    <CarShop />
                    <span className="carrito">CARRITO</span>
                  </div>
                  <div className="cont-icon">
                    {isLoggedIn ? (
                      <UserProfile
                        setIsLoggedIn={() => setIsLoggedIn(!isLoggedIn)}
                      />
                    ) : (
                      <>
                        <LoginModal
                          setIsLoggedIn={() => setIsLoggedIn(!isLoggedIn)}
                          controlComponent={(handleShow) => (
                            <>
                              <Avatar
                                src="/broken-image.jpg"
                                onClick={handleShow}
                                sx={{ cursor: "pointer" }}
                              />
                            </>
                          )}
                        />
                      </>
                    )}
                    <span className="profile">PERFIL</span>
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
                  <Nav className=" flex-grow-1 pe-3 nav-list">
                    <NavLink
                      to="/suministros/productos"
                      className="nav-link-custom">
                      Productos
                    </NavLink>
                    <NavLink
                      to="/suministros/ofertas"
                      className="nav-link-custom">
                      Ofertas
                    </NavLink>
                    <NavLink
                      to="/suministros/nosotros"
                      className="nav-link-custom">
                      Nosotros
                    </NavLink>
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
