import Autocomplete from "@mui/material/Autocomplete";
import { Box, Stack, Typography, TextField,Button} from "@mui/material";
import { useState } from "react";
import AdminHeader from "./AdminHeader";
import Footer from "../UserPages/Footer";
export default function CreateStock(){

    const [pname, setPname] = useState("");
    const [pack,setPack] = useState("")
    const [rate,setRate] = useState("")
    const [date,setDate] = useState("")
    const [saltname,setSaltname] = useState("")
    const [hsn,setHsn] = useState("")
    const [expiry,setExpiry] = useState("")
    const [location,setLocation] = useState("")
    const [mfg,setMfg] = useState("")
    const [batch,setBatch] = useState("")
    const [quantity,setQuantity] = useState("")
    const [free,setFree] = useState("")


    const medicine = [
        { label: "parcetamol", year: 1994 },
        { label: "dolo", year: 1972 },
        { label: "azithromycine", year: 1974 },
      ];

    function Create(){
        console.log(pname,pack,rate,date,saltname,hsn,location,mfg,batch,quantity,free)
    }

    return (
  <>
     <Box >
        <AdminHeader />
    
     <Stack sx={{color:"black",padding:"30px",alignItems:"center"}}>
        <Typography variant="h4" fontWeight="700" mb="25px">Create StockList</Typography>
       
       <Stack gap="25px" sx={{maxWidth:"80vw"}}>
        <Stack gap="20px">
        <Stack sx={{flexDirection:{xs:"coloumn",sm:"row"},gap:"20px"}}>
        <Autocomplete
             disablePortal
             id="combo-box-demo"
             options={medicine}
             sx={{ width:{lg:500,xs:450} }}
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
        </Stack>
       <Stack sx={{flexDirection:{xs:"coloumn",sm:"row"},gap:"20px"}}>
       <TextField
           label="Rate"
           value={rate}
           fullWidth={true}
           onChange={(e)=>setRate(e.target.value)}
         />
          <TextField
           label="Date"
           value={date}
           fullWidth={true}
           onChange={(e)=>setDate(e.target.value)}
         />
       </Stack>
        </Stack>
        <Stack gap="20px">
            <Stack sx={{flexDirection:{xs:"coloumn",sm:"row"},gap:"20px"}}>
            <TextField
           label="SaltName"
           value={saltname}
           sx={{ width:{lg:500,xs:450} }}
           onChange={(e)=>setSaltname(e.target.value)}
         />
         <TextField
           label="HSN CODE"
           value={hsn}
           onChange={(e)=>setHsn(e.target.value)}
         />
            </Stack>
        
          <Stack sx={{flexDirection:{xs:"coloumn",sm:"row"},gap:"20px"}}>
          <TextField
           label="EXP. DATE"
           value={expiry}
           fullWidth={true}
           onChange={(e)=>setExpiry(e.target.value)}
         />
         <TextField
           label="Location"
           value={location}
           fullWidth={true}
           onChange={(e)=>setLocation(e.target.value)}
         />
          </Stack>
        </Stack>
        <Stack gap="20px"  >
       <Stack sx={{flexDirection:{xs:"coloumn",sm:"row"},gap:"25px"}}>
       <TextField
           label="MFG"
           value={mfg}
           fullWidth={true}
           onChange={(e)=>setMfg(e.target.value)}
         />
         <TextField
           label="Batch Number"
           value={batch}
           fullWidth={true}
           onChange={(e)=>setBatch(e.target.value)}
         />
       </Stack>
       <Stack sx={{flexDirection:{xs:"coloumn",sm:"row"},gap:"25px"}}>
       <TextField
           label="Quantity"
           value={quantity}
           fullWidth={true}
           onChange={(e)=>setQuantity(e.target.value)}
         />
         <TextField
           label="Free"
           value={free}
           fullWidth={true}
           onChange={(e)=>setFree(e.target.value)}
         />
       </Stack>
        
         <Button variant="contained" color="primary" sx={{maxWidth:"200px",padding:"16px 33px",borderRadius:"42px"}} onClick={Create} >
            Update
          </Button>
        </Stack>
       </Stack>

     </Stack>
     </Box>
     
  </>
    )
}