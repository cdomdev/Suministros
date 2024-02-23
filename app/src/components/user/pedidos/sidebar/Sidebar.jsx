import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const dataStorage = localStorage.getItem("userOnValidateScesOnline");
    if (dataStorage) {
      const dataUser = JSON.parse(dataStorage);
      setData(dataUser);
    }
  }, []);

  return (
    <>
      <div className="avatar">
        <Avatar
          alt={data.name}
          src={data.picture}
          sx={{ cursor: "pointer" }}
          className="avatar-icon"
        />
      </div>
      <div className="data">
        <h1>Hola!</h1>
        <span> {data.name}</span>
        <Nav className="flex-column">
          <Link to={"profile"}>Pefil</Link>
          <Link to={"details"}>Pedidos</Link>
          <Link>Salir</Link>
        </Nav>
      </div>
    </>
  );
};
