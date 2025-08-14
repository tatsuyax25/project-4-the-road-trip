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

    const formData = new FormData();
    formData.append('photo', selectedFile)

    for (let key in state){
      formData.append(key, state[key])
    }

    console.log(formData, " <- This will show nothing")
    console.log(formData.forEach((item) => console.log(item)))

    try {
      console.log([1])
      await userService.signup(formData)
      console.log([2])
      props.handleSignUpOrLogin()
      console.log([3])
      navigate('/')
    } catch(err){
      setError(err.message)
      console.log('We have an error')
    }

  }



  return (
    <div className="ui grid" textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <div className="ui column" style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <img className="ui image" src="https://imgur.com/CqDuz0m.png" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
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
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              value={state.bio}
              placeholder="Tell us more about your road trip..."
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <button className="ui button" type="submit" className="btn">
              Signup
            </button>
            <Message>
            Have an account? <Link to="/login">Login</Link>
          </Message>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </div>
  );
}
