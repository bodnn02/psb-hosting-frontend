const countries = [
  'Netherlands',
  'Moldova',
  'Hong Kong',
  'USA',
  'Germany',
  'Canada',
  'Great Britain',
  'Turkey',
]

export const sortByCountries = (x, y) => {
  const indexA = countries.indexOf(x.country);
  const indexB = countries.indexOf(y.country);

  if (indexA === -1 && indexB === -1) {
    return 0;
  } else if (indexA === -1) {
    return 1;
  } else if (indexB === -1) {
    return -1;
  } else {
    return indexA - indexB;
  }
}