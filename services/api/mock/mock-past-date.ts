const getOneYearAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  const isoUTC = date.toISOString();
  return isoUTC.replace('Z', '+01:00');
};

export const MOCK_PAST_DATE = getOneYearAgo();
