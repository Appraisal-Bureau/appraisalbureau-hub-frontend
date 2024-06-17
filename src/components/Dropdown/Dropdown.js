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
      data-testid={labelId}
      value={value}
      displayEmpty
      onChange={onChange}
      IconComponent={() => (
        <ReactSVG
          src={ChevronDown}
          style={{
            paddingTop: 4,
            cursor: 'pointer',
            position: 'absolute',
            right: 0,
            paddingLeft: 4,
            paddingRight: 4,
            pointerEvents: 'none',
          }}
        />
      )}
      sx={{
        '.MuiSelect-select': {
          color: emptySelected ? 'gray' : 'inherit',
          '&.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
            paddingRight: '25px',
          },
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
