import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";
import { useUser } from "../../../hook";

export const UserProfile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { logout } = useUser();

  useEffect(() => {
    const userDataStorage = localStorage.getItem("userOnValidateScesOnline");
    if (userDataStorage) {
      const userDataInfo = JSON.parse(userDataStorage);
      setData(userDataInfo);
    }
  }, []);

  const loginOff = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    logout();
    navigate("/suministros/home");
  };

  const renderProfileImage = () => {
    if (
      data &&
      data.name &&
      typeof data.name === "string" &&
      data.name.length > 0
    ) {
      if (data.picture) {
        return (
          <Avatar
            alt={data.name}
            src={data.picture}
            sx={{ cursor: "pointer" }}
          />
        );
      } else {
        // Si no hay imagen de perfil, mostrar la primera letra del nombre
        return (
          <Avatar sx={{ bgcolor: "#f50057", color: "#fff", cursor: "pointer" }}>
            {data.name.charAt(0)}
          </Avatar>
        );
      }
    } else {
      // Si no hay datos de usuario, puedes mostrar un Avatar con una letra genérica o un componente de carga
      return (
        <Avatar
          alt="Usuario"
          sx={{ bgcolor: "#f50057", color: "#fff", cursor: "pointer" }}>
          U
        </Avatar>
      );
    }
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover id={`popover-positioned-bottom`} style={{ width: "270px" }}>
          <Popover.Body className="popover-user-profile">
            <span className="name-user-profile">{data.name}</span>
            <Button className="btn-profile-users" onClick={loginOff}>
              <AiOutlinePoweroff className="icon-btn-off" />
              Cerrar sesión
            </Button>
          </Popover.Body>
        </Popover>
      }>
      {renderProfileImage()}
    </OverlayTrigger>
  );
};
