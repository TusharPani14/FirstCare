import React from "react";
import { Box, OutlinedInput, Stack, Typography } from '@mui/material'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { CustYellowButton } from "../../Utils/Theme";

const ProfitTable = ({ DataArray ,handleDate }) => {

  // function to find total profit 
  const totalProfit = DataArray.reduce((accumulator, object) => {
    return accumulator + object.profit;
  }, 0);
 
    
  return (
    <>
    <Stack
          sx={{
            flexDirection: { xs:"column-reverse",sm: "row" },
            justifyContent: { xs: "space-between" },
            alignItems: { sx:"left",sm: "center" },
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

          <Typography
            sx={{ fontSize: { xs: "16px",lg:"19px", xl: "29px" }, fontWeight: "700" }}
          >
            {`Total Profit : Rs. ${totalProfit}`} 
          </Typography>
        </Stack>
      <Box sx={{ padding: "15px 20px" }}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "600", fontSize: { xl: "24px" } }}>
                  Sl.no.
                </TableCell>
                <TableCell sx={{ fontWeight: "600", fontSize: { xl: "24px" } }}>
                  Invoice Number
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "600", fontSize: { xl: "24px" } }}
                  align="right"
                >
                  Bill Amount
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "600", fontSize: { xl: "24px" } }}
                  align="right"
                >
                  Profit
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    textAlign: "center",
                    fontSize: { xl: "24px" },
                  }}
                  align="right"
                >
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DataArray.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontSize: { xl: "23px" } }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xl: "23px" } }} align="left">
                    {row.invoice_number}
                  </TableCell>

                  <TableCell sx={{ fontSize: { xl: "23px" } }} align="right">
                    {row.bill_amount}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xl: "23px" } }} align="right">
                    {row.profit}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: { xl: "23px" },
                      width: { xs: "250px", xl: "400px" },
                    }}
                    align="right"
                  >
                    {row.date}
                    <Link to={`/item/:${index}`}>
                      <CustYellowButton
                        variant="contained"
                        color="primary"
                        sx={{
                          marginLeft: { xs: "15px", xl: "25px" },
                          fontSize: { xs: "12px", sm: "10px", xl: "19px" },
                          padding: {
                            xs: "5px 15px",
                            sm: "7px 20px",
                            xl: "9px 30px",
                          },
                        }}
                      >
                        view
                      </CustYellowButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ProfitTable;
