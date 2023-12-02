export const sortPaymentsWithDate = (arr) => {
  return arr.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
}