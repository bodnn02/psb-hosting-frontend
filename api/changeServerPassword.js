export const changeServerPassword = async (token, queries) => {
  try {
    const res = await fetch(`/api/changeServerPassword?${queries}`, {
      method: 'GET',
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