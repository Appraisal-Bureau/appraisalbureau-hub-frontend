import { message } from 'antd';
import { portfolioTableData } from 'api/api.js';
import ActionBar from 'components/ActionBar/ActionBar';
import AddButton from 'components/AddButton/AddButton';
import Filter from 'components/Filter/Filter';
import Grid from 'components/Grid/Grid';
import MuiTable from 'components/Table/Table';
import { formatDate, formatMoney } from 'helpers/portfolio.helpers';
import { useCallback, useEffect, useState } from 'react';

// import apiClient from 'services/apiService';
import './Portfolio.scss';

function Portfolio() {
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({
    title: [],
    artist: [],
    collection: [],
    dateAcquired: [],
    lastReport: [],
    value: [],
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

  const addFilter = (key, value) => {
    if (filter.key && filter.key.includes(value)) {
      return;
    }
    setFilter((prevFilter) => {
      const currentFilterValues = prevFilter[key] || [];
      if (currentFilterValues.some((item) => item.id === value.id)) {
        return prevFilter;
      }
      return {
        ...prevFilter,
        [key]: [...currentFilterValues, value],
      };
    });
  };

  const removeFilter = (key, query) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: (prevFilter[key] || []).filter((item) => item.query !== query),
    }));
  };

  const fetchPortfolioData = useCallback(async () => {
    setIsLoading(true);
    try {
      // var sortOrder = null;
      // if (orderBy !== null) {
      //   sortOrder = `${orderBy}:${order}`;
      // }
      // const response = await apiClient.get('/items', {
      //   params: {
      //     sort: sortOrder,
      //     filter: // https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering,
      //     pagination: {
      //       page: page,
      //       pageSize: rowsPerPage,
      //       start: page * rowsPerPage,
      //       limit: rowsPerPage,
      //     },
      //     // Can optionally set fields param if too much unneeded data is being retrieved
      //   },
      // });
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
    // eslint-disable-next-line
  }, [filter, portfolioData, order, orderBy, page, rowsPerPage]);

  const fetchOptions = useCallback(async () => {
    if (searchQuery.length >= 2) {
      setIsLoading(true);
      try {
        /* const response = await apiClient.get('/items', {
        params: {
          filter: // filter,
          fields: ['title', 'artist', 'collection']
        },
      }); */
        // const result = await response.json();
        // const data = result.data;
        // const artworkItems = data.map((datum) => datum.attributes.artwork_item.data.attributes);
        const data = portfolioTableData;
        // populate search options
        const titles = data.map((item) => item.title);
        // const titles = artworkItems.map((item) => item.title);
        const artists = data.map((item) => item.artist);
        // const artists = artworkItems.map((item) => item.artist);
        const collections = data.map((item) => item.collection);
        // const collections = artworkItems.map((item) => item.workspace);
        const combinedArray = [...titles, ...artists, ...collections];
        const uniqueOptions = Array.from(new Set(combinedArray)).sort();

        setSearchOptions(
          uniqueOptions.filter((option) =>
            option.toLowerCase().includes(searchQuery.toLowerCase()),
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
  }, [searchQuery]);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  useEffect(() => {
    fetchOptions();
    setPage(0);
  }, [fetchOptions, filter]);

  const cols = [
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
  ];

  return (
    <div id="portfolio">
      <h1 className="title">My Portfolio</h1>
      <ActionBar
        searchText="Search portfolio"
        onToggleFilter={toggleFilter}
        showFilter={showFilter}
        searchOptions={searchOptions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRows={selectedRows}
        actionButtons={[<AddButton key={1} text={'Add Artwork'} />]}
        showViewButtons={true}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      {showFilter && (
        <Filter
          filter={filter}
          addFilter={addFilter}
          removeFilter={removeFilter}
          columns={cols}
        />
      )}
      {selectedView === 'list' ? (
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <MuiTable
            columns={cols}
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
        <Grid
          cardData={portfolioData}
          selectedCards={selectedRows}
          setSelectedCards={setSelectedRows}
        />
      )}
    </div>
  );
}

export default Portfolio;
