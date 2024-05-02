import PortfolioVisualization from "../components/PortfolioVisualization";
import MuiTable from "../components/Table";
import { portfolio } from "../api/api";

function Portfolio() {
  const calculatePortfolioTotal = (portfolio) => {
    let total = 0;
    for (let i = 0; i < portfolio.length; i++) {
      total += portfolio[i].value;
    }
    return total;
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const barColors = ["#0024B9", "#16BAC5", "#AB81CD", "#D81E5B"];

  const portfolioDataWithColorKey = portfolio.map((item, index) => ({
    color: (
      <div
        className="color-key"
        style={{ backgroundColor: barColors[index % 4] }}
      />
    ),
    name: item.name,
    value: item.value,
  }));

  return (
    <>
      <h4>Portfolio Value</h4>
      <div className="big-number">
        {currencyFormatter.format(calculatePortfolioTotal(portfolio))}
      </div>
      <PortfolioVisualization data={portfolio} barColors={barColors} />
      <MuiTable
        columns={[
          { key: "color", width: "30px" },
          { key: "name" },
          { key: "value" },
        ]}
        data={portfolioDataWithColorKey}
        hideHeader={true}
      />
    </>
  );
}

export default Portfolio;
