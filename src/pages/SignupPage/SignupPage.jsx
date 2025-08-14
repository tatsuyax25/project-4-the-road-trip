import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useNavigate, Link } from 'react-router-dom';

import userService from '../../utils/userService';

export default function SignUpPage(props) {
  console.log(props, "<- This is props")
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [state, setState] = useState({
    username: '',
    password: '',
    email: '',
    passwordConf: '',
    bio: ''
  });

  const [selectedFile, setSelectedFile] = useState('')

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    console.log(e.target.files)
    setSelectedFile(e.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    // Validate passwords match
    if (state.password !== state.passwordConf) {
      setError('Passwords do not match!');
      return;
    }
    
    // Validate password length
    if (state.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    for (let key in state){
      formData.append(key, state[key])
    }

    try {
      setError(''); // Clear any previous errors
      await userService.signup(formData)
      props.handleSignUpOrLogin()
      navigate('/')
    } catch(err){
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
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
        maxWidth: "450px", 
        width: "100%",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "30px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#2185d0", marginBottom: "10px" }}>The Road Trip</h2>
          <p style={{ color: "#666" }}>Sign up to share your adventures</p>
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
              name="username"
              placeholder="Username"
              value={state.username}
              onChange={handleChange}
              required
            />
          </div>
          
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
          
          <div style={{ marginBottom: "15px" }}>
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
          
          <div style={{ marginBottom: "15px" }}>
            <input
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <textarea
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                minHeight: "80px",
                resize: "vertical"
              }}
              name="bio"
              value={state.bio}
              placeholder="Tell us about your road trips..."
              onChange={handleChange}
            />
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>Profile Photo</label>
            <input
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileInput}
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
            Sign Up
          </button>
        </form>
        
        <div style={{ 
          textAlign: "center", 
          padding: "15px", 
          backgroundColor: "#f8f9fa", 
          borderRadius: "4px",
          fontSize: "14px"
        }}>
          Already have an account? <Link to="/login" style={{ color: "#2185d0", textDecoration: "none" }}>Log In</Link>
        </div>
        
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
}
