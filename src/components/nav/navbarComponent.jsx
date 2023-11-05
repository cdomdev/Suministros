import {Navbar, Nav, Container} from 'react-bootstrap';
import {Outlet, Link} from 'react-router-dom';
import Home from '../../pages/home';
import Productos from '../../pages/productos';
import Ofertas from '../../pages/ofetas';
import Nosotros from '../../pages/nosotros';
import Login from '../../common/login';
import Logo from '../../common/logo'
import Register from '../../common/formRegister';


function NavbarComponent() {
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
              <Nav.Link as={Link} to="/Home" className="nav-link-custom">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Productos" className="nav-link-custom">
                Productos
              </Nav.Link>
              <Nav.Link as={Link} to="/Ofertas" className="nav-link-custom">
                Ofertas
              </Nav.Link>
              <Nav.Link as={Link} to="/Nosotros" className="nav-link-custom">
                Nosotros
              </Nav.Link>
            </Nav>
            <Login />
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
      <section>
        <Outlet></Outlet>
      </section>
    </>
  );
}

export default NavbarComponent;