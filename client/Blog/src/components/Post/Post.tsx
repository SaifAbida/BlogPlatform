import Card from "react-bootstrap/Card";
import "./Post.css";
import { PostPropsType } from "../../Utils/Types";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import axios, { AxiosResponse } from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const cardTitleStyle = {
  fontSize: "25px",
  marginBottom: "0",
  fontWeight: "bold",
};

function Post({
  content,
  image,
  created_at,
  creatorName,
  id,
  creator_id,
  user_id,
  deletePost,
}: PostPropsType) {
  const token = localStorage.getItem("token");

  function handleClick() {
    Swal.fire({
      title: "Are you sure you want to delete this post?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3b3b3b",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8080/post/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res: AxiosResponse) => {
            deletePost(id);
            Swal.fire({
              title: "Deleted!",
              text: res.data.message,
              icon: "success",
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Oops! something went wrong",
              icon: "error",
            });
          });
      }
    });
  }

  return (
    <div className="d-flex justify-content-around post">
      <Card
        style={{ width: "40rem", border: "none" }}
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
      >
        <Card.Body style={{ paddingTop: "15px", paddingLeft: "30px" }}>
          <div className="PostHeaderDiv">
            <Card.Title style={cardTitleStyle}>{creatorName}</Card.Title>
            {user_id === creator_id && (
              <div>
                <Link
                  to={`/update/${id}`}
                  style={{ color: "black", marginRight: "20px" }}
                >
                  <EditIcon />
                </Link>
                <DeleteIcon
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
          </div>
          <Card.Text style={{ fontSize: "13px", color: "gray" }}>
            {created_at.toString()}
          </Card.Text>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
        {image && (
          <Card.Img
            src={`http://127.0.0.1:8080/uploads/${image}`}
            style={{ borderRadius: "5px", maxHeight: "1000px" }}
          />
        )}
      </Card>
    </div>
  );
}

export default Post;
