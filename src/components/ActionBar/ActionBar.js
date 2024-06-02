import { Autocomplete, TextField } from '@mui/material';
import ChevronDown from 'assets/icons/ChevronDown.svg';
import ChevronUp from 'assets/icons/ChevronUp.svg';
import ViewGallery from 'assets/icons/ViewGallery.svg';
import ViewList from 'assets/icons/ViewList.svg';
import Visibility from 'assets/icons/Visibility.svg';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';

import './ActionBar.scss';

function ActionBar({
  showFilter,
  updateFilter,
  selectedRows,
  searchText,
  onToggleFilter,
  searchOptions,
  actionButtons,
  showViewButtons,
  selectedView,
  setSelectedView,
}) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
    if (newValue.length >= 2) {
      updateFilter('searchText', newValue);
    } else {
      updateFilter('searchText', '');
    }
  };

  return (
    <div className="action-bar" data-testid="action-bar">
      <div className="left-group">
        <Autocomplete
          freeSolo
          sx={{ width: 265, borderRadius: '4px' }}
          options={searchValue.length >= 2 ? searchOptions : []}
          value={searchValue}
          onInputChange={handleSearchChange}
          renderInput={(params) => (
            <TextField {...params} size="small" label={searchText} />
          )}
        />
        <button className="action-bar-button" onClick={onToggleFilter}>
          Filter{' '}
          <ReactSVG
            className="icon"
            src={showFilter ? ChevronUp : ChevronDown}
          />
        </button>
        {actionButtons}
      </div>
      <div className="right-group">
        {showViewButtons && (
          <div className="view-buttons">
            <button
              className={selectedView === 'list' ? 'selected' : ''}
              onClick={() => setSelectedView('list')}
            >
              <ReactSVG className="svg" src={ViewList} />
            </button>
            <button
              className={selectedView === 'gallery' ? 'selected' : ''}
              onClick={() => setSelectedView('gallery')}
            >
              <ReactSVG className="svg" src={ViewGallery} />
            </button>
          </div>
        )}
        <button
          className={
            selectedRows.length > 0
              ? 'action-bar-button'
              : 'action-bar-button grayed-out'
          }
        >
          Bulk Actions <ReactSVG className="icon" src={ChevronDown} />
        </button>

        <ReactSVG
          className="icon"
          src={Visibility}
          style={{ paddingTop: '5px' }}
        />
      </div>
    </div>
  );
}

export default ActionBar;
