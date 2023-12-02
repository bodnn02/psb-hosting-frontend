export const startServer = async (token, id) => {
  try {
    const res = await fetch(`/api/startServer?order_id=${id}`, {
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