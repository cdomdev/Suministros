import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useUser } from "../../../hook";
import { IoIosPerson } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
import LogoImg from "../img/logo.webp";

export const NavAdmin = () => {
  const { logout } = useUser();

  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/admin");
  };

  const finnalySection = () => {
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      logout();
    }, 5000);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className=" bg-body-tertiary nav-custome-admin w-100"
        fixed="top">
        <Container className="custom-navbar nav-layout-admin">
          <Link to="/admin" onClick={redirectToHome}>
            <img src={LogoImg} alt="img-logo" className="logotipo" />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="box-infor-admin">
              <div className="admin" onClick={redirectToHome}>
                <IoIosPerson className="icon" />
                ADMIN
              </div>
              <div className="logout">
                <button onClick={finnalySection}>
                  Cerrar sesion <AiOutlinePoweroff />
                </button>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section style={{ marginTop: "6em" }}>
        <Outlet />
      </section>
    </>
  );
};
