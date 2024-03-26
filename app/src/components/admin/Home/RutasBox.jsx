import React from "react";
import { Link } from "react-router-dom";
import { IoBagAddSharp } from "react-icons/io5";
import { MdOutlineInventory, MdAssignmentAdd } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";

export const RutasBox = () => {
  return (
    <>
      <Link className="link-box" to="/admin/gestion/usuarios">
        <div className="box-rutas">
          <BsBoxSeam className="icon-box" />
          <div className="text-content">
            <h2>Ordenes de compra</h2>
            <span>Ver ordernes de compra</span>
          </div>
        </div>
      </Link>
      <Link className="link-box" to="/admin/añadir/productos">
        <div className="box-rutas">
          <IoBagAddSharp className="icon-box" />
          <div className="text-content">
            <h2>Productos</h2>
            <span>Agregar nuevos productos</span>
          </div>
        </div>
      </Link>
      <Link className="link-box" to="/admin/gestion/inventario">
        <div className="box-rutas">
          <MdOutlineInventory className="icon-box" />
          <div className="text-content">
            <h2>Inventario</h2>
            <span>Ver / actualizar inventario</span>
          </div>
        </div>
      </Link>
      <Link className="link-box" to="/admin/crear/ofertas">
        <div className="box-rutas">
          <BiSolidOffer className="icon-box" />
          <div className="text-content">
            <h2>Ofertas</h2>
            <span>Añadir / eliminar ofertas</span>
          </div>
        </div>
      </Link>
      <Link className="link-box" to="/admin/gestionar/categorias">
        <div className="box-rutas">
          <MdAssignmentAdd className="icon-box" />
          <div className="text-content">
            <h2>Categorias</h2>
            <span>Ver/ añadir / eliminar categorias</span>
          </div>
        </div>
      </Link>
      <Link className="link-box" to="/admin/gestionar/subcategorias">
        <div className="box-rutas">
          <MdAssignmentAdd className="icon-box" />
          <div className="text-content">
            <h2>Subcategorias</h2>
            <span>Ver/ añadir / eliminar Subcategorias</span>
          </div>
        </div>
      </Link>
     
    </>
  );
};
