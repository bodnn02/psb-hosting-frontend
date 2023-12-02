export default async function handler(req, res) {
  const { invoice_id } = req.query;
  const queries = `invoice_id=${invoice_id}`;

  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/payment/historyOrder?${queries}`, {
      method: 'GET',
      headers: req.headers,
    });

    if (!serverRes.ok) throw new Error(`error: ${serverRes.status}`);

    const data = await serverRes.json();

    res.status(200).send(data);
  } catch (err) {
    res.status(err.status).send({ error: 'failed to fetch data' });
  }
}