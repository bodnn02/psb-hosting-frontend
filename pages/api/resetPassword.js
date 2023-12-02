export default async function handler(req, res) {
  const { token, password } = req.body;
  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify({
        token: token,
        password: password,
      }),
    });

    if (!serverRes.ok) throw new Error(`error: ${serverRes.status}`);

    res.status(200).send(serverRes.ok);
  } catch (err) {
    res.status(err.status).send({ error: 'failed to fetch data' });
  }
}