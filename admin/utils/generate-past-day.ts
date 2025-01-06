/**
 * This function calculates a date from the past based on the given number of days.
 *
 * @param day - The number of days in the past to calculate. For example, `1` would return yesterday's date,
 * `5` would return the date 5 days ago.
 * @returns The date from the past in the format YYYY-MM-DD.
 */
export const generatePastDay = (day: number) => {
  const nowDate = new Date();

  const pastDay = new Date(nowDate);
  pastDay.setDate(nowDate.getDate() - day);

  return pastDay.toISOString();
};
