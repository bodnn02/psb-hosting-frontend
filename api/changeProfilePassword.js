export const changeProfilePassword = async (token, password) => {
  try {
    const res = await fetch(`/api/changeProfilePassword?password=${password}`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`error: ${res.status}`);

    return res.ok;
  } catch (err) {
    console.error(err);
  }
};