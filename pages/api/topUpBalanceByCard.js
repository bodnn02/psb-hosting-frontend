export default async function handler(req, res) {
  const { user_id, amount } = req.query;
  const queries = `user_id=${user_id}&amount=${amount}`;

  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/payment/create_lava?${queries}`, {
      method: 'POST',
      headers: req.headers,
    });

    if (!serverRes.ok) throw new Error(`error: ${serverRes.status}`);

    const data = await serverRes.json();

    res.status(200).send(data);
  } catch (err) {
    res.status(err.status).send({ error: 'failed to fetch data' });
  }
}