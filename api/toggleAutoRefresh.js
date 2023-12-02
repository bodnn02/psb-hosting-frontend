export const toggleAutoRefresh = async (token, bill_id) => {
  try {
    const res = await fetch(`/api/toggleAutoRefresh?bill_id=${bill_id}`, {
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