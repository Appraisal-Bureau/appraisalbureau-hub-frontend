import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 'inherit',
        },
        input: {
          padding: 'inherit',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.tertiary-body': {
            fontSize: 14,
            fontWeight: 300,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
            paddingRight: 0,
          },
        },
        select: {
          padding: 0,
        },
      },
    },
  },
});
