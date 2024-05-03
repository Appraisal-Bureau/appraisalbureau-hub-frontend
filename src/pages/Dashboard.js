import Card from "../components/Card";
import Portfolio from "../pages/Portfolio";
import MuiTable from "../components/Table";
import ReportsList from "../components/ReportsList";
import manHangingPaintingImage from "../assets/man-hanging-painting.svg";
import womanWithHeartImage from "../assets/woman-with-heart.svg";
import manSortingFilesImage from "../assets/man-sorting-files.svg";
import { upcomingReports } from "../api/api";

function Dashboard() {
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

      <Portfolio />

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
