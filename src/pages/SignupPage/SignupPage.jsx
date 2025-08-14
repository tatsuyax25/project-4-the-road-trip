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
    <div className="ui grid" style={{ height: "100vh", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
      <div className="ui column" style={{ maxWidth: 450 }}>
        <h2 className="ui header" style={{color: "teal", textAlign: "center"}}>
          <img className="ui image" src="https://imgur.com/CqDuz0m.png" alt="logo" /> Sign Up
        </h2>
        <form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="ui segment">
            <div className="field">
              <input
                name="username"
                placeholder="username"
                value={state.username}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="field">
              <input
                name="passwordConf"
                type="password"
                placeholder="Confirm Password"
                value={state.passwordConf}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Bio</label>
              <textarea
                name="bio"
                value={state.bio}
                placeholder="Tell us more about your road trip..."
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </div>
            <button className="ui button" type="submit">
              Signup
            </button>
            <div className="ui message">
              Have an account? <Link to="/login">Login</Link>
            </div>
          </div>
          {error ? <ErrorMessage error={error} /> : null}
        </form>
      </div>
    </div>
  );
}
