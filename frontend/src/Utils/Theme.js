
import { createTheme } from '@mui/material/styles';
import { Button } from "@mui/material";
import styled from "@emotion/styled";


export const CustYellowButton = styled(Button)`
  font-weight: 600;
  border-radius: 40px;
  letter-spacing: -0.008em;
  text-transform: capitalize;
  
  `


export const Theme = createTheme({
  palette: {
    primary: {
      main: '#ffc801',
    },
    secondary: {
      main: "#000",
    },
  },
  typography:{
    fontFamily: "'Poppins', sans-serif"
  }
});
