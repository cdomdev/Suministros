import React, { useState, useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { BiHomeAlt2 } from "react-icons/bi";
import {CardCategorias} from  '../cards';


export const CocinasCategoria = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <section>
      <div className="migajas">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb">
          <Link to="/suministros/home">
            <BiHomeAlt2 className="icon" />
          </Link>
          <Link to="/suministros/cocinas">Cocinas</Link>
        </Breadcrumbs>
      </div>
      <div className="container-productos">
        <div className="contenedor-grid-products">
          <div className="content-text">
          </div>
          <CardCategorias rutaCategoria={'cocinas'} nombreCategoria={'Cocinas'}/>
        </div>
      </div>
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
