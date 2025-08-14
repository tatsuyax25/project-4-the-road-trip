import React, { useState } from 'react';
import './LoginPage.css';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useNavigate, Link } from 'react-router-dom';




export default function LoginPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.login(state);
      props.handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }


  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      padding: "20px"
    }}>
      <div style={{ 
        maxWidth: "400px", 
        width: "100%",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "30px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#2185d0", marginBottom: "10px" }}>The Road Trip</h2>
          <p style={{ color: "#666" }}>Welcome back!</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <input
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              name="password"
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2185d0",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "15px"
            }}
            type="submit"
          >
            Log In
          </button>
        </form>
        
        <div style={{ 
          textAlign: "center", 
          padding: "15px", 
          backgroundColor: "#f8f9fa", 
          borderRadius: "4px",
          fontSize: "14px"
        }}>
          New to The Road Trip? <Link to="/signup" style={{ color: "#2185d0", textDecoration: "none" }}>Sign Up</Link>
        </div>
        
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
}

