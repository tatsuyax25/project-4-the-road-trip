import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  console.log(JSON.stringify(user), "<- What we past in the body")
  console.log(user, "<- userService")
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    body: user
  })
  .then(res => {
    console.log(res)
    if (res.ok) return res.json();
    // Get the actual error message from the server
    return res.json().then(errorData => {
      throw new Error(errorData.message || errorData.error || 'Signup failed');
    }).catch(() => {
      // If response is not JSON, use status-based message
      if (res.status === 400) throw new Error('Invalid signup data');
      if (res.status === 409) throw new Error('Email or username already exists');
      throw new Error('Signup failed. Please try again.');
    });
  })
  .then(({token}) => tokenService.setToken(token));
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Get the actual error message from the server
    return res.json().then(errorData => {
      throw new Error(errorData.message || errorData.error || 'Login failed');
    }).catch(() => {
      // If response is not JSON, use status-based message
      if (res.status === 401) throw new Error('Invalid email or password');
      throw new Error('Login failed. Please try again.');
    });
  })
  .then(({token}) => tokenService.setToken(token));
}

function getProfile(username){
  return fetch(BASE_URL + username, {
    headers: {
      'Authorization' : 'Bearer ' + tokenService.getToken()
    }
  }).then(res => {
    if(res.ok) return res.json()
    if(res.status === 404) throw new Error('User not Found')
    throw new Error('Bad Credentials') // <-this is what gets sent to the catch block when call the function
  })
}

export default {
  signup, 
  getUser,
  logout,
  login,
  getProfile
};