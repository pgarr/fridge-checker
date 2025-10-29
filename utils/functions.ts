export const getDaysLeft = (date1: Date, date2: Date) => {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = date1.getTime() - date2.getTime();
  return Math.round(differenceMs / ONE_DAY);
};
