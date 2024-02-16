import React, {useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import { SanitariosCard } from "../cards";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";

export const Sanitarios = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <section>
      <Container>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="medium" />}
          aria-label="breadcrumb">
          <Link to="/suministros/home">Home</Link>
          <Link to="/suministros/sanitarios">Sanitarios</Link>
        </Breadcrumbs>
        <div className="container-productos">
          <h1>
            EXPLORA NUESTRA VARIEDAD DE SANITARIOS QUE COMBINAN ESTILO Y
            FUNCIONALIDAD
          </h1>
          <p>
            Desde inodoros elegantes hasta bidés prácticos, nuestra colección
            ofrece opciones para todo tipo de baños
          </p>
          <div className="contenedor-grid-products">
            <SanitariosCard />
          </div>
        </div>
      </Container>
      {cartItemCount > 0 && (
        <Link to={"/suministros/car"}>
          <div class="icon-container">
            <div className="insignia">{cartItemCount}</div>
            <TiShoppingCart className="icon-car" />
          </div>
        </Link>
      )}
    </section>
  );
};
