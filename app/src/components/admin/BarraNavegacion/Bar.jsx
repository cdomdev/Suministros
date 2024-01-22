import React from "react";
import { IoBagAddSharp } from "react-icons/io5";
import { MdOutlineInventory, MdAssignmentAdd } from "react-icons/md";
import { BiSolidOffer} from "react-icons/bi";


export const Bar = () => {
  return (
    <div className="contenedor-bar">
      <MdOutlineInventory />
      <MdAssignmentAdd />
      <IoBagAddSharp className="icon-box" />
      <MdOutlineInventory className="icon-box" />
      <BiSolidOffer className="icon-box" />
    </div>
  );
};
