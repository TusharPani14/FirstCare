import { Stack } from "@mui/material";

export default function Table({data}){
    return(
        <Stack sx={{padding:"50px"}}>
            <table>
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td>Quantity</td>
                        <td>Rate</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.pname}</td>
                    </tr>
                </tbody>
            </table>
        </Stack>
    )
}