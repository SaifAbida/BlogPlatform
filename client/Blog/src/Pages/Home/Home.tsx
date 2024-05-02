import "./Home.css";
import Post from "../../components/Post/Post";
import { useEffect, useState } from "react";
import { postDocumentType, userDocumentType } from "../../Utils/Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState<postDocumentType[]>([]);
  const [user, setUser] = useState<userDocumentType>({
    _id: "",
    username: "",
    email: "",
    password: "",
    posts: [],
  });
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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/user/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        setUser(res.data);
      })
      .catch(() => {
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

  function deletePost(id: string) {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  }

  return (
    <>
      {posts.length > 0 ? (
        <div className="container-sm homePage">
          <h1 className="homeHeader">Feeds:</h1>
          {posts.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              creator_id={post.creator_id}
              creatorName={post.creatorName}
              image={post.image}
              content={post.content}
              created_at={post.created_at}
              user_id={user._id}
              deletePost={deletePost}
            />
          ))}
        </div>
      ) : (
        <div className="emptyHomePage">
          <h1 className="emptyHomeHeader">
            Here you will find what people are sharing
          </h1>
        </div>
      )}
    </>
  );
};

export default Home;
