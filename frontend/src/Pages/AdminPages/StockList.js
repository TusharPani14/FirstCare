import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "../../Assets/logo.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  serial,
  hsn,
  name,
  pack,
  batch,
  expiry,
  quantity,
  free,
  rate
) {
  return { serial, hsn, name, pack, batch, expiry, quantity, free, rate };
}

const rows = [
  createData(1, 5055, "ASPRIN 50MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  createData(1, 5055, "ASPRIN 500MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  createData(1, 5055, "ASPRIN 500MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  createData(1, 5055, "ASPRIN 500MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  createData(1, 5055, "ASPRIN 500MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  createData(1, 5055, "ASPRIN 500MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  createData(1, 5055, "ASPRIN 500MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  createData(1, 5055, "ASPRIN 500MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  createData(1, 5055, "ASPRIN 500MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  createData(1, 5055, "ASPRIN 500MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  createData(1, 5055, "ASPRIN 500MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
  
];

const StockList = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            height: { xs: "50px", sm: "80px" },
            padding: {
              xs: "10px 20px",
              sm: "0px 40px",
              md: "0px 30px 0 40px",
              lg: "0px 0px 0 30px",
              xl: "15px 100px",
            },
          }}
        >
          <Box
            component="img"
            sx={{
              height: 233,
              width: { xs: 100, sm: 125, xl: 190 },
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              objectFit: "contain",
            }}
            alt="The house from the offer."
            src={Logo}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ gap: "40px" }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                cursor: "pointer",
                textDecoration: "underline",
                display: { xs: "none", md: "block" },
              }}
            >
              Stocks
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                cursor: "pointer",
                display: { xs: "none", md: "block" },
              }}
            >
              Sells & Profits
            </Typography>
            <SettingsIcon
              sx={{
                fontSize: "20px",
                cursor: "pointer",
                display: { xs: "none", md: "block" },
              }}
            />
            <Link to="/userLogin">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: "600",
                  borderRadius: "40px",
                  letterSpacing: "-0.008em",
                  fontSize: { xs: "12px", sm: "13px", xl: "24px" },
                  padding: { xs: "5px 15px", sm: "7px 24px", xl: "12px 35px" },
                  textTransform: "capitalize",
                  display: { xs: "none", md: "block" },
                }}
              >
                Logout
              </Button>
            </Link>
            {/*  */}
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  sx={{ textDecoration: "underline", margin: "5px 0" }}
                >
                  Stocks
                </MenuItem>
                <Link to="/">
                  <MenuItem
                    onClick={handleClose}
                    sx={{ textDecoration: "none" }}
                  >
                    Sells & Profits
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    sx={{ textDecoration: "none" }}
                  >
                    Log Out
                  </MenuItem>
                </Link>
              </Menu>
            </div>
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: { xs: "column",md:"row" },
            justifyContent:{xs:"left",sm:"space-between"},
            alignItems:{xs:"left",sm:"center"},
            marginTop: "10px",
            gap:"10px",
            padding: { xs: "10px", md: "15px 70px 15px 38px",lg:"15px 40px 15px 30px " },
            position: "relative",
          }}
        >
          <Typography sx={{ fontSize: "21px", fontWeight: "700" }}>
            Stock List
          </Typography>
          <Stack direction="row" gap="20px" sx={{  justifyContent:{xs:"left",sm:"space-between"},
            alignItems:{xs:"left",sm:"center"}}}>
            <Button
              variant="outlined"
              color="secondary"
              style={{ outline: "none" }}
              sx={{
                border: "2px solid #000",
                padding: { xs: "5px", sm: "6px 15px", xl: "12px 35px" },
                fontSize: { xs: "12px", xl: "24px" },
                fontWeight: "600",
              }}
            >
              Update Stock
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ outline: "none" }}
              sx={{
                border: "2px solid #000",
                padding: { xs: "5px", sm: "6px 15px", xl: "12px 35px" },
                fontSize: { xs: "12px", xl: "24px" },
                fontWeight: "600",
              }}
            >
              Delete Stock
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "600",
                borderRadius: "40px",
                letterSpacing: "-0.008em",
                fontSize: { xs: "12px", sm: "13px", xl: "24px" },
                padding: { xs: "5px 15px", sm: "7px 24px", xl: "12px 35px" },
                textTransform: "capitalize",
              }}
            >
              Sort By
            </Button>
          </Stack>
        </Stack>
        {/*  */}

        <Box sx={{ padding: "15px 30px" }}>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "600" }}>Sl.no.</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>HSN</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Items Name</TableCell>
                  <TableCell sx={{ fontWeight: "600" }} align="right">
                    Pack
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600" }} align="right">
                    Batch
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600" }} align="right">
                    Expiry Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600" }} align="right">
                    Quantity
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600" }} align="right">
                    Free
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600" }} align="right">
                    Rate
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.serial}</TableCell>
                    <TableCell sx={{ marginLeft: "-10px" }} align="left">
                      {row.hsn}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>

                    <TableCell align="right">{row.pack}</TableCell>
                    <TableCell align="right">{row.batch}</TableCell>
                    <TableCell align="right">{row.expiry}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.free}</TableCell>
                    <TableCell align="right">{row.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default StockList;
