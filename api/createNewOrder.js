export const createNewOrder = async (token, queries) => {
  try {
    const res = await fetch(`/api/createNewOrder?${queries}`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
      query: queries,
    });

    if (!res.ok) throw new Error(`error: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};