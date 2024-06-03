import { InputLabel } from '@mui/material';
import { filterTypes, savedFilters } from 'api/api.js';
import AddButton from 'components/AddButton/AddButton';
import Dropdown from 'components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
// eslint-disable-next-line
import apiClient from 'services/apiService';

import './Filter.scss';

function Filter({ filter, updateFilter }) {
  const [savedFilter, setSavedFilter] = useState('');
  const [dynamicFilter, setDynamicFilter] = useState('');
  const [multiSelect, setMultiSelect] = useState('');
  const [options, setOptions] = useState({
    savedFilterOptions: [],
    dynamicFilterOptions: [],
    multiSelectOptions: [],
  });

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
    const fetchDynamicOptions = async () => {
      try {
        //const response = await apiClient.get('/filter-types');
        //updateOptions('dynamicOptions', response.data);
        updateOptions('dynamicFilterOptions', filterTypes);
      } catch (error) {
        console.error('Error fetching options: ', error);
      }
    };
    fetchDynamicOptions();
  }, []);

  useEffect(() => {
    const fetchMultiSelectOptions = async () => {
      try {
        //const response = await apiClient.get('/filter-types');
        //updateOptions('multiSelectOptions', response.data);
        if (dynamicFilter !== '') {
          const multiOptions = filterTypes.find(
            (filter) => filter.value === dynamicFilter,
          ).options;
          updateOptions('multiSelectOptions', multiOptions);
        }
      } catch (error) {
        console.error('Error fetching options: ', error);
      }
    };
    fetchMultiSelectOptions();
  }, [dynamicFilter]);

  const handleChangeSavedFilter = (event) => {
    setSavedFilter(event.target.value);
    updateFilter('savedFilter', event.target.value);
    // TODO: update the actual data displayed when the filter is changed
  };

  const handleChangeDynamicFilter = (event) => {
    setDynamicFilter(event.target.value);
    updateFilter('dynamicFilter', event.target.value);
    // TODO: make sure the multi-select options are updated
  };

  const handleChangeMultiSelect = (event) => {
    setMultiSelect(event.target.value);
    updateFilter('multiSelectFilter', event.target.value);
    // TODO: update the actual data displayed when the filter is changed
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
          defaultText="Select Saved Filter"
          options={options.savedFilterOptions}
        />
        <AddButton text="Apply" />
      </div>
      <InputLabel id="dynamic-filter" className="tertiary-body">
        Add a filter
      </InputLabel>
      <div className="filter-select-group">
        <Dropdown
          value={dynamicFilter}
          onChange={handleChangeDynamicFilter}
          labelId="dynamic-filter"
          defaultText="Options"
          options={options.dynamicFilterOptions}
        />
        <Dropdown
          value={multiSelect}
          onChange={handleChangeMultiSelect}
          labelId="multi-select"
          defaultText="Multi-Select"
          options={options.multiSelectOptions}
        />
        <AddButton text="Add" />
      </div>
    </div>
  );
}

export default Filter;
