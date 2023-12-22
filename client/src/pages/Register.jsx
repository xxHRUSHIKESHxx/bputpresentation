import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:8000/api/", // The base URL should match the proxy defined in package.json
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", inputs);
      console.log("showing catch block", res);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
      console.log("showing error block", err);
    }
  };

  return (
    <div className="auth">
     
      <form>
      <h1>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   Register</h1>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span style={{color:"whitesmoke"}}>
          Do you have an account? <Link to="/login"><h4 style={{color:"white"}}>Login</h4></Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
