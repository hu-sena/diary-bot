export const getDateString = (): string => {
  const date = new Date().toDateString().split("T")[0];
  return date;
};
