import React, { useState, useEffect } from "react";
import { LoginModal } from "../../autenticacion/LoginModal";
import { ModalEntrega } from "../../Modal/ModalEntrega";
import { useCarShop } from "../../../../hook";
import { isAuthenticated } from "../../../../auth";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { BoxText } from "./BoxText";

export const Summary = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const { cartItems, activeStep, setStep } = useCarShop();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [isLoggedIn]);

  function handleContinue() {
    navigate("/suministros/entrega");
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.cantidad * item.valor,
      0
    );
  };

  const handleContinueClick = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if (!isAuthenticated() && !continueAsGuest) {
      setShowAuthModal(true);
    } else {
      handleContinue();
      setStep(activeStep + 1);
    }
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <BoxText />
      ) : (
        <div className="box4">
          <span className="subtotal">Subtotal: </span>
          <strong>
            {cartItems.reduce(
              (total, item) => total + item.cantidad * item.valor,
              0
            )}
          </strong>
          <hr />
          <h3>
            Total a pagar <span className="line"> ----------- </span> $
            {calculateTotal()}
          </h3>
          <span className="costo">El costo de envío no está incluido</span>
          <hr />
          <div className="cont-btn">
            <Button className="btn-comtinue" onClick={handleContinueClick}>
              Continuar
            </Button>
          </div>
          <hr />
          <BoxText />
          {showAuthModal && (
            <div>
              <ModalEntrega
                variant="primary"
                className="d-none"
                show={showAuthModal}
                handleShow={() => setShowAuthModal(true)}
                handleClose={() => setShowAuthModal(false)}
                content={content({
                  setIsLoggedIn,
                  setShowAuthModal,
                  handleContinue,
                  setContinueAsGuest,
                  setStep,
                })}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

const content = ({
  setIsLoggedIn,
  setShowAuthModal,
  handleContinue,
  setContinueAsGuest,
  setStep,
}) => {
  const handleContinueAsGuest = () => {
    setContinueAsGuest(true);
    setShowAuthModal(false);
    handleContinue();
    setStep((prevStep) => prevStep + 1);
  };
  return (
    <div className="outh">
      <h2>Inicia sesion y guarda el registro de tus compras</h2>
      <div className="btn-content">
        <LoginModal
          setIsLoggedIn={(isLoggedIn) => {
            setIsLoggedIn(isLoggedIn);
            if (isLoggedIn) {
              setShowAuthModal(false);
              handleContinue();
            }
          }}
          controlComponent={(handleShow) => (
            <Button onClick={handleShow} className="btn">
              Iniciar sesión
            </Button>
          )}
        />
        <Button className="btn" onClick={() => handleContinueAsGuest()}>
          continuar como invitado
        </Button>
      </div>
    </div>
  );
};
