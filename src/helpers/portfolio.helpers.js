import { format, parseISO } from 'date-fns';

export const calculatePortfolioTotal = (portfolio) => {
  let total = 0;
  for (let i = 0; i < portfolio.length; i++) {
    total += portfolio[i].value;
  }
  return total;
};

export const formatDate = (date) => {
  const parsedDate = parseISO(date);
  const monthAbbreviation = format(parsedDate, 'MMM');
  const formattedDate = format(parsedDate, 'd');
  const year = format(parsedDate, 'y');
  return `${monthAbbreviation} ${formattedDate}, ${year}`;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const formatMoney = (value) => {
  return currencyFormatter.format(value);
};
