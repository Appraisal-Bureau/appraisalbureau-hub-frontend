import { portfolioData } from 'api/api';
import ActionBar from 'components/ActionBar/ActionBar';
import MuiTable from 'components/Table/Table';
import { formatDate, formatMoney } from 'helpers/portfolio.helpers';

import './Portfolio.scss';

function Portfolio() {
  const formattedPortfolio = portfolioData.map((item) => ({
    ...item,
    lastReport: formatDate(item.lastReport),
    dateAcquired: formatDate(item.dateAcquired),
    value: formatMoney(item.value),
  }));
  return (
    <div id="portfolio">
      <h1 className="title">My Portfolio</h1>
      <ActionBar />
      <MuiTable
        columns={[
          { key: 'title', header: 'Title', enableSort: false },
          { key: 'artist', header: 'Artist', enableSort: false },
          { key: 'collection', header: 'Collection', enableSort: false },
          { key: 'lastReport', header: 'Last Report', enableSort: true },
          { key: 'dateAcquired', header: 'Date Acquired', enableSort: true },
          { key: 'value', header: 'Value', enableSort: true },
        ]}
        data={formattedPortfolio}
        hideHeader={false}
        showCheckboxes={true}
        showPagination={true}
        style={{
          tableLayout: 'fixed',
          display: 'inline-block',
        }}
      />
    </div>
  );
}

export default Portfolio;
