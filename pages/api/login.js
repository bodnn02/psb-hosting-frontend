export default async function handler(req, res) {
  const { username, password } = req.body;

  console.log(password)

  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: req.headers,
      body: `username=${username}&password=${encodeURIComponent(password)}`,
    });

    if (!serverRes.ok) throw new Error(`${serverRes.status}`);

    const data = await serverRes.json();

    res.status(200).send(data);
  } catch (err) {
    res.status(err.message).send(err.message);
  }
}