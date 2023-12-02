export default async function handler(req, res) {
  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: req.headers,
    });

    if (!serverRes.ok) throw new Error(`error: ${serverRes.status}`);

    res.status(200).send(serverRes.ok);
  } catch (err) {
    res.status(err.status).send({ error: 'failed to fetch data' });
  }
}