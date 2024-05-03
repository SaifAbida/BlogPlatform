import { Button, Form } from "react-bootstrap";
import { registerType } from "../../Utils/Types";
import "./Register.css";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<registerType>({
    username: "",
    email: "",
    password: "",
  });

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
      .post("http://127.0.0.1:8080/user/register", input)
      .then((_: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Account created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch((_) => {
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
    <div className="registerContainer">
      <Form
        style={{ width: "40%", margin: "160px auto" }}
        onSubmit={handleSubmit}
      >
        <h1 className="registerTitle">Register</h1>
        <Form.Label htmlFor="inputUsername5" style={{ marginTop: "10px" }}>
          Username
        </Form.Label>
        <Form.Control
          type="username"
          id="inputUsername5"
          name="username"
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
          onChange={handleChange}
          required
        />
        <Form.Label htmlFor="inputPassword5" style={{ marginTop: "10px" }}>
          Password
        </Form.Label>
        <Form.Control
          type="password"
          id="inputPassword5"
          name="password"
          autoComplete="current-password"
          onChange={handleChange}
          required
        />
        <Button
          variant="outline-secondary"
          style={{ marginTop: "30px" }}
          type="submit"
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
