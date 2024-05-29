import { Autocomplete, TextField } from '@mui/material';
import ChevronDown from 'assets/icons/ChevronDown.svg';
import ViewGallery from 'assets/icons/ViewGallery.svg';
import ViewList from 'assets/icons/ViewList.svg';
import Visibility from 'assets/icons/Visibility.svg';
import React from 'react';
import { ReactSVG } from 'react-svg';

import './ActionBar.scss';

function ActionBar({
  searchText,
  onToggleFilter,
  searchOptions,
  actionButtons,
  showViewButtons,
}) {
  return (
    <div className="action-bar" data-testid="action-bar">
      <div className="left-group">
        <Autocomplete
          freeSolo
          sx={{ width: 265 }}
          options={searchOptions}
          renderInput={(params) => (
            <TextField {...params} size="small" label={searchText} />
          )}
        />
        <button onClick={onToggleFilter}>
          Filter <ReactSVG className="icon" src={ChevronDown} />
        </button>
        {actionButtons}
      </div>
      <div className="right-group">
        {showViewButtons && (
          <div className="view-buttons">
            <button>
              <ReactSVG className="icon" src={ViewList} />
            </button>
            <button>
              <ReactSVG className="icon" src={ViewGallery} />
            </button>
          </div>
        )}
        <button>
          Bulk Actions <ReactSVG className="icon" src={ChevronDown} />
        </button>

        <ReactSVG className="icon" src={Visibility} />
      </div>
    </div>
  );
}

export default ActionBar;
