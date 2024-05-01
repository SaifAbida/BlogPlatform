import "./Home.css";
import Post from "../../components/Post/Post";
import { useEffect, useState } from "react";
import { postDocumentType } from "../../Utils/Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState<postDocumentType[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/post/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        setPosts(res.data);
      })
      .catch((_) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      });
  }, []);
  return (
    <div className="container-sm">
      <h1 className="homeHeader">Feeds:</h1>
      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          creatorName={post.creatorName}
          image={post.image}
          content={post.content}
          created_at={post.created_at}
        />
      ))}
    </div>
  );
};

export default Home;
