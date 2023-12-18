import React from "react";
import Avatar from "@mui/material/Avatar";
import Svg from '../assets/svgProfileDefault.svg'

const UserPrueba = ({ user }) => {
 
  return (
    <div>
      {/* Puedes ajustar el tamaño con la propiedad 'sx' */}
      <Avatar alt={user.name} src={<Svg />}  />
      {/* componente para perfil de usuario */}
      {/* <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 64, height: 64 }} /> */}
      {/* Agrega el nombre de usuario u otra información */}
    </div>
  );
};


export default UserPrueba;
