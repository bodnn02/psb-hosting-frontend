export const topUpBalanceByMus = async (token, queries) => {
  try {
    const res = await fetch(`/api/topUpBalanceByMus?${queries}`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`error: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};