export const logout = async (token) => {
  try {
    const res = await fetch(`/api/logout`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
      }
    });

    if (!res.ok) throw new Error(`error: ${res.status}`);

    return res.ok;
  } catch (err) {
    console.error(err);
  }
};