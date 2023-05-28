import React, { useState } from "react";
import { Box, Stack, Typography, TextField,Button} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Data } from "../../Utils/TrialData";
import { CustYellowButton } from "../../Utils/Theme";
import AdminHeader from "./AdminHeader";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StockTable from "../AdminPages/StockTable";
import StockSortAlgo from "../../Utils/StockSortAlgo";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Autocomplete from "@mui/material/Autocomplete";


const UpdateStock = () => {
  
  // sorting function start
  const [sortMethod, setSortMethod] = useState("");
  let NewData = Data;
 StockSortAlgo(sortMethod,Data,NewData);
  // sorting function end

  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const medicine = [
    { label: "parcetamol", year: 1994 },
    { label: "dolo", year: 1972 },
    { label: "azithromycine", year: 1974 },
  ];


  const [pname, setPname] = useState("");
  const [pack,setPack] = useState("")
  const [rate,setRate] = useState("")
  const [date,setDate] = useState(null)
  const [saltname,setSaltname] = useState("")
  const [hsn,setHsn] = useState("")
  const [expiry,setExpiry] = useState(null)
  const [location,setLocation] = useState("")
  const [mfg,setMfg] = useState("")
  const [batch,setBatch] = useState("")
  const [quantity,setQuantity] = useState("")
  const [free,setFree] = useState("")

function Update(){
    console.log(pname,pack,rate,date.$d,saltname,hsn,location,mfg,batch,quantity,free)
}

  return (
    <>
      <Box>
        <AdminHeader />
    
     <Stack sx={{color:"black",padding:"30px"}}>
        <Typography variant="h4" fontWeight="700" mb="25px">Update StockList</Typography>
       
       <Stack gap="25px">
        <Stack sx={{flexDirection:{xs:"coloumn",sm:"row"},gap:"20px"}}>
        <Autocomplete
             disablePortal
             id="combo-box-demo"
             options={medicine}
             sx={{ width: 500 }}
             onInputChange={(event, pname) => {
               setPname(pname);
             }}
             renderInput={(params) => (
               <TextField {...params} label="Product Name" />
             )}
           />
            <TextField
           label="Pack"
           value={pack}
           onChange={(e)=>setPack(e.target.value)}
         />
          <TextField
           label="Rate"
           value={rate}
           onChange={(e)=>setRate(e.target.value)}
         />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        label="Entry Date"
          value={date}
          onChange={(neWValue) => setDate(neWValue)}
        />
    </LocalizationProvider>
        </Stack>
        <Stack sx={{flexDirection:{xs:"coloumn",sm:"row"},gap:"20px"}}>
        <TextField
           label="SaltName"
           value={saltname}
           sx={{width:500}}
           onChange={(e)=>setSaltname(e.target.value)}
         />
         <TextField
           label="HSN CODE"
           value={hsn}
           onChange={(e)=>setHsn(e.target.value)}
         />
           <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        label="Expiry Date"
          value={expiry}
          onChange={(neWValue) => setExpiry(neWValue)}
        />
    </LocalizationProvider>
         <TextField
           label="Location"
           value={location}
           onChange={(e)=>setLocation(e.target.value)}
         />
        </Stack>
        <Stack sx={{flexDirection:{xs:"coloumn",sm:"row"},gap:"25px"}}>
        <TextField
           label="MFG"
           value={mfg}
           onChange={(e)=>setMfg(e.target.value)}
         />
         <TextField
           label="Batch Number"
           value={batch}
           onChange={(e)=>setBatch(e.target.value)}
         />
         <TextField
           label="Quantity"
           value={quantity}
           onChange={(e)=>setQuantity(e.target.value)}
         />
         <TextField
           label="Free"
           value={free}
           onChange={(e)=>setFree(e.target.value)}
         />
        
         <Button variant="contained" color="primary" sx={{maxWidth:"200px",padding:"16px 33px",borderRadius:"42px"}} onClick={Update} >
            Update
          </Button>
        </Stack>
       </Stack>

     </Stack>

        <Stack
          sx={{
            flexDirection: { xs: "row" },
            justifyContent: { xs: "space-between" },
            alignItems: { xs: "left", sm: "center" },
            marginTop: "10px",
            gap: "10px",
            padding: {
              xs: "10px 20px",
              sm: "10px 40px",
              md: "15px 70px 15px 38px",
              lg: "15px 40px 15px 30px ",
            },
            position: "relative",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "19px", xl: "29px" }, fontWeight: "700" }}
          >
            Stock List
          </Typography>
          <Stack
            direction="row"
            gap="20px"
            sx={{
              justifyContent: { xs: "left", sm: "space-between" },
              alignItems: { xs: "left", sm: "center" },
            }}
          >
            
            <CustYellowButton
              variant="contained"
              color="primary"
              size="large"
              aria-label="sorting method for below table"
              aria-controls="sort"
              aria-haspopup="true"
              onClick={handleMenu2}
              sx={{
                fontSize: { xs: "12px", sm: "13px", xl: "19px" },
                padding: { xs: "5px 15px", sm: "7px 24px", xl: "9px 30px" },
              }}
            >
              Sort By <KeyboardArrowDownIcon sx={{fontSize: { xs: "16px", sm: "17px", xl: "23px" },}}/>
            </CustYellowButton>
            <Menu
              sx={{ padding: "100px" }}
              id="sort"
              anchorEl={anchorEl2}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl2)}
              onClose={handleClose2}
            >
              <MenuItem
                onClick={() => {
                  setSortMethod("name");
                  console.log(sortMethod);
                }}
                sx={{ textDecoration: "none", margin: "5px 0" }}
              >
                Name
              </MenuItem>
              <MenuItem
                onClick={() => setSortMethod("hsn")}
                sx={{ textDecoration: "none" }}
              >
                HSN
              </MenuItem>
              {/* <Link to="/"> */}
              <MenuItem
                onClick={() => setSortMethod("date")}
                sx={{ textDecoration: "none" }}
              >
                Expiry Date
              </MenuItem>
              <MenuItem
                onClick={() => setSortMethod("batch")}
                sx={{ textDecoration: "none" }}
              >
                Batch
              </MenuItem>
              {/* </Link> */}
            </Menu>
          </Stack>
        </Stack>

        {/*Table */}
        <StockTable DataArray={NewData} />
      </Box>
    </>
  );
};

export default UpdateStock;
