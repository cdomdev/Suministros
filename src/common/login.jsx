import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import imgFav from '../assets/img/favicon.png';
import Form from 'react-bootstrap/Form';
import RecoveryPassword from './recoveryPassword';
import '../styles/App.css';
import Register from './formRegister';
import axios from 'axios';


function BiPersonCircle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 16 16"
      {...props}
    >
      <g fill="currentColor">
        <path d="M11 6a3 3 0 1 1-6 0a3 3 0 0 1 6 0z" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        />
      </g>
    </svg>
  );
}

export { BiPersonCircle }; 



function LoginModal() {
  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowLoginModal = () => {
    setShowModal(true);
    setIsLoginMode(true);
  };

  const handleShowRegisterModal = () => {
    setShowModal(true);
    setIsLoginMode(false);
  };

  const renderContent = () => {
    if (isLoginMode) {
      return (
        <>
          <FormLogin />
          <button className='btn-alter-modal' onClick={handleShowRegisterModal}>
            Quiero registrarme
          </button>
        </>
      );
    } else {
      return (
        <>
          <Register />
          <button className='btn-alter-modal' onClick={handleShowLoginModal}>
            Ya tengo una cuenta
          </button>
        </>
      );
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowLoginModal} className='btn-modal-login'>
        <BiPersonCircle /> 
      </Button>
      <Modal show={showModal} onHide={handleCloseModal} className='content-modal-login'>
        <Modal.Header closeButton className='btn-close-custom'>
        </Modal.Header>
        <Modal.Body>
        {renderContent()}
        </Modal.Body>
        <Modal.Footer className='footer-modal-custom'>
      
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;


function FormLogin() {
  // const handleSubmit = async (values) => {
  //   try {
  //     const URL = 'http://localhost:3000/login';
  //     const response = await axios.post(URL, values);
  //     if (response.status === 1000) {
  //       setMessage('Registro exitoso');
  //       setTimeout(() =>{
  //         nanvigate('/Home')
  //       }, 2000); 
  //     } else {
  //       setMessage('El correo ya está registrado');
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 400 && error.response.data.error) {
  //       setMessage(error.response.data.error);
  //     } else {
  //       setMessage('Ocurrió un error al registrar el usuario');
  //     }
  //   }
  // };






  return (
    <Form className='login-form'>
      <img src={imgFav} className="fav-login"></img>
      <h3 className='text-form'>Bienvenido a suminsitros</h3>
      <Form.Group className="mb-3 form-login" controlId="formGroupEmail">
        <Form.Label>Direccion de correo electronico</Form.Label>
        <Form.Control type="email" placeholder="Email@example.com" />
      </Form.Group>
      <Form.Group className="mb-3 form-login" controlId="formGroupPassword">
        <Form.Label>Contraseña</Form.Label>
        <RecoveryPassword />
        <Form.Control type="password" placeholder="Contraseña" />
      </Form.Group>
      <Button variant="primary mt-3">Iniciar seccion</Button>
    </Form>
  );
}
 export {FormLogin};

