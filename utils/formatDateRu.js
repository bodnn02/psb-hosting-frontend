import { MONTH_RU } from "./constants";

export const formatDateRu = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${MONTH_RU[month]} ${year}`;
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
