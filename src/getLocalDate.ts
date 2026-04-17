export const getLocalDate = () => {
  const now = new Date();

  const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kuala Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [year, month, day] = dateFormatter.format(now).split("-");
  return { year, month, day, date: `${year}-${month}-${day}` };
};
