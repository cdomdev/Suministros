import React, {useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import { GriferiasCard } from "../cards";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";

export const Griferias = () => {
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
          <Link to="/suministros/griferias">Griferias</Link>
        </Breadcrumbs>
        <div className="container-productos">
          <h1>
            TRANSFORMA TU COCINA Y BAÑO CON NUESTRAS GRIFERIAS DE ULTIMA
            GENERACION
          </h1>
          <p>
            Con una variedad de estilos y acabados, nuestras griferías no solo
            son elegantes, sino también duraderas y funcionales
          </p>
          <div className="contenedor-grid-products">
            <GriferiasCard />
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
