
import { createTheme } from '@mui/material/styles';
import { green} from '@mui/material/colors';

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#ffc801',
    },
    secondary: {
      main: green[500],
    },
  },
});
