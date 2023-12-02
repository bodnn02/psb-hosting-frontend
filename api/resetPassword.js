export const resetPassword = async (token, password) => {
  try {
    const res = await fetch(`/api/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        password: password,
      })
    });

    if (!res.ok) throw new Error(`error: ${res.status}`);

    return res.ok;
  } catch (err) {
    console.error(err);
  }
};