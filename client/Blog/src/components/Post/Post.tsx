import Card from "react-bootstrap/Card";
import "./Post.css";

function Post() {
  return (
    <div className="d-flex justify-content-around post">
      <Card style={{ width: "40rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Username</Card.Title>
          <Card.Text>date</Card.Text>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Post;
