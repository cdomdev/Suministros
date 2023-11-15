import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function RecoveryPassword() {
  const [showModal, setShowModal] = useState(false);
  const [setEmail] = useState(''); 

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const emailRecovery = (e) =>{
    alert(e.target.value)
  }
  const handleSendRecoveryEmail = () => {
    const recoveryEmail = document.getElementById('form-control-recovery'); 
    const txtWarning = document.getElementById('txt-warning'); 
  
    if (recoveryEmail.value.trim() === '') {
      txtWarning.style.display = 'block';
    } else {
      txtWarning.style.display = 'none';
      alert('Email de recuperación enviado');
    }
  };

  return (
    <>
      <Button variant="link" onClick={handleShowModal} className='btn-recovery'>
        Olvidé mi contraseña
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} className='modal-recovery'>
        <Modal.Header closeButton className='btn-close-custom'>
          <Modal.Title>Recuperar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRecovery />
        </Modal.Body>
        <Modal.Footer className='footer-modal-custom' >
          <Button variant="primary" onClick={handleSendRecoveryEmail}>
            Enviar Email de Recuperación
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RecoveryPassword;



function FormRecovery() {
  return (
    <Form>
      <p className='form-login'>Ingrese la dirección de correo electrónico.
        Las instrucciones sobre cómo restablecer la contraseña se enviarán a esa dirección</p>
      <Form.Group className="mb-3 form-login" >
        <Form.Control type="email" placeholder="Email@example.com" required={true} id='form-control-recovery'/>
        <p className='txt-warning' id='txt-warning'>¡El compo no puede quedar vacio!</p>
        <Form.Text className="text-muted">
         Nunca compartiremos su correo electronico con nadie mas.
        </Form.Text>
      </Form.Group>
    </Form>
  );
}


export {FormRecovery};