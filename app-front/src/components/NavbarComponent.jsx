import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { LoginModal } from "./LoginModal";
import { isAuthenticated } from "../auth/Auth";
import { useState, useEffect } from "react";
import { UserProfile } from "../components/UserProfile";

export const NavbarComponent = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);


  return (
    <>
      <Navbar expand="lg" className="nav-custom" fixed="top">
        <Container>
          <Logo />
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="btn-custom-movil"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink  to="/home" className="nav-link-custom">
                Home
              </NavLink>
              <NavLink to="/productos" className="nav-link-custom">
                Productos
              </NavLink>
              <NavLink to="/ofertas" className="nav-link-custom">
                Ofertas
              </NavLink>
              <NavLink to="/nosotros" className="nav-link-custom">
                Nosotros
              </NavLink>
            </Nav>
            {isLoggedIn ? (
              <UserProfile setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <LoginModal setIsLoggedIn={setIsLoggedIn} />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Outlet></Outlet>
      </section>
    </>
  );
};
