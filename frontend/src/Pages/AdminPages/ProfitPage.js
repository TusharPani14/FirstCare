import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import { Box, OutlinedInput, Stack, Typography } from '@mui/material'
// import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import ProfitTable from './ProfitTable';
import { ProfitData } from '../../Utils/TrialData';

const ProfitPage = () => {


    // function to find total profit 
    const totalProfit = ProfitData.reduce((accumulator, object) => {
        return accumulator + object.profit;
      }, 0);
     
      const [date, setDate] = useState(null);
const handleDate=(e)=>{
   var dateVal = e.target.value;
    console.log(dateVal)
    setDate(dateVal)
    console.log(date) 
}
  return (
    <>
      <Box>
        <AdminHeader/>
        <Stack
          sx={{
            flexDirection: { xs: "row" },
            justifyContent: { xs: "space-between" },
            alignItems: { xs: "center" },
            marginTop: "10px",
            gap: "10px",
            padding: {
              xs: "10px 15px",
              sm: "10px 43px",
              md: "15px 70px 15px 38px",
              lg: "15px 40px 15px 30px ",
            },
            position: "relative",
          }}
        >
            
              <OutlinedInput type='date' onChange={handleDate} />
            {/* <Button
              variant="contained"
              color="secondary"
              style={{ outline: "none" }}
              sx={{
                border: "2px solid #000",
                padding: { xs: "5px 10px", sm: "6px 15px", xl: "9px 30px" },
                fontSize: { xs: "11px", lg: "12px", xl: "16px" },
                fontWeight: "600",
                "&:hover": { margin: " 0 1px", transform: "scale(0.99)" },
              }}
            >
             <EventTwoToneIcon sx={{fontSize:"19px",marginRight:"5px"}}/> Date
            </Button> */}
          
          <Typography
            sx={{ fontSize: { xs: "16px",lg:"19px", xl: "29px" }, fontWeight: "700" }}
          >
            {`Total Profit : Rs. ${totalProfit}`} 
          </Typography>
        </Stack>
<ProfitTable DataArray={ProfitData}/>
      </Box>
    </>
  )
}

export default ProfitPage
