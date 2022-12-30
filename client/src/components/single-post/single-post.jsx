import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./single-post.css";
import { Context } from "../../context/Context";
import axios from "axios";

export default function SinglePost() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [post, setPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  const handleDelete = async (e) => {
    try {
      await axios.delete("http://localhost:5000/api/posts/" + path, {
        data: {
          username: user.username,
        },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
      // window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="single-post">
      <div className="single-post-wrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="single-post-img" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="single-post-input single-post-title-input"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="single-post-title">
            {title}
            {post.username === user?.username && (
              <div className="single-post-edit">
                <i
                  className="single-post-icon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="single-post-icon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="single-post-info">
          <span single-post-author>
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span single-post-date>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="single-post-input single-post-desc-input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="single-post-desc">{desc}</p>
        )}
        {updateMode && (
          <button className="single-post-submit" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
