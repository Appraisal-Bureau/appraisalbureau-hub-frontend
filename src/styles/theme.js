import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
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
  },
});
