export default async function handler(req, res) {
  const { token } = req.body;

  try {
    const data = await fetch(
      `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
      {
        method: "POST",
        body: `secret=${encodeURIComponent(
          process.env.CAPTCHA_SECRET_KEY
        )}&response=${encodeURIComponent(token)}`,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (!data.ok) throw new Error(`${data.status}`);

    res.status(200).send(data.ok);
  } catch (err) {
    console.log(err);
    res.status(err.message).send(err.message);
  }
}
