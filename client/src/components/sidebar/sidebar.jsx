import { useEffect } from "react";
import { useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">About Me</span>
        <img src="https://www.w3schools.com/css/ocean.jpg" alt="" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
          eveniet debitis explicabo tempora qui voluptatibus
        </p>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">Categories</span>
        <ul className="sidebar-list">
          {cats.map((c) => (
            <Link className="link" to={`/?cat=${c.name}`}>
              <li className="sidebar-list-item">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">Follow Us</span>
        <div className="sidebar-social">
          <i className="sidebar-icons fa-brands fa-square-facebook"></i>
          <i className="sidebar-icons fa-brands fa-instagram"></i>
          <i className="sidebar-icons fa-brands fa-twitter"></i>
          <i className="sidebar-icons fa-brands fa-pinterest"></i>
        </div>
      </div>
    </div>
  );
}
