import Update from "../../components/Update/Update";
import PasswordReset from "../../components/PasswordReset/PasswordReset";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const deleteBtnStyle = {
  margin: "30px auto 60px 150px",
};

const Settings = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleClick() {
    Swal.fire({
      title: "Are you sure you want to delete your account?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3b3b3b",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://127.0.0.1:8080/user/", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res: AxiosResponse) => {
            Swal.fire({
              title: "Deleted!",
              text: res.data.message,
              icon: "success",
            });
            navigate("/login");
          })
          .catch((_) => {
            Swal.fire({
              title: "Deleted!",
              text: "Opps! something went wrong",
              icon: "success",
            });
          });
      }
    });
  }

  return (
    <>
      <Update />
      <PasswordReset />
      <Button variant="dark" style={deleteBtnStyle} onClick={handleClick}>
        Delete account
      </Button>
    </>
  );
};

export default Settings;
