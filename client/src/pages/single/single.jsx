import "./single.css";
import Sidebar from "../../components/sidebar/sidebar";
import SinglePost from "../../components/single-post/single-post";

export default function Single() {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}
