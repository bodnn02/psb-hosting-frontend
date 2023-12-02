export default async function handler(req, res) {
  const { order_id } = req.query;
  const queries = `order_id=${order_id}`;

  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/order/server/start?${queries}`, {
      method: 'GET',
      headers: req.headers,
    });

    if (!serverRes.ok) throw new Error(`error: ${serverRes.status}`);

    res.status(200).send(serverRes.ok);
  } catch (err) {
    res.status(err.status).send({ error: 'failed to fetch data' });
  }
}