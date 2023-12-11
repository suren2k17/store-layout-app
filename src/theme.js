// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'navy', // Dark navy blue for primary color
    },
    background: {
      default: '#fff', // Default white background
    },
    text: {
      primary: '#000', // Black text for content
      secondary: 'white', // White text for menus
    },
  },
  // Other theme customizations
});

export default theme;
