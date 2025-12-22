export const getDateOrNull = (value: string | number | null) => {
  if (value === null) return null;
  return new Date(value);
};
