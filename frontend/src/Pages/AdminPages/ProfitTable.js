import React, { useState } from "react";
import {
  Box,
  OutlinedInput,
  Stack,
  Typography,
  Button,
  TableFooter,
  TablePagination,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { CustYellowButton } from "../../Utils/Theme";
import Modal from "@mui/material/Modal";

const ProfitTable = ({ DataArray, handleDate }) => {
  // function to find total profit
  const totalProfit = DataArray.reduce((accumulator, object) => {
    return accumulator + object.profit;
  }, 0);

  const [open, setOpen] = useState(false);
  const [userdata, setUserdata] = useState({});
  const [billdata, setBilldata] = useState([]);
  const [totalA, setTotalA] = useState(0);

  function Print() {
    window.print();
    setOpen(false);
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Stack
        sx={{
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: { xs: "space-between" },
          alignItems: { sx: "left", sm: "center" },
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
        <OutlinedInput type="date" onChange={handleDate} />

        <Typography
          sx={{
            fontSize: { xs: "16px", lg: "19px", xl: "29px" },
            fontWeight: "700",
          }}
        >
          {`Total Profit : Rs. ${totalProfit.toFixed(2)}`}
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
                      onClick={() => {
                        setUserdata({
                          name: row.name,
                          phoneNo: row.phoneNo,
                          invoice_number: row.invoice_number,
                          date: row.date,
                          bill_amount: row.bill_amount,
                        });
                        console.log(userdata);
                        setOpen(true);
                        setBilldata(row.products);
                        const sum = row.products.reduce((total, item) => {
                          return total + item.quantity * item.rate;
                        }, 0);
                        setTotalA(sum);
                      }}
                    >
                      view
                    </CustYellowButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={DataArray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          sx={{
            color: "black",
            padding: "50px",
            bgcolor: "white",
            height: "100vh",
          }}
          gap="20px"
        >
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography variant="h4" sx={{ fontWeight: "700" }}>
                First Care Medical Store
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                SORADA,NUAGAON,NAYAGARH
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                Phone Number:7008554435
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                GST: D.L.No.: NA-40631R NA-4063RC 17331RX
              </Typography>
            </Stack>
            <Stack direction="row" gap="15px">
              <Button
                variant="outlined"
                sx={{ height: "40px" }}
                onClick={() => Print()}
              >
                Print
              </Button>
              <Button
                variant="outlined"
                sx={{ height: "40px" }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                Name:{userdata.name}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                Phone Number:{userdata.phoneNo}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                Invoice Number:{userdata.invoice_number}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                Invoice Date:{userdata.date}
              </Typography>
            </Stack>
          </Stack>
          <Stack padding="50px">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billdata.map((n) => {
                    return (
                      <TableRow key={n.pname}>
                        <TableCell>{n.pname}</TableCell>
                        <TableCell>{n.quantity}</TableCell>
                        <TableCell>{n.rate}</TableCell>
                        <TableCell>{n.quantity * n.rate}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell
                      colSpan="3"
                      align="right"
                      sx={{ fontWeight: "700" }}
                    >
                      Total Discount
                    </TableCell>
                    <TableCell sx={{ fontWeight: "700" }}>
                      {(totalA-Number(userdata.bill_amount)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan="3"
                      align="right"
                      sx={{ fontWeight: "700" }}
                    >
                      Total
                    </TableCell>
                    <TableCell sx={{ fontWeight: "700" }}>
                      {userdata.bill_amount}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default ProfitTable;
