import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";

export const Invitados = () => {
  const [invitados, setInvitados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:3000/api/listar/invitados")
          .then((response) => {
            // Manejar la respuesta exitosa
            setInvitados(response.data.invitados);
          })
          .catch((error) => {
            // Manejar errores en la solicitud
            console.error("Error al obtener invitados:", error);
          });
      } catch (error) {
        // Manejar otros errores
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table-user">
      <h2 className="text-center">Invitados</h2>
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th className="thead-table-users">Id</th>
            <th className="thead-table-users">Nombre</th>
            <th className="thead-table-users">E-mail</th>
            <th className="thead-table-users">Pedidos</th>
          </tr>
        </thead>
        <tbody>
          {invitados
            .filter((invitado) => invitado.tienePedidos)
            .map((invitado) => (
              <tr key={invitado.id}>
                <td>{invitado.id}</td>
                <td>{invitado.nombre}</td>
                <td>{invitado.email}</td>
                <td>
                  <Link to={"/admin/gestionar/pedidos"}>Tiene pedidos</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
