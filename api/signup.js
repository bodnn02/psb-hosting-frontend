import { checkResponse } from '../utils/checkResponse';

export const signup = (name, email, password) => {
  // const codePassword = encodeURIComponent(password);
  return fetch(`/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      is_active: true,
      is_superuser: false,
      is_verified: false,
      username: name,
      role_id: 1,
      balance: 0
    }),
  })
  .then(checkResponse)
}