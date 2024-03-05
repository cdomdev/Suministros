import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

export const PedidosUser = () => {
  const [pedidos, setPedidos] = useState([]);
  const [dataLocal, setDataLocal] = useState({});

  useEffect(() => {
    const dataStorage = localStorage.getItem("userOnValidateScesOnline");
    if (dataStorage) {
      const parseData = JSON.parse(dataStorage);
      setDataLocal(parseData);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/listar/pedidos/${dataLocal.email}`
        );
        if (response.status === 200) {
          setPedidos(response.data.pedidos);
        }
      } catch (e) {
        console.log("Error al obtener los datos", e);
      }
    };

    const email = dataLocal.email;
    if (email) {
      fetchData();
    }
  }, [dataLocal.email]);

  return (
    <div className="body-deatils">
      <h1>Mis compras</h1>
      <Link to={"/suministros/user/"}>
        {" "}
        <BiArrowBack className="icon" />
        Atras
      </Link>
      <div className="table-pedidos">
        {Array.isArray(pedidos) && pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-contenedor">
              {pedido.detalles_pedidos.map((detalle) => (
                <div key={detalle.id} className="body-pedido">
                  <img
                    src={detalle.Producto.image}
                    alt={detalle.Producto.nombre}
                  />
                  <div className="d-flex flex-column text-body">
                    <p>{detalle.Producto.nombre}</p>
                    <p>
                      <strong>REF:</strong>
                      {detalle.Producto.referencia}
                    </p>
                    <p>
                      <strong>Valor unidad:</strong> {detalle.Producto.valor}
                    </p>
                  </div>
                </div>
              ))}
              <div className="footer-table">
                <strong> Cantidad compradas:</strong> {pedido.cantidad} -   <strong>Valor total:</strong>
                {pedido.total}
              </div>
            </div>
          ))
        ) : (
          <p>Cargando pedidos...</p>
        )}
      </div>
    </div>
  );
};
