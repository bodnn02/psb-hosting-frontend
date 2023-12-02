export const getOrderHistory = async (token, queries) => {
  try {
    const res = await fetch(`/api/getOrderHistory?invoice_id=${queries}`, {
      method: 'GET',
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