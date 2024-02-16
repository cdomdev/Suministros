import Container from "react-bootstrap/Container";
import { Nav, Navbar} from "react-bootstrap";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Logo } from "../../user/Logo/Logo";
import {useUser} from '../../../hook'


export const NavAdmin = () => {
  const { logout } = useUser();

  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/home");
  };

  const finnalySection = () =>{
    localStorage.clear()
    sessionStorage.clear()
    logout()
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className=" bg-body-tertiary nav-custome-admin w-100"
        fixed="top">
        <Container className="custom-navbar nav-layout-admin">
          <Link to="/admin" onClick={redirectToHome}>
            <Logo fillColor="#213C65" />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link>ADMIN</Nav.Link>
              <Nav.Link  onClick={finnalySection}>
                Cerrar sesion
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section style={{marginTop: '6em'}}>
        <Outlet />
      </section>
    </>
  );
};
