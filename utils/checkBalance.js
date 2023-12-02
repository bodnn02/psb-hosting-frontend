export const checkBalance = (balance, price, lang) => {
  if (lang === 'ru' && balance < price) {
    return 'Недостаточно средств';
  } else if (lang === 'en' && balance < price) {
    return `You don't have enough money`;
  }
}