export const getProducts = async (type, url) => {
  try {
    const res = await fetch(`${url}?types=${type}`);

    if (!res.ok) throw new Error(`error: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
