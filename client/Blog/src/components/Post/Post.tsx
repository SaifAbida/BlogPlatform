import Card from "react-bootstrap/Card";
import "./Post.css";
import { PostPropsType } from "../../Utils/Types";

const cardTitleStyle = {
  fontSize: "25px",
  marginBottom: "0",
  fontWeight: "bold",
};

function Post({ content, image, created_at, creatorName }: PostPropsType) {
  return (
    <div className="d-flex justify-content-around post">
      <Card
        style={{ width: "40rem" , border : "none"}}
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
      >
        <Card.Body style={{ paddingTop: "15px", paddingLeft: "30px" }}>
          <Card.Title style={cardTitleStyle}>{creatorName}</Card.Title>
          <Card.Text style={{ fontSize: "13px", color: "gray" }}>
            {created_at.toString()}
          </Card.Text>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
        {image && <Card.Img src={image} style={{borderRadius : "5px"}} />}
      </Card>
    </div>
  );
}

export default Post;
