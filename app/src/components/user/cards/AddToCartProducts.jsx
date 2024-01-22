import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { RiAddFill } from "react-icons/ri";
import { TiMinus } from "react-icons/ti";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useCarShop } from "../../../hook/CarShopContext";
import { MdAddShoppingCart } from "react-icons/md";

export const AddToCartProducts = ({ producto }) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCarShop();

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Funcion para decermento de los productos dentro del car, analizar para otro component
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleAddToCart = () => {
    addToCart({ ...producto, cantidad: quantity });

    // Obtener el carrito actualizado después de agregar el producto
    const updatedCart = [{ ...producto, cantidad: quantity }];

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setShowModal(false);
    setQuantity(1);
  };

  return (
    <>
      <MdAddShoppingCart className="mt-3 icon-add-car" onClick={() => setShowModal(true)} />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-comprar">
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title className="title">Detalles del producto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body-modal-comprar">
          <img src={producto.image} alt="" className="img-modal" />
          <div className="info-product-modal">
            <p className="txt">{producto.description}</p>
            <p className="txt"> Valor unidad $: {producto.valor}</p>
            <div className="quantity">
              <button className="decrement" onClick={handleDecrement}>
                <TiMinus />
              </button>
              <Form.Control
                type="number"
                min="1"
                max="100"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button className="increment" onClick={handleIncrement}>
                <RiAddFill />
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Button variant="primary" onClick={handleAddToCart}>
            Añadir al carrito <MdOutlineAddShoppingCart />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
