export const getLocalDate = () => {
  const today = new Date();

  const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [year, month, day] = dateFormatter.format(today).split("-");
  return { year, month, day, date: `${year}-${month}-${day}` };
};
