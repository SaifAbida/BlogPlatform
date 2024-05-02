import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePost = () => {
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null); // Changed type to File
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Added state for image URL
  const { id } = useParams();
  const token = localStorage.getItem("token");

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setImage(event.target.files[0]);
      // Set a preview URL for the uploaded image
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        setContent(res.data.content);
        // Assuming the image path is returned from the API
        setImageUrl(`http://127.0.0.1:8080/images/${res.data.image}`);
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Bad Request",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, [id, token]);

  return (
    <div className="container-sm createPost">
      <Form style={{ marginLeft: "200px" }}>
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
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
          <input type="file"  onChange={handleChangeImage} />
        </Form.Group>
        <Button variant="dark" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdatePost;
