import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.stringify({ email, password });

      const response = await axios.post("/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json", 
        },
      });
      const { token } = response.data;
      localStorage.setItem("token", token); // Store the token
      onLogin(); // Call onLogin prop to update app state
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message); 
      } else {
        setError("An unexpected error occurred."); 
      }
      console.error("Login error:", err.response.data);
    }
  };

  return (
   
    <form onSubmit={handleSubmit} action="">
       <div className="wrapper">
      <h1>Login</h1>
    
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
      <div className="input-box" >
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="login-input"
      />
      <i class='bx bxs-lock-alt' ></i>
      </div>
      <button type="submit" className="btn">
        Login
      </button>
      {error && <p className="error-message">{error}</p>}
      </div>
    
    </form>
    
  );
};

export default LoginForm;
