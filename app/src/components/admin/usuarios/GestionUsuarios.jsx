import React, { useEffect, useState } from "react";
import { NavAdmin } from "../Nav/NavAdmin";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Bar } from "../BarraNavegacion/Bar";

export const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // solicitud al servido
    try {
      axios
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
  }, []);

  return (
    <>
    <header>
    <NavAdmin />
    </header>
   
      <div className="body-components-admin">
        <div className="layout-admin-user">
          <h1 className="title-user-layout"> Usuarios</h1>
          <div className="table-user-admin">
            <Table striped bordered hover size="sm" responsive>
              <thead>
                <tr>
                  <th className="thead-table-users">Id</th>
                  <th className="thead-table-users">Nombre</th>
                  <th className="thead-table-users">E-mail</th>
                  <th className="thead-table-users">Role</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
