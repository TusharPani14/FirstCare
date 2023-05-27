import React from 'react'
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StockTable = ({DataArray}) => {
  return (
    <>
       <Box sx={{ padding: "15px 30px" }}>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 ,}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "600",fontSize: { xl: "22px" }, }}>Sl.no.</TableCell>
                  <TableCell sx={{ fontWeight: "600",fontSize: { xl: "22px" }, }}>HSN</TableCell>
                  <TableCell sx={{ fontWeight: "600",fontSize: { xl: "22px" }, }}>Items Name</TableCell>
                  <TableCell sx={{ fontWeight: "600",fontSize: { xl: "22px" }, }} align="right">
                    Pack
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600",fontSize: { xl: "22px" }, }} align="right">
                    Batch
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600",fontSize: { xl: "22px" }, }} align="right">
                    Expiry Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600",fontSize: { xl: "22px" }, }}align="right">
                    Quantity
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600",fontSize: { xl: "22px" }, }}align="right">
                    Free
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600",fontSize: { xl: "22px" }, }} align="right">
                    Rate
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DataArray.map((row,index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{fontSize: { xl: "20px" }, }}>{index+1}</TableCell>
                    <TableCell sx={{ fontSize: { xl: "20px" },marginLeft: "-10px" }} align="left">
                      {row.hsn}
                    </TableCell>
                    <TableCell sx={{fontSize: { xl: "20px" }, }}>{row.name}</TableCell>

                    <TableCell sx={{fontSize: { xl: "20px" }, }} align="right">{row.pack}</TableCell>
                    <TableCell sx={{fontSize: { xl: "20px" }, }} align="right">{row.batch}</TableCell>
                    <TableCell sx={{fontSize: { xl: "20px" }, }} align="right">{row.expiry}</TableCell>
                    <TableCell sx={{fontSize: { xl: "20px" }, }} align="right">{row.quantity}</TableCell>
                    <TableCell sx={{fontSize: { xl: "20px" }, }} align="right">{row.free}</TableCell>
                    <TableCell sx={{fontSize: { xl: "20px" }, }} align="right">{row.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
    </>
  )
}

export default StockTable