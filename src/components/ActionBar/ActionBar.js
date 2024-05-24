import { Autocomplete, TextField } from '@mui/material';
import ViewGallery from 'assets/icons/ViewGallery.svg';
import ViewList from 'assets/icons/ViewList.svg';
import Visibility from 'assets/icons/Visibility.svg';
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
      <Autocomplete
        options={searchOptions}
        renderInput={(params) => <TextField {...params} label={searchText} />}
      />
      <button onClick={onToggleFilter}>Filter</button>
      {actionButtons}
      {showViewButtons && (
        <div className="view-buttons">
          <button>
            <ReactSVG src={ViewList} />
          </button>
          <button>
            <ReactSVG src={ViewGallery} />
          </button>
        </div>
      )}
      <button>Bulk Actions</button>

      <ReactSVG src={Visibility} />
    </div>
  );
}

export default ActionBar;
