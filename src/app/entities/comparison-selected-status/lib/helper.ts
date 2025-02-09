export const getFormattedDate = (date: string | null): string => {
  if (!date) return '-';
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear().toString();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = parsedDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
