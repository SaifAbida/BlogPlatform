import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePost = () => {
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<any | null>(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  }
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        setContent(res.data.content);
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Bad Request",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/profile");
      });
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }
    axios
      .patch(`http://127.0.0.1:8080/post/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/profile");
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid input",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  return (
    <div className="container-sm createPost">
      <Form style={{ marginLeft: "200px" }} onSubmit={handleSubmit}>
        <h1 className="createPostHeader">Update your post:</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>What's on your mind ?</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            style={{ width: "70%" }}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            required
          />
          <input type="file" onChange={handleChangeImage} />
        </Form.Group>
        <Button variant="dark" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdatePost;
