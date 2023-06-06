import { Box, Button, Stack, TableContainer,
    Table,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody, TextField, Typography, IconButton, } from "@mui/material";
import { useState } from "react";
import AdminHeader from "./AdminHeader";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Footer from "../UserPages/Footer"

export default function CreateUser(){
const[user,setUser] = useState("")
const[pwd,setPwd] = useState("")
const[userupd,setUserupd] = useState("")
const[pwdupd,setPwdupd] = useState("")
const [userdata,setUserdata] = useState([{user:"abcd",pwd:"12336"},{user:"abcd",pwd:"12336"},{user:"abcd",pwd:"12336"}])
 function updateUser(n){
   setPwdupd(n.pwd)
   setUserupd(n.user)
 }

    return(
        <>
        <AdminHeader/>
        <Stack sx={{padding:{md:"40px",xs:"5px"},flexDirection:{md:"row",xs:"column"},gap:"25px",alignItems:"center",justifyContent:"center"}}>
            <Stack sx={{width:"360px",gap:"15px"}}>
                <Typography variant="h5" color="initial">Create User</Typography>
                <TextField 
                label="Username"
                value={user}
                onChange={(e)=>setUser(e.target.value)}
                />
                <TextField 
                label="Password"
                value={pwd}
                onChange={(e)=>setPwd(e.target.value)}
                />
                <Button variant="contained">
                    Create User
                </Button>
            </Stack>
            <Stack sx={{width:"360px",gap:"15px"}}>
            <Typography variant="h5" color="initial">Update User</Typography>
                <TextField 
                label="Username"
                value={userupd}
                onChange={(e)=>setUserupd(e.target.value)}
                />
                <TextField 
                label="Password"
                value={pwdupd}
                onChange={(e)=>setPwdupd(e.target.value)}
                />
                <Button variant="contained">
                    update User
                </Button>
            </Stack>
            
        </Stack>
        <TableContainer component={Paper} sx={{maxWidth:"450px",margin:"25px auto"}}>
             <Table sx={{ padding:"20px"}} aria-label="simple table">
                 <TableHead>
                    <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell>Password</TableCell>
                    </TableRow>
                 </TableHead>
                 <TableBody>
                    {userdata.map((n)=>{
                        return(
                            <TableRow>
                                <TableCell>
                                    {n.user}
                                </TableCell>
                                <TableCell>
                                    {n.pwd}
                                </TableCell>
                                <TableCell>
                                <IconButton onClick={()=>updateUser(n)}>
                                       <UpgradeIcon/>
                                </IconButton>
                                </TableCell>
                            
                            </TableRow>
                        )
                    })}
                 </TableBody>
             </Table>  
            </TableContainer>
            <Footer/>
        </>
    )
}