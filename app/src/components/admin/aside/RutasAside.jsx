import React from "react";
import { Link } from "react-router-dom";
import { IoBagAddSharp } from "react-icons/io5";
import { MdOutlineInventory, MdAssignmentAdd } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { BsPersonLinesFill } from "react-icons/bs";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";


export const RutasAside = () => {
  const renderTooltip = (text) => <Tooltip id="button-tooltip">{text}</Tooltip>;

  return (
    <div className="rutas">
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 150 }}
        overlay={renderTooltip("Home")}>
        <Link className="link-box" to="/admin">
          <div className="box-rutas-admin">
            <AiFillHome className="icon-box" />
          </div>
        </Link>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 150 }}
        overlay={renderTooltip("Ordenes de compras")}>
        <Link className="link-box" to="/admin/gestion/usuarios">
          <div className="box-rutas-admin">
          <BsBoxSeam className="icon-box" />
          </div>
        </Link>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 150 }}
        overlay={renderTooltip("Productos")}>
        <Link className="link-box" to="/admin/añadir/productos">
          <div className="box-rutas-admin">
            <IoBagAddSharp className="icon-box" />
          </div>
        </Link>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 150 }}
        overlay={renderTooltip("Inventario")}>
        <Link className="link-box" to="/admin/gestion/inventario">
          <div className="box-rutas-admin">
            <MdOutlineInventory className="icon-box" />
          </div>
        </Link>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 150 }}
        overlay={renderTooltip("Ofertas")}>
        <Link className="link-box" to="/admin/crear/ofertas">
          <div className="box-rutas-admin">
            <BiSolidOffer className="icon-box" />
          </div>
        </Link>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 150 }}
        overlay={renderTooltip("Categorias")}>
        <Link className="link-box" to="/admin/gestionar/categorias">
          <div className="box-rutas-admin">
            <MdAssignmentAdd className="icon-box" />
          </div>
        </Link>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 150 }}
        overlay={renderTooltip("Subcategorias")}>
        <Link className="link-box" to="/admin/gestionar/subcategorias">
          <div className="box-rutas-admin">
            <MdAssignmentAdd className="icon-box" />
          </div>
        </Link>
      </OverlayTrigger>
    </div>
  );
};
