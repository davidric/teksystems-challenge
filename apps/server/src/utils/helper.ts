export const formatDate = (dateStr: string) => {
  const [year, day, month] = dateStr.split('/');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
