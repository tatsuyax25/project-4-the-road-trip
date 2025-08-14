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
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <div className="ui column" style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <img className="ui image" src="https://i.imgur.com/CqDuz0m.png" /> Log-in to your
            account
          </Header>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                type="email"
                name="email"
                placeholder="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="password"
                type="password"
                placeholder="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <button className="ui button"
                color="teal"
                fluid
                size="large"
                type="submit"
                className="btn"
              >
                Login
              </button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/signup">Sign Up</Link>
          </Message>
          {error ? <ErrorMessage error={error} /> : null}
        </div>
      </div>
    </>
  );
}

