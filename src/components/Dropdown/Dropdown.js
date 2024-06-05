import { MenuItem, Select } from '@mui/material';
import ChevronDown from 'assets/icons/ChevronDown.svg';
import { ReactSVG } from 'react-svg';

import './Dropdown.scss';

function Dropdown({ value, onChange, labelId, defaultText, options }) {
  return (
    <Select
      className="dropdown"
      labelId={labelId}
      value={value}
      displayEmpty
      onChange={onChange}
      IconComponent={() => (
        <ReactSVG src={ChevronDown} style={{ paddingTop: 4 }} />
      )}
    >
      <MenuItem key="default" value="">
        <span>{defaultText}</span>
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.id} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default Dropdown;
