import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

export const FinnallyBuy = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {

    const dataUser = localStorage.getItem("dataUForFact");
    const date = JSON.parse(dataUser);
    setData(date);
    if(item){
        const items = localStorage.getItem("itemsUForFact");
        const itemsProducts = JSON.parse(items);
        setItem(itemsProducts);
    }
  }, []);

  const calculateTotal = () => {
    return item.reduce((total, item) => total + item.cantidad * item.valor, 0);
  };

  const handleDeleteLocal = () =>{
    navigate('/suministros/home')
    localStorage.clear()
  }

  return (
    <div class="ticket">
      <div className="header">
        <p class="ticket-text">GRACIAS POR TU COMPRA</p>
        <FaRegCheckCircle className="icon" />
      </div>
      <div className="body">
        <h2>Este es un resumen de tu pedido</h2>
        {item  && (
             <div className="productos">
             { item && item.map((producto) => (
               <>
                 <div className="unidad">
                   <div>
                     <span>Productos:</span>
                     <ul key={producto.id}>
                       <li>{producto.nombre}</li>
                       <li>Catidad: {producto.cantidad}</li>
                     </ul>
                   </div>
                   <div>
                     <span>Precio</span>
                     <ul>
                       <li>{producto.valor}</li>
                     </ul>
                   </div>
                 </div>
               </>
             ))}
           </div>
        )}
        <hr />
        <div className="total">
          <span>total: {calculateTotal()} </span>
        </div>
        <hr />
        <div className="datos-envio">
          <div>
            <span>Direccion de facturacion</span>
            <p>{data.direccion}</p>
            <p>{data.detalles}</p>
          </div>
          <div>
            <span>Datos del comprador</span>
            <p>
              {data.nombre} {data.apellidos}
            </p>
            <p>{data.telefono}</p>
            <p>{data.email}</p>
          </div>
        </div>
        <hr />
        <div className="footer">
          <p>
            Su pedido estara listo de 3 a 5 dias habiles para municipio o
            ciudades cercanas a bogota y de 5 a 8 dias habiles para destino
            nacionales.
          </p>
        </div>
      </div>
      <div className="btn-content">
      <Button variant="secondary" onClick={handleDeleteLocal}>Volver al incio</Button>
      </div>
    </div>
  );
};
