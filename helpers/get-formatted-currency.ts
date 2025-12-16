export const getFormattedCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
};
