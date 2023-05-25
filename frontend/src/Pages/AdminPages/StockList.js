import React, { useState } from "react";
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
import { Data } from "../../Utils/TrialData";
import { CustYellowButton } from "../../Utils/Theme";




// function createData(
//   serial,
//   hsn,
//   name,
//   pack,
//   batch,
//   expiry,
//   quantity,
//   free,
//   rate
// ) {
//   return { serial, hsn, name, pack, batch, expiry, quantity, free, rate };
// }

// const Data = [
//   createData(2, 5055, "ASPRIN 50MG", `15*10`, "AOD45668", "03/26", 20, 0, 154),
// ];
// const NewData =  Data.sort((a,b)=>{
//   return a.hsn - b.hsn
// });


const StockList = () => {

  // sorting function
  const [sortMethod, setSortMethod] = useState("");
  let NewData = Data;
  switch (sortMethod) {
    case "name":
      NewData = Data.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
      
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
      // console.log(NewData)
      
      break;
    case "date":
      NewData = Data.sort((a, b) => {
        let da = new Date(a.expiry),
            db = new Date(b.expiry);
        return da - db;
    });
      
      break;
      
    case "batch":
      NewData = Data.sort((a, b) => {
        let fa = a.batch.toLowerCase(),
            fb = b.batch.toLowerCase();
      
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
      // console.log(NewData)
      
      break;

    case "hsn":
      Data.sort((a,b)=>{
          return a.hsn - b.hsn
        });
      
      break;
  
    default:
      break;
  }



  // sorting function

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
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
              xl: "15px 5px 15px 30px ",
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
                fontSize: {xs:"15px",xl:"23px"},
                cursor: "pointer",
                textDecoration: "underline",
                display: { xs: "none", md: "block" },
              }}
            >
              Stocks
            </Typography>
            <Typography
              sx={{
                fontSize: {xs:"15px",xl:"23px"},
                cursor: "pointer",
                display: { xs: "none", md: "block" },
              }}
            >
              Sells & Profits
            </Typography>
            <SettingsIcon
              sx={{
                fontSize: { xs: "20px", xl: "28px" },
                cursor: "pointer",
                display: { xs: "none", md: "block" },
              }}
            />
            <Link to="/adminLogin">
              <CustYellowButton
                variant="contained"
                color="primary"
                sx={{
                  fontSize: { xs: "12px", sm: "13px", xl: "19px" },
                  padding: { xs: "5px 15px", sm: "7px 24px", xl: "9px 30px" },
                  display: { xs: "none", md: "block" },
                }}
              >
                Logout
              </CustYellowButton>
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
          <Typography sx={{ fontSize: { xs: "21px", xl: "29px" }, fontWeight: "700" }}>
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
                padding: { xs: "5px", sm: "6px 15px", xl: "9px 30px" },
                fontSize: { xs: "12px", sm: "12px", xl: "16px" },
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
                padding: { xs: "5px", sm: "6px 15px", xl: "9px 30px" },
                fontSize: { xs: "12px", sm: "12px", xl: "16px" },
                fontWeight: "600",
                "&:hover":{margin:" 0 1px",transform:"scale(0.99)"}
              }}
            >
              Delete Stock
            </Button>
            <CustYellowButton
              variant="contained"
              color="primary"
              size="large"
                aria-label="sorting method for below table"
                aria-controls="sort"
                aria-haspopup="true"
                onClick={handleMenu2}
                
              sx={{
                fontSize: { xs: "12px", sm: "13px", xl: "19px" },
                  padding: { xs: "5px 15px", sm: "7px 24px", xl: "9px 30px" },
              }}
            >
              Sort By
            </CustYellowButton>
            <Menu
            sx={{padding:"100px"}}
                id="sort"
                anchorEl={anchorEl2}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
              >
                <MenuItem
                  onClick={()=>{setSortMethod('name'); console.log(sortMethod)}}
                  sx={{ textDecoration: "none", margin: "5px 0"}}
                >
                  Name
                </MenuItem>
                  <MenuItem
                    onClick={()=>setSortMethod('hsn')}
                    sx={{ textDecoration: "none" }}
                  >
                    HSN
                  </MenuItem>
                {/* <Link to="/"> */}
                  <MenuItem
                   onClick={()=>setSortMethod('date')}
                    sx={{ textDecoration: "none" }}
                  >
                   Expiry Date
                  </MenuItem>
                  <MenuItem
                    onClick={()=>setSortMethod('batch')}
                    sx={{ textDecoration: "none" }}
                  >
                    Batch
                  </MenuItem>
                {/* </Link> */}
              </Menu>
          </Stack>
        </Stack>
        
        {/*Table */}

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
                {NewData.map((row,index) => (
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
      </Box>
    </>
  );
};

export default StockList;
