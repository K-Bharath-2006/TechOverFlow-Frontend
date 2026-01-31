import { useState } from "react";
import "./../Styles/Login.css";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   // eslint-disable-next-line
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://techoverflow-backend.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));

      if (data.data.Role === "admin") {
        navigate("/admin-home");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button className="loginButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
