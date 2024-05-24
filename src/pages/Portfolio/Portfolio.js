import { portfolioData } from 'api/api';
import ActionBar from 'components/ActionBar/ActionBar';
import MuiTable from 'components/Table/Table';
import { formatDate, formatMoney } from 'helpers/portfolio.helpers';

import './Portfolio.scss';

function Portfolio() {
  return (
    <div id="portfolio">
      <h1 className="title">My Portfolio</h1>
      <ActionBar />
      <MuiTable
        columns={[
          { key: 'title', header: 'Title', enableSort: false },
          { key: 'artist', header: 'Artist', enableSort: false },
          { key: 'collection', header: 'Collection', enableSort: false },
          {
            key: 'lastReport',
            header: 'Last Report',
            enableSort: true,
            formatFn: formatDate,
          },
          {
            key: 'dateAcquired',
            header: 'Date Acquired',
            enableSort: true,
            formatFn: formatDate,
          },
          {
            key: 'value',
            header: 'Value',
            enableSort: true,
            formatFn: formatMoney,
          },
        ]}
        data={portfolioData}
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
