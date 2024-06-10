import { MenuItem, Select } from '@mui/material';
import ChevronDown from 'assets/icons/ChevronDown.svg';
import { ReactSVG } from 'react-svg';

import './Dropdown.scss';

function Dropdown({ value, onChange, labelId, options }) {
  const emptySelected = value === '';
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
      sx={{
        '.MuiSelect-select': {
          color: emptySelected ? 'gray' : 'inherit',
        },
      }}
    >
      {options.map((option) => (
        <MenuItem
          disabled={option.value === ''}
          key={option.id}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default Dropdown;
