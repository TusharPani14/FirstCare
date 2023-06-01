import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CustYellowButton } from "../../Utils/Theme";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "../../Assets/logo.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const AdminHeader = ({setUpdateTrigger, updateTrigger}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: { xs: "50px", sm: "80px" },
          padding: {
            xs: "10px 5px 10px 15px",
            sm: "0px 15px 0px 40px",
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
          <Link to="/adminStockList">
            <Typography
              sx={{
                fontSize: { xs: "15px", xl: "23px" },
                cursor: "pointer",

                display: { xs: "none", md: "block" },
              }}
              onClick={() => {
                if (updateTrigger) {
                  setUpdateTrigger(false);
                }
              }}
            >
              Stocks
            </Typography>
          </Link>
          <Link to="/adminProfitPage">
            <Typography
              sx={{
                fontSize: { xs: "15px", xl: "23px" },
                cursor: "pointer",
                display: { xs: "none", md: "block" },
              }}
            >
              Sells & Profits
            </Typography>
          </Link>
          <SettingsIcon
            sx={{
              fontSize: { xs: "20px", xl: "28px" },
              cursor: "pointer",
              display: { xs: "none", md: "block" },
            }}
          />
          <Link to="/">
            <CustYellowButton
              variant="contained"
              color="primary"
              sx={{
                fontSize: { xs: "12px", sm: "13px", xl: "19px" },
                padding: { xs: "5px 15px", sm: "7px 24px", xl: "9px 30px" },
                display: { xs: "none", md: "block" },
              }}
              onClick={() => {
                localStorage.removeItem("userInfo");
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
              <Link to="/adminProfitPage">
                <MenuItem onClick={handleClose} sx={{ textDecoration: "none" }}>
                  Sells & Profits
                </MenuItem>
              </Link>
              <Link to="/">
                <MenuItem onClick={handleClose} sx={{ textDecoration: "none" }}>
                  Log Out
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default AdminHeader;
