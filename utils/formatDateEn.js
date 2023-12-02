import { MONTH_EN } from './constants';

export const formatDateEn = (dateStr) => {
  const date = new Date(dateStr);
	const day = date.getDate().toString().padStart(2, '0');
	const month = date.getMonth();
	const year = date.getFullYear();

  return `${MONTH_EN[month]} ${day}, ${year}`;
}