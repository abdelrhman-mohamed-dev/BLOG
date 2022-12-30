import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  console.log(isFetching);
  return (
    <div className="login">
      <span className="login-title">Login</span>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>User Name</label>
        <input
          type="text"
          className="login-input"
          placeholder="Enter Your User Name.."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="login-input"
          placeholder="Enter Your Password.."
          ref={passwordRef}
        />
        <button className="login-btn" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="login-reg-btn">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
