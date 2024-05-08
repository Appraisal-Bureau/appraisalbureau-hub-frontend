import Card from "../components/Card";
import MuiTable from "../components/Table";
import ReportsList from "../components/ReportsList";
import PortfolioVisualization from "../components/PortfolioVisualization";
import manHangingPaintingImage from "../assets/man-hanging-painting.svg";
import womanWithHeartImage from "../assets/woman-with-heart.svg";
import manSortingFilesImage from "../assets/man-sorting-files.svg";
import { upcomingReports, portfolio } from "../api/api";
import Page from "../components/Page";

function Dashboard() {
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
      <h1 className="title">My Portfolio</h1>
      <div className="card-container">
        <Card
          imgSrc={manHangingPaintingImage}
          imgAltText="Man Hanging Painting"
          bodyText="Add another piece to your portfolio"
          actionButtonText="Add Artwork"
        />
        <Card
          imgSrc={womanWithHeartImage}
          imgAltText="Woman With Heart"
          bodyText="Donate one or more pieces from your portfolio"
          actionButtonText="Start Donation"
        />
        <Card
          imgSrc={manSortingFilesImage}
          imgAltText="Man Sorting Files"
          bodyText="Create a collection to organize your portfolio"
          actionButtonText="Create Collection"
        />
      </div>

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

      <h4>Recent Activity</h4>
      <MuiTable
        columns={[{ key: "", header: "" }]}
        data={["", "", "", "", ""]}
        hideHeader={false}
      />

      <h4>Upcoming Reports</h4>
      <ReportsList data={upcomingReports} />
    </>
  );
}

export default Dashboard;
