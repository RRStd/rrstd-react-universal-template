export const mounthMap = {
  0: 'jan',
  1: 'feb',
  2: 'mar',
  3: 'apr',
  4: 'may',
  5: 'jun',
  6: 'jul',
  7: 'aug',
  8: 'sep',
  9: 'oct',
  10: 'nov',
  11: 'dec',
};

export const dayMap = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

export const buildDateFromStr = (dateStr) => {
  const date = new Date(dateStr);
  return `${ dayMap[date.getDay()] }, ${ date.getDate() } ${ mounthMap[date.getMonth()] }`;
};
