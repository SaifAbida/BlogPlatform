import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./Profile.css";
import { postDocumentType, userDocumentType } from "../../Utils/Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/post/", {
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

  function deletePost(id: string) {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  }

  return posts.length ? (
    <div className="container-sm profilePage">
      <h1 className="profile-header">My Posts:</h1>
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
    <div className="container-sm emptyProfile">
      <h1 className="empty-profile-header">
        You currently don't have any posts to display, click here to create one:
      </h1>
      <Link
        to="/create"
        className="btn btn-dark"
        style={{ marginTop: "100px", fontSize: "30px" }}
      >
        Create post
      </Link>
    </div>
  );
};

export default Profile;
