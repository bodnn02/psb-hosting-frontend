export default async function handler(req, res) {
  const { types } = req.query;
  const queries = `types=${types}`;

  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/products/all?${queries}`, {
      method: 'GET',
    });

    if (!serverRes.ok) throw new Error(`error: ${serverRes.status}`);

    const data = await serverRes.json();

    res.status(200).send(data);
  } catch (err) {
    res.status(err.status).send({ error: 'failed to fetch data' });
  }
}