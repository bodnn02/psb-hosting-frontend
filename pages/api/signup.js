export default async function handler(req, res) {
  const { email, password, is_active, is_superuser, is_verified, username, role_id, balance } = req.body;

  try {
    const serverRes = await fetch(`${process.env.BASE_URL}/auth/register`, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        is_active: is_active,
        is_superuser: is_superuser,
        is_verified: is_verified,
        username: username,
        role_id: role_id,
        balance: balance,
      }),
    });

    if (!serverRes.ok) throw new Error(`${serverRes.status}`);

    res.status(200).send(serverRes.ok);
  } catch (err) {
    res.status(err.message).send(err.message);
  }
}