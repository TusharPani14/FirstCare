import { Stack, TextField, Button, Typography, Box, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, TableFooter} from "@mui/material";
import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import UserHeader from "./UserHeader";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export default function Bill(){

  function handleprint(){
    setShowInv(true)
  }
  function handleSubmit(){
      setData([...data,{pname,quantity,rate}])
      setAmount(amount+rate*quantity)
      setPname("")
      setQuantity("")
      setRate("")
  }

  const medicine = [
    { label: "parcetamol", year: 1994 },
    { label: "dolo", year: 1972 },
    { label: "azithromycine", year: 1974 },
  ];
  
  const [data,setData] = useState([])
  const [pname, setPname] = useState("");
  const [showInv,setShowInv] = useState(false);
  const [username,setUsername] = useState("");
  const [invnum,setInvnum] = useState("");
  const [invdate,setInvdate] = useState(null);
  const [quantity,setQuantity] = useState("");
  const [phnnum,setPhnnum] = useState("");
  const [rate,setRate] = useState("");
  const [amount,setAmount] = useState(0)
  const [discount,setDiscount] = useState(0)
  let total = amount-amount*(discount/100);
  return (
    <>
    
    {showInv ? (<Stack sx={{color:"black",padding:"50px"}} gap="20px" >
        <Stack direction="row" justifyContent="space-between">
        <Stack>
        <Typography variant="h4" sx={{fontWeight:"700"}}>First Care Medical Store</Typography>
        <Typography variant="body1" sx={{fontWeight:"700"}} >SORADA,NUAGAON,NAYAGARH</Typography>
        <Typography variant="body1" sx={{fontWeight:"700"}}>Phone Number:7008554435</Typography>
        <Typography variant="body1" sx={{fontWeight:"700"}}>GST: D.L.No.: NA-40631R NA-4063RC 17331RX</Typography>
        </Stack>
        <Button variant="contained" color="primary" sx={{height:"40px",display:(showInv?"block":"none"),}}onClick={()=>{
          setShowInv(false)
          window.print();
          }}>
        Print
        </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography variant="body1" sx={{fontWeight:"700"}} >Name:{username}</Typography>
            <Typography variant="body1" sx={{fontWeight:"700"}} >Phone Number:{phnnum}</Typography>
          </Stack>
          <Stack>
            <Typography variant="body1" sx={{fontWeight:"700"}}>Invoice Number:{invnum}</Typography>
            <Typography variant="body1" sx={{fontWeight:"700"}}>Invoice Date:{invdate.$D}-{invdate.$M+1}-{invdate.$y}</Typography>
          </Stack>
        </Stack>
        
      </Stack> ):(
      <Stack>
        <UserHeader/>
         <Stack gap="25px" sx={{padding:"40px"}}>
        <Typography variant="h3" >Billing Page</Typography>
       <Stack sx={{flexDirection:{xs:"column",sm:"row"}}} gap="20px">
         <TextField
           label="Invoice Number"
           name="invoice_num"
           value={invnum}
           onChange={(e)=>setInvnum(e.target.value)}
         />
         <TextField
           label="Name"
           name="username"
           value={username}
           onChange={(e)=>setUsername(e.target.value)}
         />
         <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        label="Invoice Date"
          value={invdate}
          onChange={(neWValue) => setInvdate(neWValue)}
        />
    </LocalizationProvider>
         <TextField
           label="Phone Number"
           name="phone_number"
           value={phnnum}
           onChange={(e)=>setPhnnum(e.target.value)}
         />
       </Stack>
       <Stack>
         <Typography variant="h5" sx={{marginBottom:"20px"}}>Product Details</Typography>

         <Stack sx={{direction:{lg:"row",sm:"coloumn"}}} gap="20px">
           <Stack sx={{flexDirection:{xs:"column",sm:"row"}}} gap="20px">
           <Autocomplete
             disablePortal
             id="combo-box-demo"
             options={medicine}
             sx={{ width: {lg:500,xs:400} }}
             onInputChange={(event, pname) => {
               setPname(pname);
             }}
             renderInput={(params) => (
               <TextField {...params} label="Product Name" />
             )}
           />
           <TextField
             label="Rate"
             name="rate"
             value={rate}
             onChange={(e)=>setRate(e.target.value)}
           />
           <TextField
             label="Quantity"
             name="quantity"
             value={quantity}
             onChange={(e)=>setQuantity(e.target.value)}
           />
           <TextField
             label="Amount"
             name="amount"
             value={quantity*rate}
             onChange={(e)=>setAmount(e.target.value)}
           />
           </Stack>
          <Stack sx={{gap:"15px",flexDirection:{sm:"row"}}}>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{maxWidth:"200px",padding:"16px 33px",borderRadius:"42px"}} >
            Add To Cart
          </Button>
          <Button variant="contained" color="primary" onClick={handleprint} sx={{maxWidth:"200px",padding:"16px 33px",borderRadius:"42px"}}>
        Preview Invoice
      </Button>
          </Stack>
          <Box>
          <TextField
             label="Discount"
             name="discount"
             value={discount}
             placeholder="Enter discount in (1%-15%)"
             onChange={(e)=>setDiscount(e.target.value)}
           />
          </Box>
         </Stack>
       </Stack>
     </Stack>
      </Stack>
      ) }
        <Stack padding="50px">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Product Name
                      </TableCell>
                      <TableCell>
                        Quantity 
                      </TableCell>
                      <TableCell>
                      Rate
                      </TableCell>
                      <TableCell>
                       Price
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((n)=>{
                      return(
                        <TableRow key={n.pname}>
                          <TableCell>{n.pname}</TableCell>
                          <TableCell>{n.quantity}</TableCell>
                          <TableCell>{n.rate}</TableCell>
                          <TableCell>{n.quantity*n.rate}</TableCell>

                        </TableRow>
                      )
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan="3" align="right" sx={{fontWeight:"700"}}>Sub-Total</TableCell>
                      <TableCell sx={{fontWeight:"700"}}>{amount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan="3" align="right" sx={{fontWeight:"700"}}>Total Discount</TableCell>
                      <TableCell sx={{fontWeight:"700"}}>{(amount*discount)/100}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan="3" align="right" sx={{fontWeight:"700"}}>Total</TableCell>
                      <TableCell sx={{fontWeight:"700"}}>{total}</TableCell>
                    </TableRow>
                  </TableFooter>
            </Table>
          </TableContainer>
        </Stack>
    </>
  )
}