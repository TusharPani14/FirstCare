import { Stack, Typography } from "@mui/material";

export default function Footer(){
    return(
        <>
        <Stack sx={{backgroundColor:"#242A56",position:"sticky",bottom:"0",width:"100%",padding:"15px",alignItems:"center"}}>
            <Typography variant="body1" color="white"><a href="https://www.fluxmedia.in/" target="_blank">Created By: Flux Media</a></Typography>
        </Stack>
        </>
    )
}