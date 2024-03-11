import React, { useEffect, useState } from "react";
import { RiAddFill } from "react-icons/ri";
import { TiMinus } from "react-icons/ti";
import { Form, Button } from "react-bootstrap";
import { useCarShop } from "../../../hook/CarShopContext";
import { IoCartOutline } from "react-icons/io5";
import { SaveStorage } from "../../../utils/SaveStorage";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

export const DetallesProducto = () => {
  const [relacionado, setRelacionado] = useState([]);
  const [producto, setProducto] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItemCount, setCartItemCount] = useState(0);

  const { addToCart, cartItems } = useCarShop();

  useEffect(() => {
    const productoGuardado = localStorage.getItem("selectedProduct");
    const categoryRelacionada = localStorage.getItem("categroyselectedProduct");

    if (productoGuardado) {
      setProducto(JSON.parse(productoGuardado));
    }
    if (categoryRelacionada) {
      setRelacionado(JSON.parse(categoryRelacionada));
    }
  }, []);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  if (!producto) {
    return <div style={{ textAlign: "center" }}>Cargando...</div>;
  }


  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

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
    SaveStorage("cartItems", JSON.stringify(updatedCart));
    // localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    setQuantity(1);
  };

  // Renderizar los detalles del producto
  return (
    <div>
      <section>
        <div className="container-details">
          <div className="detail-img">
            <img src={producto.image} alt="img" />
            <div>
              <span className="txt">
                las fotografías de productos y ambientes son ilustrativas, los
                colores y texturas pueden variar según el dispositivo donde se
                visualicen y pueden diferir de la realidad. Los elementos
                ambientados no se incluyen en la compra.
              </span>
            </div>
          </div>
          <div className="details">
            <div className="ref">
              <strong>{producto.title}</strong>
              <span className="r"> REF: {producto.referencia}</span>
            </div>
            <strong>{producto.nombre}</strong>
            <div className="valor">
              <strong>Precio:</strong>
              <span>$ {producto.valor}</span>
            </div>
            <div className="text">
              <p>{producto.description}</p>
            </div>

            <div className="contendor-quantity">
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
              <Button variant="primary" onClick={handleAddToCart}>
                Añadir al carrito
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h3 className="text-center mt-3">Productos relacionados</h3>
          <div className="sideProducts-relacionados">
            <CarProductsRelationados relacionado={relacionado} />
          </div>
        </div>
      </section>
      {cartItemCount > 0 && (
        <Link to="/suministros/car" className="link">
          <div className="icon-container">
            <div className="insignia">{cartItemCount}</div>
            <TiShoppingCart className="icon-car" />
          </div>
        </Link>
      )}
    </div>
  );
};

const CarProductsRelationados = ({ relacionado }) => {
  const { addToCart } = useCarShop();

  const handleAgregarAlCarrito = (producto) => {
    addToCart({ ...producto, cantidad: 1 });
  };

  return (
    <>
      <div className="contenedor-card">
        {relacionado.map((producto) => (
          <ul key={producto.id} className="card-products">
            <span className="text-ref">REF: {producto.referencia}</span>
            <img
              src={producto.image}
              alt="not found"
              className="img-products"
            />
            <div className="contenido-card">
              <li className="title">{producto.title}</li>
              <li className="text">{producto.nombre}</li>
              <li className="valor">
                $ {producto.valor} <span className="unidad"></span>
              </li>
            </div>
            <div className="icons">
              <IoCartOutline
                className="icon"
                onClick={() => handleAgregarAlCarrito(producto)}
              />
            </div>
          </ul>
        ))}
      </div>
    </>
  );
};
