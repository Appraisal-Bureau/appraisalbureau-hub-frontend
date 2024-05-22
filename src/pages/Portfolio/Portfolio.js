import { portfolioData } from 'api/api';
import ActionBar from 'components/ActionBar/ActionBar';
import MuiTable from 'components/Table/Table';
import { currencyFormatter, formatDate } from 'helpers/portfolio.helpers';

function Portfolio() {
  const formattedPortfolio = portfolioData.map((item) => ({
    ...item,
    lastReport: formatDate(item.lastReport),
    dateAcquired: formatDate(item.dateAcquired),
    value: currencyFormatter.format(item.value),
  }));
  return (
    <>
      <h1 className="title">My Portfolio</h1>
      <ActionBar />
      <MuiTable
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'artist', header: 'Artist' },
          { key: 'collection', header: 'Collection' },
          { key: 'lastReport', header: 'Last Report' },
          { key: 'dateAcquired', header: 'Date Acquired' },
          { key: 'value', header: 'Value' },
        ]}
        data={formattedPortfolio}
        hideHeader={false}
        showCheckboxes={true}
        showPagination={true}
        style={{
          padding: '4px 8px',
          tableLayout: 'fixed',
          display: 'inline-block',
        }}
      />
    </>
  );
}

export default Portfolio;
