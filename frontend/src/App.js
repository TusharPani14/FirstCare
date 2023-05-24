import SignIn from "./AdminPages/SignIn";



import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffc801',
    },
    secondary: {
      main: green[500],
    },
  },
});


function App() {
  return (
   <>
   <ThemeProvider theme={theme}>
 <SignIn/>
   </ThemeProvider>
   </>
  );
}

export default App;
