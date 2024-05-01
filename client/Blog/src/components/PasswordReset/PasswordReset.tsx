import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PasswordResetType } from "../../Utils/Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import "./PasswordReset.css";

const formStyle = {
  width: "60%",
  margin: "50px auto",
  padding: "30px",
  border: "2px solid #3b3b3b6c",
  borderRadius: "5px",
};

const PasswordReset = () => {
  const [input, setInput] = useState<PasswordResetType>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
      .patch("http://127.0.0.1:8080/user/reset", input, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  return (
    <div className="container-md">
      <Form onSubmit={handleSubmit} style={formStyle}>
        <h1 className="passwordResetHeader">Password Reset</h1>
        <Form.Label htmlFor="inputUsername5" style={{ marginTop: "10px" }}>
          Current password
        </Form.Label>
        <Form.Control
          type="password"
          id="inputCurrentPassword5"
          name="currentPassword"
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <Form.Label htmlFor="inputEmail5" style={{ marginTop: "10px" }}>
          New password
        </Form.Label>
        <Form.Control
          type="password"
          id="inputnewPassword5"
          name="newPassword"
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <Form.Label htmlFor="inputEmail5" style={{ marginTop: "10px" }}>
          Confirm password
        </Form.Label>
        <Form.Control
          type="password"
          id="inputconfirmPassword5"
          name="confirmPassword"
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <Button
          variant="outline-secondary"
          style={{ marginTop: "30px" }}
          type="submit"
        >
          Reset
        </Button>
      </Form>
    </div>
  );
};

export default PasswordReset;
