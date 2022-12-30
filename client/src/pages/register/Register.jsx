import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setErorr] = useState(false);
  const handelSubmit = async (e) => {
    e.preventDefault();
    setErorr(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log(err);
      setErorr(true);
    }
  };
  return (
    <div className="register">
      <span className="register-title">register</span>
      <form className="register-form" onSubmit={handelSubmit}>
        <label>Username</label>
        <input
          className="register-input"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="email"
          className="register-input"
          placeholder="Enter Your Email.."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          className="register-input"
          placeholder="Enter Your Password.."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="register-btn" type="submit">
          Register
        </button>
      </form>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          something went wrong
        </span>
      )}
      <button className="register-reg-btn">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
}
