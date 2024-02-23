import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

export const AddToCar = () => {
  const navigate = useNavigate();

  const navegateStore = () => {
    navigate("/suministros/productos");
  };
  return (
    <div className="car-empty">
      <span>Tu carrito esta vacio.</span>
      <span>
        Visita la seccion de productos y añade uno nuevo a tu carrito.
      </span>
      <div>
        <Button className="mt-4" onClick={navegateStore}>
          Agregar productos al carrito
        </Button>
      </div>
    </div>
  );
};
