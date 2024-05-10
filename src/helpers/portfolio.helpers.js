export const calculatePortfolioTotal = (portfolio) => {
  let total = 0;
  for (let i = 0; i < portfolio.length; i++) {
    total += portfolio[i].value;
  }
  return total;
};
