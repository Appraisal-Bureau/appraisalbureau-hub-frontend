import { message } from 'antd';
import { portfolioTableData } from 'api/api.js';
import ActionBar from 'components/ActionBar/ActionBar';
import AddButton from 'components/AddButton/AddButton';
import Filter from 'components/Filter/Filter';
import Grid from 'components/Grid/Grid';
import MuiTable from 'components/Table/Table';
import { formatDate, formatMoney } from 'helpers/portfolio.helpers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import apiClient from 'services/apiService';

import './Portfolio.scss';

function Portfolio() {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    searchText: '',
    title: '',
    artist: '',
    collection: '',
    dateAcquired: null,
    lastReport: null,
    value: null,
  });
  const [selectedView, setSelectedView] = useState('list');
  const [selectedRows, setSelectedRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalRows, setTotalRows] = useState(0);

  const toggleFilter = () => {
    setShowFilter((prevShowFilter) => !prevShowFilter);
  };

  const updateFilter = (key, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }));
  };

  const fetchPortfolioData = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await apiClient.get('/items');
      // TODO: add filter, page, rowsPerPage, order, orderBy to query
      // const result = await response.json();
      // setPortfolioData(result.data);
      setPortfolioData(portfolioTableData);
      //setTotalRows(result.meta.pagination.total);
      setTotalRows(portfolioTableData.length);
    } catch (error) {
      console.error(error);
      message.error('Error while getting portfolio data');
    } finally {
      setIsLoading(false);
    }
  }, [filter, portfolioData, order, orderBy, page, rowsPerPage]);

  const fetchOptions = useCallback(async () => {
    if (filter.searchText.length >= 2) {
      setIsLoading(true);
      try {
        // const response = await apiClient.get('/items');
        // TODO: add filter to query
        // const result = await response.json();
        // const data = result.data;
        const data = portfolioTableData;
        // populate search options
        const titles = data.map((item) => item.title);
        const artists = data.map((item) => item.artist);
        const collections = data.map((item) => item.collection);
        const combinedArray = [...titles, ...artists, ...collections];
        const uniqueOptions = Array.from(new Set(combinedArray)).sort();

        setSearchOptions(
          uniqueOptions.filter((option) =>
            option.toLowerCase().includes(filter.searchText.toLowerCase()),
          ),
        );
      } catch (error) {
        console.error(error);
        message.error('Error while fetching autocomplete options');
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchOptions([]);
    }
  }, [filter]);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  useEffect(() => {
    fetchOptions();
    setPage(0);
  }, [fetchOptions, filter]);

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
        searchOptions={searchOptions}
        updateFilter={updateFilter}
        selectedRows={selectedRows}
        actionButtons={buttonData.map((button) => (
          <AddButton key={button.id} text={button.text} />
        ))}
        showViewButtons={true}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      {showFilter && <Filter filter={filter} updateFilter={updateFilter} />}
      {selectedView === 'list' ? (
        isLoading ? (
          <div>Loading...</div>
        ) : (
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
            totalRows={totalRows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            style={{
              tableLayout: 'fixed',
              display: 'inline-block',
            }}
          />
        )
      ) : (
        <Grid cardData={portfolioData} />
      )}
    </div>
  );
}

export default Portfolio;
