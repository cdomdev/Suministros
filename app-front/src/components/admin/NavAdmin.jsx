import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavItem, Dropdown } from "react-bootstrap";
import { Outlet, NavLink, Link } from "react-router-dom";
import { Logo } from "../Logo";
import "../../styles/App.css";

export const NavAdmin = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className=" bg-body-tertiary nav-custome-admin w-100"
        fixed="top">
        <Container className="custom-navbar nav-layout-admin">
          <Logo fillColor="#213C65" />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/admin" className="nav-link-custome">
                Home
              </NavLink>
              <NavLink to="/admin/gestion/usuarios" className="nav-link-custome">
                Usuarios
              </NavLink>
              <Dropdown as={NavItem}>
                <Dropdown.Toggle className="nav-link-custome" as={NavLink}>
                  Gestion de inventario
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <NavLink
                      to="/admin/gestion/usuarios"
                      className="nav-link-custome">
                     Agregar productos
                    </NavLink>
                    <Dropdown.Item>
                    </Dropdown.Item>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Outlet />
      </section>
    </>
  );
};
