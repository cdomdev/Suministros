import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import { Logo } from "../Logo/Logo";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { LoginModal } from "../autenticacion/LoginModal";
import { isAuthenticated } from "../../../auth/Auth";
import { useState, useEffect } from "react";
import { UserProfile } from "../perfilUsuario/UserProfile";
import { CarShop } from "../carShop/Infocar/CarShop";
import EventEmitter from "../../../hook/EventEmitter";
import { Pedidos } from "../pedidos/Pedidos";
import { useUser } from "../../../hook/UserDataProvider";
import { SubMenu } from "./Submenu";
import { Buscador } from "../buscador/Buscador";

export const NavCustome = () => {
  const { isAdmin } = useUser();
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
                  <Nav className=" flex-grow-1 pe-3 nav-list  align-items-center;">
                    <div>
                      <SubMenu
                        className="submenu"
                        label={"Baños"}
                        items={[
                          {
                            label: "Sanitarios",
                            to: "/suministros/sanitarios",
                          },
                          { label: "Griferias", to: "/suministros/griferias" },
                          { label: "Espejos", to: "/suministros/espejos" },
                        ]}
                        image="https://images.pexels.com/photos/6032203/pexels-photo-6032203.jpeg"
                      />
                    </div>
                    <div>
                      <SubMenu
                        className="submenu submenu2"
                        label={"Cocinas"}
                        items={[
                          {
                            label: "Lavaplatos",
                            to: "/suministros/lavaplatos",
                          },
                          { label: "Lavaderos", to: "/suministros/lavamanos" },
                        ]}
                      />
                    </div>
                    <div>
                      <SubMenu
                        className="submenu submenu3"
                        label={"Construccion y remodelacion"}
                        items={[
                          { label: "Pinturas", to: "/suministros/pinturas" },
                          { label: "Pegantes", to: "/suministros/pegantes" },
                          {
                            label: "Limpiadores",
                            to: "/suministros/limpiadores",
                          },
                        ]}
                      />
                    </div>
                    <div>
                      <SubMenu
                        className="submenu submenu4"
                        label={"Pisos y paredes"}
                        items={[
                          {
                            label: "Pisos ceramicos",
                            to: "/suministros/pisos",
                          },
                          { label: "Paredes", to: "/suministros/paredes" },
                        ]}
                      />
                    </div>
                    <NavLink
                      style={{ color: "blue" }}
                      to="/suministros/ofertas"
                      className="nav-link-custom">
                      OFERTAS
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
