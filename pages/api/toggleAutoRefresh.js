export default async function handler(req, res) {
  const { bill_id } = req.query;

  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/order/server/auto_prolong?bill_id=${bill_id}`, {
      method: 'POST',
      headers: req.headers,
    });

    if (!serverRes.ok) throw new Error(`error: ${serverRes.status}`);

    res.status(200).send(serverRes.ok);
  } catch (err) {
    res.status(err.status).send({ error: 'failed to fetch data' });
  }
}