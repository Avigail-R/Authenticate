import axios from 'axios';

const API_KEY = 'AIzaSyDcf-Y02RsWEEe0XjBIXN4QlP244rndN9A';
export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export  function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}

async function authenticate(mode, email, password) {
  
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const  response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true
  });
  return response.data.idToken;
}