import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { getDataStorage, LoaderComponent } from "../../../../../utils";
import { API_HOST } from "../../../../../config/config";

const PedidosUser = () => {
  const [pedidos, setPedidos] = useState([]);
  const [dataLocal, setDataLocal] = useState({});

  useEffect(() => {
    setDataLocal(getDataStorage("userOnValidateScesOnline"));
  }, []);

  console.log(pedidos);
  console.log(dataLocal);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_HOST}/user/listar-pedidos/${dataLocal.id}`
        );
        if (response.status === 200) {
          console.log(response.data);
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
                    <p>
                      {" "}
                      <strong>Producto:</strong> {detalle.Producto.nombre}
                    </p>
                    <p>
                      <strong>Valor unidad:</strong> {detalle.Producto.valor}
                    </p>
                    <p>
                      <strong>Ref: </strong>
                      {detalle.Producto.referencia}
                    </p>
                  </div>
                </div>
              ))}
              <div className="footer-table">
                <strong> Cantidad compradas:</strong> {pedido.cantidad} -{" "}
                <strong>Valor total:</strong>
                {pedido.total}
              </div>
            </div>
          ))
        ) : (
          <LoaderComponent />
        )}
      </div>
    </div>
  );
};

export default PedidosUser;