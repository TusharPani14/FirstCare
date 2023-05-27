import React, { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";

import Img from "../../Assets/loginImg.png";
import Logo from "../../Assets/logo.png";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { CustYellowButton } from "../../Utils/Theme";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            height: { xs: "50px", sm: "80px" },
            padding: {
              xs: "10px 20px",
              sm: "0px 40px",
              md: "0px 50px",
              lg: "0px 110px",
              xl: "55px 100px",
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
        <Link to="/userLogin">
        <CustYellowButton
            variant="contained"
            color="primary"
            sx={{
              fontSize: { xs: "12px", sm: "13px", xl: "18px" },
              padding: { xs: "5px 15px", sm: "7px 24px", xl: "9px 30px" },
            }}
          >
            User Login
          </CustYellowButton></Link>  
        </Stack>

        <Stack
          sx={{
            display: "flexbox",
            overflowX: "hidden",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            height: "85vh",
            padding: "5px 30px",
            justifyContent: "space-evenly",
            // background: "yellow",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              textAlign: "center",
              padding: {
                xs: " 40px 5px",
                sm: "50px 20px",
                md: "30px 10px",
                lg: "50px 30px ",
                xl: "130px 50px",
              },
              backgroundColor: "#2C444E",
              borderRadius: "25px",
              color: "#fff",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "26px", lg: "27px", xl: "40px" },
                fontWeight: "500",
                ":hover": "fontSize:100px",
              }}
            >
              Admin Login
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "15px", xl: "24px" },
                fontWeight: "500",
                letterSpacing: "0.02em",
                lineHeight: "30px",
                margin: "-5px 0 10px",
                width: { xs: "85%", sm: "80%", xl: "90%" },
                textAlign: "center",
              }}
            >
              Hey Enter Your Details to get Sign In to your account
            </Typography>
            <TextField
              id="admin-email"
              label="Enter Email/Phone Number"
              variant="outlined"
              inputProps={{ style: { color: "white" } }}
              sx={{
                width: { xs: "90%", lg: "100%" },
                color: "white",
                "& label.Mui-focused": {
                  color: "#FFF",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#FFF",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#FFF",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FFF",
                  },
                },
              }}
            />
            <TextField
              id="admin-password"
              fullWidth
              label="Enter Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              InputProps={{
                style: { color: "white" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "#fff" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: "90%", lg: "100%" },
                color: "white",
                "& label.Mui-focused": {
                  color: "#FFF",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#FFF",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#FFF",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FFF",
                  },
                },
              }}
            />
            <CustYellowButton
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                fontSize: { xs: "12px", sm: "13px", xl: "22px" },
                padding: { xs: "5px 15px", sm: "7px 24px", xl: "9px 35px" },
              }}
              >
              <Link to="/adminStockList">{/* remove after login verifictaion is added  */}
              Sign In
              </Link>
            </CustYellowButton>
          </Stack>

          <Box
            component="img"
            sx={{
              display: { xs: "none", md: "block" },
              height: { xs: 90, md: 380, lg: 455, xl: 690 },
              width: { xs: 90, md: 470, lg: 570, xl: 790 },
            }}
            alt="The house from the offer."
            src={Img}
          />
        </Stack>
      </Box>
    </>
  );
};

export default SignIn;
