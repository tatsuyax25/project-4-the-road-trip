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
    <>
      <div className="ui grid"
        style={{ height: "100vh", textAlign: "center", alignItems: "center", justifyContent: "center" }}
      >
        <div className="ui column" style={{ maxWidth: 450 }}>
          <h2 className="ui header" style={{color: "teal", textAlign: "center"}}>
            <img className="ui image" src="https://i.imgur.com/CqDuz0m.png" alt="logo" /> Log-in to your
            account
          </h2>
          <form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="ui segment">
              <div className="field">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={state.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={state.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="ui button"
                style={{backgroundColor: "teal", color: "white", width: "100%"}}
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div className="ui message">
            New to us? <Link to="/signup">Sign Up</Link>
          </div>
          {error ? <ErrorMessage error={error} /> : null}
        </div>
      </div>
    </>
  );
}

