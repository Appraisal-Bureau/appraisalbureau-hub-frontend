import { portfolioData } from 'api/api';
import ActionBar from 'components/ActionBar/ActionBar';
import AddButton from 'components/AddButton/AddButton';
import Filter from 'components/Filter/Filter';
import MuiTable from 'components/Table/Table';
import { formatDate, formatMoney } from 'helpers/portfolio.helpers';
import { useState } from 'react';

import './Portfolio.scss';

function Portfolio() {
  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => {
    setShowFilter((prevShowFilter) => !prevShowFilter);
  };
  const createSearchOptions = (portfolioData) => {
    const titles = portfolioData.map((item) => item.title);
    const artists = portfolioData.map((item) => item.artist);
    const collections = portfolioData.map((item) => item.collection);
    const combinedArray = [...titles, ...artists, ...collections];
    return Array.from(new Set(combinedArray));
  };
  const buttonData = [
    {
      id: 1,
      text: 'Add Artwork',
    },
  ];
  return (
    <div id="portfolio">
      <h1 className="title">My Portfolio</h1>
      <ActionBar
        searchText="Search portfolio"
        onToggleFilter={toggleFilter}
        showFilter={showFilter}
        searchOptions={createSearchOptions(portfolioData)}
        actionButtons={buttonData.map((button) => (
          <AddButton key={button.id} text={button.text} />
        ))}
        showViewButtons={true}
      />
      {showFilter && <Filter />}
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
