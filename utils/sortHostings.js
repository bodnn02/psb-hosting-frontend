export const sortHostings = (hostings) => {
  return hostings.map(el => {
    const arr = [];
    arr[0] = el.characters.find(item => item.content === 'GB') || null;
    arr[1] = el.characters.find(item => item.name === 'До') || null;
    arr[2] = el.characters.find(item => item.name === 'Лицензия') || null;
    arr[3] = el.characters.find(item => item.name === 'Защита') || null;

    el.characters = arr;

    return el;
  })
}
