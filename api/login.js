import { checkResponse } from '../utils/checkResponse';

export const login = async (name, password) => {
  return fetch (`/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: `username=${name}&password=${encodeURIComponent(password)}`,
  })
    .then(checkResponse)
};