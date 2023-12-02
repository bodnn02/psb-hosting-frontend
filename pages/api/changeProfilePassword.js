export default async function handler(req, res) {
  const { password } = req.query;
  const queries = `password=${password}`;

  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/account/change/password?${queries}`, {
      method: 'POST',
      headers: req.headers,
    });

    if (!serverRes.ok) throw new Error(`error: ${serverRes.status}`);

    res.status(200).send(serverRes.ok);
  } catch (err) {
    res.status(err.status).send({ error: 'failed to fetch data' });
  }
}