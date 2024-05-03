import { Button, Form } from "react-bootstrap";
import "./CreatePost.css";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [image, setImage] = useState<any | null>(null);
  const [content, setContent] = useState<string>("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("content", content);

    axios
      .post("http://127.0.0.1:8080/post/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post created successfully",
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
        <h1 className="createPostHeader">Create a post:</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>What's on your mind ?</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            style={{ width: "70%" }}
            onChange={(e) => setContent(e.target.value)}
          />
          <input type="file" onChange={handleChangeImage} />
        </Form.Group>
        <Button variant="dark" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreatePost;
