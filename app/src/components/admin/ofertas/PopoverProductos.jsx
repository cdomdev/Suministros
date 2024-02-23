import React, { useState } from "react";
import { Popover, Form, Button, Overlay } from "react-bootstrap";

export const PopoverProductos = ({
  listaProductos,
  handleProductSelection,
  selectedProducts,
  ref,
}) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleListoClick = () => {
    setShow(false);
  };

  return (
    <div ref={ref}>
      <Button variant="secondary" onClick={handleClick}>
        Seleccionar productos para la oferta
      </Button>
      <br />
      {selectedProducts.length > 0 && (
        <span style={{ color: "blue", fontSize: "16px" }}>
          Productos seleccionados: {selectedProducts.length}
        </span>
      )}
      <Overlay
        show={show}
        target={target}
        placement="left"
        container={ref}
        containerPadding={20}>
        <Popover id="popover-contained">
          <Popover.Header as="h3">
            Productos
            {/* <div className="content-filters">
              <Button>Marca</Button>
              <Button>Categoria</Button>
            </div>{" "} */}
          </Popover.Header>
          <Popover.Body>
            {Array.isArray(listaProductos) &&
              listaProductos.map((producto) => (
                <div key={producto.id} className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id={`producto-${producto.id}`}
                    label={`${producto.title} - ${producto.nombre} - ${producto.Inventarios[0].cantidad} Unidades`}
                    onChange={(e) => handleProductSelection(e, producto.id)}
                  />
                </div>
              ))}
            <Button onClick={handleListoClick}>Listo</Button>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};
