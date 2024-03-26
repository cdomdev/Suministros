import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:3000/api/listar/usuarios")
          .then((response) => {
            // Manejar la respuesta exitosa
            setUsuarios(response.data.usuarios);
          })
          .catch((error) => {
            // Manejar errores en la solicitud
            console.error("Error al obtener usuarios:", error);
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
        <h2 className="text-center">Usuarios</h2>
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
        {usuarios
            .filter((usuario) => usuario.tienePedidos)
            .map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
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
