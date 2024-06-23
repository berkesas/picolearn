import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";

export default function BookTile(props) {
  const book = props.data;
  return (
    <Card className="booktile">
      <Card.Img variant="top" src={book.image} className="tile_image" />
      <Card.Body>
        <Card.Title>{book.data.title}</Card.Title>
        {/* <Card.Text>{book.data.description}</Card.Text> */}
      </Card.Body>
      <Card.Footer>
        <Button variant="outline-secondary" size="sm" onClick={props.onViewClick}>
        <i class="bi bi-easel"></i>
        </Button>{" "}
        <Button variant="outline-danger" size="sm" onClick={props.onDeleteClick}>
        <i class="bi bi-trash3"></i>
        </Button>{" "}
      </Card.Footer>
    </Card>
  );
}
