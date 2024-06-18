import {
  Autocomplete,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import { DatePicker } from 'antd';
import { message } from 'antd';
import { getItems } from 'api/items';
import { getSavedFilters, postSavedFilter } from 'api/user-filters';
import X from 'assets/icons/X.svg';
import AddButton from 'components/AddButton/AddButton';
import Dropdown from 'components/Dropdown/Dropdown';
import { format, parseISO } from 'date-fns';
import {
  formatFilterForQuery,
  filterIsEmpty as isEmpty,
} from 'helpers/portfolio.helpers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';

import './Filter.scss';

function Filter({ filter, addFilter, removeFilter, columns }) {
  const [savedFilter, setSavedFilter] = useState('');
  const [addFilterType, setAddFilterType] = useState('');
  const [dynamicFilter, setDynamicFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMin, setSearchMin] = useState(null);
  const [searchMax, setSearchMax] = useState(null);
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

  const fetchSavedFilterOptions = useCallback(async () => {
    const emptyOption = {
      id: -1,
      label: 'Select Saved Filter',
      value: '',
    };
    try {
      const response = await getSavedFilters();
      let userFilters = [];
      for (const item of response.data.data) {
        userFilters.push({
          id: item.id,
          label: item.attributes.label,
          value: item.attributes.values.data,
        });
      }
      updateOptions('savedFilterOptions', [emptyOption, ...userFilters]);
    } catch (error) {
      message.error('Error while fetching options: ', error);
    }
  }, []);

  useEffect(() => {
    fetchSavedFilterOptions();
  }, [fetchSavedFilterOptions]);

  useEffect(() => {
    const addFilterOptions = columns.map((col) => {
      return {
        id: columns.indexOf(col),
        label: col.header,
        value: col.key,
      };
    });
    const emptyOption = {
      id: -1,
      label: 'Options',
      value: '',
    };
    updateOptions('addFilterTypeOptions', [emptyOption, ...addFilterOptions]);
  }, [columns]);

  useEffect(() => {
    if (
      addFilterType === 'title' ||
      addFilterType === 'artist' ||
      addFilterType === 'collection'
    ) {
      const stringOptions = [{ id: 1, label: 'Multi-Select', value: '$eqi' }];
      updateOptions('dynamicFilterOptions', stringOptions);
      setDynamicFilter(stringOptions[0].value);
    } else if (
      addFilterType === 'dateAcquired' ||
      addFilterType === 'lastReport' ||
      addFilterType === 'value'
    ) {
      const numberOptions = [
        { id: 1, label: 'Exactly', value: '$eqi' },
        { id: 2, label: 'Between', value: '$between' },
      ];
      updateOptions('dynamicFilterOptions', numberOptions);
      setDynamicFilter(numberOptions[0].value);
    }
  }, [addFilterType]);

  const fetchAutocompleteOptions = useCallback(async () => {
    if (
      (addFilterType === 'title' ||
        addFilterType === 'artist' ||
        addFilterType === 'collection') &&
      searchQuery.length >= 2
    ) {
      try {
        var filterObject = {};
        if (!isEmpty(filter)) {
          filterObject = formatFilterForQuery(filter);
        }
        const response = await getItems({
          filter: filterObject,
          fields: [addFilterType],
        });
        const result = await response.data;
        const data = result.data;
        const artworkItems = data.map(
          (datum) => datum.attributes.artwork_item.data.attributes,
        );
        const combinedArray = artworkItems.map((item) => item[addFilterType]);
        const uniqueOptions = Array.from(new Set(combinedArray)).sort();
        updateOptions('autocompleteOptions', uniqueOptions);
      } catch (error) {
        message.error('Error while fetching autocomplete options');
      }
    } else {
      updateOptions('autocompleteOptions', []);
    }
  }, [searchQuery, addFilterType, filter]);

  useEffect(() => {
    fetchAutocompleteOptions();
  }, [fetchAutocompleteOptions, searchQuery, addFilterType, filter]);

  useEffect(() => {
    filterIsEmpty.current = isEmpty(filter);
  }, [filter]);

  const handleChangeSavedFilter = (event) => {
    setSavedFilter(event.target.value);
  };

  const handleChangeAddFilterType = (event) => {
    setAddFilterType(event.target.value);
  };

  const handleChangeDynamicFilter = (event) => {
    setDynamicFilter(event.target.value);
    setSearchQuery('');
    setSearchMin('');
    setSearchMax('');
  };

  const handleSearchChange = (event, newValue) => {
    setSearchQuery(newValue);
  };

  const handleChangeSearchRange = (event) => {
    if (event.target) {
      if (event.target.id === 'minValue') {
        setSearchMin(event.target.value);
      }
      if (event.target.id === 'maxValue') {
        setSearchMax(event.target.value);
      }
    } else {
      setSearchMin(format(event[0].$d, 'yyyy-MM-dd'));
      setSearchMax(format(event[1].$d, 'yyyy-MM-dd'));
    }
  };

  const handleApplyFilter = () => {
    handleClearFilter(); // remove all other filters & start over
    for (const item of savedFilter) {
      const filterType = columns.find(
        (col) => col.header === item.attributes.type.data.attributes.label,
      ).key;
      const querySelector = Object.keys(item.attributes.value)[0];
      const queryParam = Object.values(item.attributes.value)[0];
      let idParam = '';
      if (Array.isArray(queryParam)) {
        idParam = `${queryParam[0]}-${queryParam[1]}`;
      } else {
        idParam = queryParam;
      }
      addFilter(filterType, {
        id: idParam,
        selector: querySelector,
        query: queryParam,
      });
    }
  };

  const handleAddFilter = (event) => {
    if (dynamicFilter === '$between' && searchMin === '' && searchMax === '') {
      return;
    }
    let idParam = '';
    let queryParam = '';
    let querySelector = '';
    if (dynamicFilter === '$between') {
      if (searchMin === '' && searchMax !== '') {
        querySelector = '$lte';
        queryParam = searchMax;
        idParam = searchMax;
      } else if (searchMin !== '' && searchMax === '') {
        querySelector = '$gte';
        queryParam = searchMin;
        idParam = searchMin;
      } else {
        querySelector = '$between';
        queryParam = [searchMin, searchMax];
        idParam = `${searchMin}-${searchMax}`;
      }
    } else {
      idParam = searchQuery;
      queryParam = searchQuery;
      querySelector = dynamicFilter;
    }
    addFilter(addFilterType, {
      id: idParam,
      selector: querySelector,
      query: queryParam,
    });
  };

  const handleClearFilter = () => {
    Object.keys(filter).forEach(function (key) {
      filter[key].forEach((value) => {
        removeFilter(key, value.query);
      });
    });
  };

  const saveCustomFilter = async () => {
    try {
      var filterObject = {};
      if (!isEmpty(filter)) {
        filterObject = formatFilterForQuery(filter);
      } else {
        return;
      }
      // TODO: set up request body - how should user enter label?
      await postSavedFilter(filterObject);
    } catch (error) {
      message.error('Error while saving filter');
    } finally {
      fetchSavedFilterOptions();
    }
  };

  const colsDict = columns.reduce((acc, col) => {
    acc[col.key] = col;
    return acc;
  }, {});

  const formatFilter = (key, value) => {
    if (key === 'title' || key === 'artist' || key === 'collection') {
      return value.query;
    }
    if (key === 'value') {
      if (!Array.isArray(value.query)) {
        return `$${value.query}`;
      } else {
        if (value.query[0] === '') {
          return `Less Than $${value.query[1]}`;
        } else if (value.query[1] === '') {
          return `Greater Than $${value.query[0]}`;
        } else {
          return `$${value.query[0]}-${value.query[1]}`;
        }
      }
    }
    if (key === 'dateAcquired' || key === 'lastReport') {
      if (!Array.isArray(value.query)) {
        return format(parseISO(value.query), `MMM d, yyyy`);
      } else {
        if (value.query[0] === '') {
          return `Before ${format(parseISO(value.query[1]), 'MMM d, yyyy')}`;
        } else if (value.query[1] === '') {
          return `After ${format(parseISO(value.query[0]), 'MMM d, yyyy')}`;
        } else {
          return `${format(parseISO(value.query[0]), 'MMM d, yyyy')}-${format(parseISO(value.query[1]), 'MMM d, yyyy')}`;
        }
      }
    }
  };

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
          data-testid="add-filter-type"
          options={options.addFilterTypeOptions}
        />
        <Dropdown
          value={dynamicFilter}
          onChange={handleChangeDynamicFilter}
          labelId="dynamic-filter"
          data-testid="dynamic-filter"
          options={options.dynamicFilterOptions}
        />
        {(addFilterType === 'title' ||
          addFilterType === 'artist' ||
          addFilterType === 'collection') && (
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
        )}
        {(addFilterType === 'dateAcquired' || addFilterType === 'lastReport') &&
          dynamicFilter === '$eqi' && (
            <DatePicker size="large" onChange={handleSearchChange} />
          )}
        {(addFilterType === 'dateAcquired' || addFilterType === 'lastReport') &&
          dynamicFilter === '$between' && (
            <DatePicker.RangePicker
              size={'large'}
              id={{ start: 'minDate', end: 'maxDate' }}
              onChange={handleChangeSearchRange}
            />
          )}
        {addFilterType === 'value' && dynamicFilter === '$eqi' && (
          <TextField
            className="input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            id="value"
            label="Value"
            onChange={(e) => handleSearchChange(e, e.target.value)}
          />
        )}
        {addFilterType === 'value' && dynamicFilter === '$between' && (
          <>
            <TextField
              className="input"
              id="minValue"
              label="Minimum"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={handleChangeSearchRange}
            />

            <TextField
              className="input"
              id="maxValue"
              label="Maximum"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={handleChangeSearchRange}
            />
          </>
        )}
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
                        {formatFilter(key, item)}
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
            <button
              id="save"
              className="actionButton"
              onClick={saveCustomFilter}
            >
              Save Custom Filter
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Filter;
