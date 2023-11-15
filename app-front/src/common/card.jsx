
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardComponent(props) {
const { imageSrc, text, description, txtButton} = props;
  return (
    <Card className='card'>
      <Card.Body>
      <Card.Img variant="top" src={imageSrc} />
        <span>{text}</span>
        <p>{description}</p>
        <Button variant="primary">{txtButton}</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;




/*

import React, { useState, useEffect } from 'react';

function CardComponent({ cardId }) {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    // Simulación de carga de datos desde la base de datos
    // En un entorno real, reemplaza esto con una solicitud real a tu base de datos
    async function fetchData() {
      try {
        const response = await fetch(`https://api.example.com/cards/${cardId}`);
        if (!response.ok) {
          throw new Error('No se pudo cargar los datos de la tarjeta');
        }
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [cardId]);

  if (!cardData) {
    return <div>Cargando...</div>;
  }

  const { image, title, description } = cardData;

  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Comprar</button>
    </div>
  );
}

export default CardComponent; */
