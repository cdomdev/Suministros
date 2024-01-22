import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { BoxText } from "./BoxText";
import { useNavigate } from "react-router";
import { useCarShop } from "../../../../hook/CarShopContext";
import { isAuthenticated } from "../../../../auth/Auth";
import { ModalEntrega } from "../../Modal/ModalEntrega";
import { LoginModal } from "../../autenticacion/LoginModal";

// Componente resumen de compra

export const Summary = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const { cartItems, activeStep, setStep } = useCarShop();
  const [showAuthModal, setShowAuthModal] = useState(false);
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

  const handleContinueClick = async () => {
    try {
      if (isAuthenticated()) {
        setStep(activeStep + 1);
        await handleContinue();
      } else {
        setShowAuthModal(true);
      }
    } catch (e) {
      console.log(e);
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
          <span className="subtotal">
            Subtotal:
            {cartItems.reduce(
              (total, item) => total + item.cantidad * item.valor,
              0
            )}
          </span>
          <br />
          <span>Costo envío:</span>
          <hr />
          <h3>
            Total a pagar <span className="line">-----------</span> $
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
            <ModalEntrega
              texto={"Inicio de sesión"}
              variant="primary"
              className="d-none"
              show={showAuthModal}
              handleShow={() => setShowAuthModal(true)}
              handleClose={() => setShowAuthModal(false)}
              content={content({
                setIsLoggedIn,
                setShowAuthModal,
                handleContinue,
              })}
            />
          )}
        </div>
      )}
    </>
  );
};

function content({ setIsLoggedIn, setShowAuthModal, handleContinue }) {
  return (
    <>
      <LoginModal
        setIsLoggedIn={(isLoggedIn) => {
          setIsLoggedIn(isLoggedIn);
          if (isLoggedIn) {
            setShowAuthModal(false);
            handleContinue();
          }
        }}
        controlComponent={(handleShow) => (
          <Button variant="primary" onClick={handleShow}>
            Iniciar sesión
          </Button>
        )}
      />
    </>
  );
}
