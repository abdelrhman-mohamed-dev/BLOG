import "./settings.css";
import Sidebar from "../../components/sidebar/sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updateduser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateduser.profilepic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/" + user._id,
        updateduser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(err);
    }
  };
  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">
          <span className="settings-update-title">Update Your Account</span>
          <span className="settings-delete-title">Delete Account</span>
        </div>
        <form className="settings-form" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settings-pp">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilepic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settings-pp-icon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="New Password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="settings-submit-btn" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
