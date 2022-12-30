import Navbar from "./components/navbar/navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Home from "./pages/home/home";
import Single from "./pages/single/single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exct path="/" element={<Home />} />
        <Route path="/Register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/Settings" element={user ? <Settings /> : <Login />} />
        <Route path="/Write" element={user ? <Write /> : <Login />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
