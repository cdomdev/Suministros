import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";

export const UserProfile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const userDataStorage = localStorage.getItem("userSesionToken");
    if (userDataStorage) {
      const userDataArray = JSON.parse(userDataStorage);
      const userData = JSON.parse(userDataArray[0]);
      setData(userData);
    }
  }, []);
  console.log(data);
  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/suministros/home");
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover id={`popover-positioned-bottom`} style={{ width: "270px" }}>
          <Popover.Body className="popover-user-profile">
            <span className="name-user-profile">{data.name}</span>
            <Button className="btn-profile-users" onClick={logout}>
              <AiOutlinePoweroff className="icon-btn-off" />
              Cerrar sesión
            </Button>
          </Popover.Body>
        </Popover>
      }>
      <Avatar alt={data.name} src={data.picture} sx={{ cursor: "pointer" }} />
    </OverlayTrigger>
  );
};
