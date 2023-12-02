export const getCurrentOrder = async (token, id) => {
  try {
    const res = await fetch(`/api/getCurrentOrder?order_id=${id}`, {
      headers: {
        'Authorization' : `Bearer ${token}`,
      }
    });

    if (!res.ok) throw new Error(`error: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};