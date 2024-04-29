import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { loginType } from "../../Utils/Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const Login = () => {
  const [input, setInput] = useState<loginType>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

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
      .post("http://127.0.0.1:8080/user/login", input)
      .then((res: AxiosResponse) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      });
  }

  return (
    <div className="loginContainer">
      <Form
        style={{ width: "40%", margin: "160px auto" }}
        onSubmit={handleSubmit}
      >
        <h1 className="loginTitle">Login</h1>
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
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
