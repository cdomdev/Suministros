import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Avatar from "@mui/material/Avatar";
import { AiOutlinePoweroff } from "react-icons/ai";

export const UserProfile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  
  const userDataStorage = localStorage.getItem('userSesionToken');



  const logout = () => {
    localStorage.removeItem("userSesionToken");
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    navigate("/suministros/home");
  };

  if (userDataStorage) {
    const { name, picture } = JSON.parse(userDataStorage);

    return (
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id={`popover-positioned-bottom`} style={{ width: '270px' }}>
            <Popover.Body className='popover-user-profile'>
              <span className='name-user-profile'>{name}</span>
              <Button className='btn-profile-users' onClick={logout}>
                <AiOutlinePoweroff className='icon-btn-off' />
                Cerrar sesión
              </Button>
            </Popover.Body>
          </Popover>
        }
      >
        <Avatar alt={name} src={picture} sx={{ cursor: 'pointer' }} />
      </OverlayTrigger>
    );
  } else {
    // En caso de que no haya datos de usuario, podrías manejarlo como desees
    return null; // O podrías renderizar algo indicando que no hay usuario logueado
  }
};
