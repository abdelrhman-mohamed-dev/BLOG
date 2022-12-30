import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img className="post-img" src={PF + post.photo} alt="" />}
      <div className="post-info">
        <div className="post-cats">
          {post.categories.map((c) => (
            <span className="post-cat">{c}</span>
          ))}
        </div>
        <span className="post-title">
          <Link className="link" to={`/post/${post._id}`}>
            {post.title}
          </Link>{" "}
        </span>
        <hr />
        <span className="post-date">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="post-desc">{post.desc}</p>
    </div>
  );
}
