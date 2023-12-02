export default async function handler(req, res) {
  const { email } = req.body;
  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify({
        email: email,
      }),
    });

    if (!serverRes.ok) throw new Error(`error: ${serverRes.status}`);

    res.status(200).send(serverRes.ok);
  } catch (err) {
    res.status(err.status).send({ error: 'failed to fetch data' });
  }
}