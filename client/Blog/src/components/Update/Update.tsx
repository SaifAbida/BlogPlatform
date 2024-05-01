import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UpdateUserType } from "../../Utils/Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import "./Update.css";

const formStyle = {
  width: "60%",
  margin: "50px auto",
  padding: "30px",
  border: "2px solid #3b3b3b6c",
  borderRadius: "5px",
};

const Update = () => {
  const [input, setInput] = useState<UpdateUserType>({
    username: "",
    email: "",
  });
  const token = localStorage.getItem("token");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .patch("http://127.0.0.1:8080/user/update", input, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((_) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Bad Request",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/user/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        const { username, email } = res.data;
        setInput({ username, email });
      });
  }, []);

  return (
    <div className="container-md">
      <Form onSubmit={handleSubmit} style={formStyle}>
        <h1 className="updateHeader">Update</h1>
        <Form.Label htmlFor="inputUsername5" style={{ marginTop: "10px" }}>
          Username
        </Form.Label>
        <Form.Control
          type="username"
          id="inputUsername5"
          name="username"
          value={input.username}
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <Form.Label htmlFor="inputEmail5" style={{ marginTop: "10px" }}>
          Email
        </Form.Label>
        <Form.Control
          type="email"
          id="inputEmail5"
          name="email"
          autoComplete="email"
          value={input.email}
          onChange={handleChange}
          required
        />
        <Button
          variant="outline-secondary"
          style={{ marginTop: "30px" }}
          type="submit"
        >
          Update
        </Button>
      </Form>
    </div>
  );
};

export default Update;
