export const changeProfileData = async (token, queries) => {
  try {
    const res = await fetch(`/api/changeProfileData?${queries}`, {
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