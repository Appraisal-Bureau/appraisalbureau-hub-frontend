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

export const filterIsEmpty = (filter) => {
  return !Object.values(filter).some((values) => values.length > 0);
};

export const formatFilterForQuery = (filter) => {
  let filterObj = {};
  filterObj['$or'] = [];
  for (const key in filter) {
    if (filter[key].length > 0) {
      if (filter[key].length === 1) {
        const item = filter[key][0];
        filterObj[key] = {
          [item.selector]: !isNaN(item.query) ? Number(item.query) : item.query,
        };
      } else {
        filter[key].forEach((item) => {
          let itemQuery = [];
          if (Array.isArray(item.query)) {
            for (const val in item.query) {
              itemQuery.push(!isNaN(val) ? Number(val) : val);
            }
          } else {
            itemQuery = item.query;
          }
          filterObj.$or.push({
            [key]: {
              [item.selector]: !isNaN(itemQuery)
                ? Number(itemQuery)
                : itemQuery,
            },
          });
        });
      }
    }
  }
};
