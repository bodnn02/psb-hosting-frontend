export const restorePassword = async (email) => {
  try {
    const res = await fetch(`/api/restorePassword`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error(`error: ${res.status}`);

    return res.ok;
  } catch (err) {
    console.error(err);
  }
};