// CarShopContext.js

import React, { createContext, useContext, useState } from 'react';

const CarShopContext = createContext();

export const useCarShop = () => {
  return useContext(CarShopContext);
};

export const CarShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [activeStep, setActiveStep] = useState(0);


  const addToCart = (productToAdd) => {
    const productId = productToAdd.id;

    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cartItems.findIndex((item) => item.id === productId);

    if (existingProductIndex !== -1) {
      // Si el producto existe, actualizar la cantidad
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].cantidad += productToAdd.cantidad;
      setCartItems(updatedCartItems);
    } else {
      // Si el producto no existe, añadirlo al carrito
      setCartItems([...cartItems, productToAdd]);
    }
  };

  const deleFromCar = (productId) => {
    console.log(productId);
    const updatedCarItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCarItems);
  };
  

  const setStep = (step) => {
    setActiveStep(step);
  };

  return (
    <CarShopContext.Provider value={{ cartItems, addToCart, activeStep, setStep, deleFromCar}}>
      {children}
    </CarShopContext.Provider>
  );
};