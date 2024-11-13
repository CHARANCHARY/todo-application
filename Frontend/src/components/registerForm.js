import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password, username };
      await axios.post("/api/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      onRegister();
    } catch (err) {
      setError(err.response.data);
      console.error("Registration error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="">
      <div className="wrapper">
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="input-box">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="login-input"
      />
      <i class='bx bxs-user'></i>
      </div>
      <div className="input-box">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="login-input"
      />
      <i class='bx bxs-user'></i>
      </div>
      <div className="input-box">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="login-input"
      />
      <i class='bx bxs-user'></i>
       </div>
      <button type="submit" className="btn">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
