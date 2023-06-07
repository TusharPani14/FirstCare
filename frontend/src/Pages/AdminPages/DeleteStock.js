import React from "react";
import AdminHeader from "./AdminHeader";
import {
  Box,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CustYellowButton } from "../../Utils/Theme";
import { Data } from "../../Utils/TrialData";
import Footer from "../UserPages/Footer";

const DeleteStock = () => {
  return (
    <>
      <Box>
        <AdminHeader />
        <Paper
          sx={{ width: { xs:"90%",sm:"85%",md: "50%" }, margin:{xs:"10px auto 30px",md:"0 auto",xl:"60px auto"}, padding: "25px" }}
          elevation={5}
        >
          <Stack flex alignItems="center" justifyContent="center" sx={{gap:{xs:"15px",xl:"30px"}}}>
            <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
              Delete Stock List
            </Typography>
            <TextField label="Product Name" autoComplete="off" fullWidth />
            <TextField label="Salt Name" fullWidth />
            <Stack direction="row" gap="15px" sx={{width:"100%",flexWrap:{xs:"wrap",sm:"nowrap"}}}>
              <TextField label="Batch Number" fullWidth />
              <TextField label="MRP" type="number" fullWidth />
              <TextField label="HSN Code" type="number" fullWidth />
            </Stack>
            <Stack direction="row" gap="15px" sx={{width:"100%",flexWrap:{xs:"wrap",sm:"nowrap"}}}>
              <TextField label="Packing" fullWidth />
              <TextField label="Quantity" type="number" fullWidth />
              <TextField type="date" helperText="Expiry Date" fullWidth />
            </Stack>
            <TextField label="Location" select fullWidth>
              <MenuItem defaultValue sx={{ color: "red" }}>
                Bhubaneswar
              </MenuItem>
              <MenuItem>Cuttack</MenuItem>
              <MenuItem>Puri</MenuItem>
            </TextField>
            <CustYellowButton
              variant="contained"
              color="primary"
              sx={{
                marginLeft: { xs: "15px", xl: "25px" },
                fontSize: { xs: "12px", sm: "14px", xl: "19px" },
                padding: {
                  xs: "5px 15px",
                  sm: "7px 20px",
                  xl: "9px 30px",
                },
                "&:hover": { background: "red" },
              }}
            >
              Delete
            </CustYellowButton>
          </Stack>
        </Paper>
        <Stack sx={{ padding:{sm: "10px 20px",xs:"0px"} }}>
          <Typography sx={{ fontSize: "20px",padding: "5px 40px 0px" }}>Recently Deleted</Typography>
          <Box sx={{ padding: "15px 20px" }}>
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "600", fontSize: { xl: "24px" } }}
                    >
                      HSN Code
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "600", fontSize: { xl: "24px" } }}
                    >
                      Product Name
                    </TableCell>

                    <TableCell
                      sx={{ fontWeight: "600", fontSize: { xl: "24px" } }}
                      align="center"
                    >
                      Pack
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "600", fontSize: { xl: "24px" } }}
                      align="center"
                    >
                      Batch Number
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        textAlign: "center",
                        fontSize: { xl: "24px" },
                      }}
                      align="right"
                    >
                      Exp. Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        textAlign: "center",
                        fontSize: { xl: "24px" },
                      }}
                      align="right"
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        textAlign: "center",
                        fontSize: { xl: "24px" },
                      }}
                      align="right"
                    >
                      MRP
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Data.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ fontSize: { xl: "23px" } }}>
                        {row.hsn}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xl: "23px" } }} align="left">
                        {row.name}
                      </TableCell>

                      <TableCell
                        sx={{ fontSize: { xl: "23px" } }}
                        align="center"
                      >
                        {row.pack}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xl: "23px" } }}
                        align="center"
                      >
                        {row.batch}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xl: "23px" },
                          width: { xs: "250px", xl: "400px" },
                        }}
                        align="center"
                      >
                        {row.expiry}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xl: "23px" },
                          width: { xs: "250px", xl: "400px" },
                        }}
                        align="center"
                      >
                        {row.quantity}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xl: "23px" },
                          width: { xs: "250px", xl: "400px" },
                        }}
                        align="center"
                      >
                        {row.rate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Box>
      <Footer/>
    </>
  );
};

export default DeleteStock;
