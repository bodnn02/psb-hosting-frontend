export const checkResponse = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}