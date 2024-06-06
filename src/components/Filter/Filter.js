import { Autocomplete, InputLabel, TextField } from '@mui/material';
import { message } from 'antd';
import { savedFilters } from 'api/api.js';
import X from 'assets/icons/X.svg';
import AddButton from 'components/AddButton/AddButton';
import Dropdown from 'components/Dropdown/Dropdown';
import { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
// eslint-disable-next-line
import apiClient from 'services/apiService';

import './Filter.scss';

function Filter({ filter, addFilter, removeFilter, columns }) {
  const [savedFilter, setSavedFilter] = useState('');
  const [addFilterType, setAddFilterType] = useState('');
  const [dynamicFilter, setDynamicFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [options, setOptions] = useState({
    savedFilterOptions: [],
    addFilterTypeOptions: [],
    dynamicFilterOptions: [],
    autocompleteOptions: [],
  });
  const filterIsEmpty = useRef(true);

  const updateOptions = (key, value) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  useEffect(() => {
    const fetchSavedFilterOptions = async () => {
      try {
        //const response = await apiClient.get('/user-filters');
        //updateOptions('savedFilterOptions', response.data);
        updateOptions('savedFilterOptions', savedFilters);
      } catch (error) {
        console.error('Error fetching options: ', error);
      }
    };
    fetchSavedFilterOptions();
  }, []);

  useEffect(() => {
    const addFilterOptions = columns.map((col) => {
      return {
        id: columns.indexOf(col),
        label: col.header,
        value: col.key,
      };
    });
    updateOptions('addFilterTypeOptions', addFilterOptions);
  }, [columns]);

  useEffect(() => {
    if (
      addFilterType === 'title' ||
      addFilterType === 'artist' ||
      addFilterType === 'collection'
    ) {
      updateOptions('dynamicFilterOptions', [
        { id: 1, label: 'Multi-Select', value: '$in' },
        { id: 2, label: 'Single Select', value: '$eqi' },
      ]);
    } else if (
      addFilterType === 'dateAcquired' ||
      addFilterType === 'lastReport'
    ) {
      updateOptions('dynamicFilterOptions', [
        { id: 1, label: 'Before', value: '$lte' },
        { id: 2, label: 'After', value: '$gte' },
        { id: 3, label: 'Exact Date', value: '$eqi' },
      ]);
    } else if (addFilterType === 'value') {
      updateOptions('dynamicFilterOptions', [
        {
          id: 1,
          label: 'Less Than',
          value: '$lte',
        },
        {
          id: 2,
          label: 'Greater Than',
          value: '$gte',
        },
        {
          id: 3,
          label: 'Exactly',
          value: '$eqi',
        },
      ]);
    }
    setDynamicFilter('');
  }, [addFilterType]);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      try {
        /* const response = await apiClient.get('/items', {
          params: {
            filter: // filter by search query,
            fields: addFilterType
          },
        }); */
        // const result = await response.json();
        // const data = result.data;
        // const artworkItems = data.map((datum) => datum.attributes.artwork_item.data.attributes);
        // populate search options
        // const combinedArray = artworkItems.map((item) => item[addFilterType]);
        // const uniqueOptions = Array.from(new Set(combinedArray)).sort();
        // updateOptions('autocompleteOptions', uniqueOptions);
      } catch (error) {
        console.error(error);
        message.error('Error while fetching autocomplete options');
      }
    } else {
      updateOptions('autocompleteOptions', []);
    }
  }, [searchQuery]);

  useEffect(() => {
    filterIsEmpty.current = !Object.values(filter).some(
      (values) => values.length > 0,
    );
  }, [filter]);

  const handleChangeSavedFilter = (event) => {
    setSavedFilter(event.target.value);
  };

  const handleChangeAddFilterType = (event) => {
    setAddFilterType(event.target.value);
  };

  const handleChangeDynamicFilter = (event) => {
    setDynamicFilter(event.target.value);
  };

  const handleSearchChange = (event, newValue) => {
    setSearchQuery(newValue);
  };

  const handleApplyFilter = () => {
    // TODO: iterate through the saved filter
    // update the filter state w/ addFilter/removeFilter
  };

  const handleAddFilter = (event) => {
    addFilter(addFilterType, {
      id: searchQuery,
      selector: dynamicFilter,
      query: searchQuery,
    });
  };

  const handleClearFilter = () => {
    Object.keys(filter).forEach(function (key) {
      filter[key].forEach((value) => {
        removeFilter(key, value);
      });
    });
  };

  const colsDict = columns.reduce((acc, col) => {
    acc[col.key] = col;
    return acc;
  }, {});

  return (
    <div className="filter">
      <InputLabel id="saved-filter" className="tertiary-body">
        Apply Saved Filter
      </InputLabel>
      <div className="filter-select-group">
        <Dropdown
          value={savedFilter}
          onChange={handleChangeSavedFilter}
          labelId="saved-filter"
          defaultText="Select Saved Filter"
          options={options.savedFilterOptions}
        />
        <AddButton text="Apply" onClick={handleApplyFilter} />
      </div>
      <InputLabel id="dynamic-filter" className="tertiary-body">
        Add a filter
      </InputLabel>
      <div className="filter-select-group">
        <Dropdown
          value={addFilterType}
          onChange={handleChangeAddFilterType}
          labelId="add-filter-type"
          defaultText="Options"
          options={options.addFilterTypeOptions}
        />
        <Dropdown
          value={dynamicFilter}
          onChange={handleChangeDynamicFilter}
          labelId="dynamic-filter"
          defaultText="Options"
          options={options.dynamicFilterOptions}
        />
        <Autocomplete
          freeSolo
          sx={{ width: 265, borderRadius: '4px' }}
          options={searchQuery.length >= 2 ? options.autocompleteOptions : []}
          value={searchQuery}
          onInputChange={handleSearchChange}
          renderInput={(params) => (
            <TextField {...params} size="small" label={'Search'} />
          )}
        />
        <AddButton text="Add" onClick={handleAddFilter} />
      </div>
      {!filterIsEmpty.current && (
        <>
          <h4>Active Filters</h4>
          {Object.entries(filter).map(
            ([key, values]) =>
              values.length > 0 && (
                <div key={key} className="filter-type secondary-body">
                  {colsDict[key].header}{' '}
                  <div className="notification-number">{values.length}</div>
                  <div className="pill-container">
                    {values.map((item) => (
                      <div className="primary-body filter-item" key={item.id}>
                        {item.query}
                        <ReactSVG
                          className="icon"
                          src={X}
                          onClick={() => removeFilter(key, item.query)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ),
          )}
          <div className="button-container">
            <button
              id="clear"
              className="actionButton"
              onClick={handleClearFilter}
            >
              Clear All
            </button>
            <button id="save" className="actionButton">
              Save Custom Filter
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Filter;
