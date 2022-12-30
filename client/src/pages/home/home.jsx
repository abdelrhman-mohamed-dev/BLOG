import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Posts from "../../components/posts/posts";
import Sidebar from "../../components/sidebar/sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const feachPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/"+search);
      console.log(res);
      setPosts(res.data);
    };
    feachPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
