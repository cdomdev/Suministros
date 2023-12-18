
import {Button, Card} from 'react-bootstrap';
import img from '../assets/img/favicon.png'

export const  CardComponent = () => {
  return (
    <Card  className='card'>
      <Card.Body>
      <Card.Img src={img} alt='img' />
        <Card.Title>Card Title</Card.Title>
        <Card.Text> 
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

