import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

export const AddToCar = () => {
  const navigate = useNavigate();

  const navegateStore = () => {
    navigate("/suministros/cocinas");
  };
  return (
    <div className="car-empty">
      <span>Tu carrito esta vacio.</span>
      <span>
        Navega y añade nuevos productos para verlos aqui.
      </span>
      <div>
        <Button className="mt-4" onClick={navegateStore}>
          Agregar productos al carrito
        </Button>
      </div>
    </div>
  );
};
