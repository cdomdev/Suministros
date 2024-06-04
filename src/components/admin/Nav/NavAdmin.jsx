import Container from "react-bootstrap/Container";
import {  Navbar } from "react-bootstrap";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useUser } from "../../../hook";
import { AiOutlinePoweroff, IoIosPerson } from "../../../assets/icons/reactIcons";
import LogoImg from "../img/logo.webp";

const NavAdmin = () => {
  const { logout } = useUser();
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/admin");
  };

  const finnalySection = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/suministros/home')
    setTimeout(() => {
      logout();
    }, 2000);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className=" bg-body-tertiary nav-custome-admin w-100"
        fixed="top">
        <Container className="custom-navbar nav-layout-admin">
          <Link to="/admin" >
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
      <section style={{ marginTop: "6em" }} className="section-admin">
        <Outlet />
      </section>
    </>
  );
};

export default NavAdmin;