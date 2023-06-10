import React, { useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  Button
} from "@mui/material";

import Img from "../../Assets/loginImg.png";
import Logo from "../../Assets/logo.png";
// import Footer from "../UserPages/Footer"
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { CustYellowButton } from "../../Utils/Theme";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert  elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email_phoneNo, setEmail_phoneNo] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignin = async () => {
    setLoading(true);
    if (!email_phoneNo || !password) {
      setMessage("Please enter all the fields");
      setOpenError(true);
      setLoading(false);
      return;
    }
    if (email_phoneNo !== "smohansatapathy@gmail.com" || password !== "smohan123*") {
      setMessage("Please enter correct email and password");
      setOpenError(true);
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/user/login",
        {
          email_phoneNo,
          password,
        },
        config
      );
      if (data) {
        setMessage("Registration Successful");
        setOpenSuccess(true);
        setTimeout(() => navigate("/adminStockList"), 1000);
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setMessage(e.message);
      setOpenError(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <>
      <Box sx={{ height: "100vh",width:"100%", overflow: "hidden" ,position:"absolute",top:"0",left:"0"}}>
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
              width: { xs: 100, sm: 125, xl: 180 },
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
                fontSize: { xs: "12px", sm: "13px", xl: "16px" },
                padding: { xs: "5px 15px", sm: "7px 24px", xl: "8px 30px" },
              }}
            >
              User Login
            </CustYellowButton>
          </Link>
        </Stack>

        <Stack
          sx={{
            display: "flexbox",
            overflowX: "hidden",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            height: "80vh",
            padding: "0px 30px",
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
                xl: "55px 45px",
              },
              backgroundColor: "#2C444E",
              borderRadius: "25px",
              color: "#fff",
              width:{xs:"99%",sm:"70%",md:"42%",lg:'33%'},
            
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "26px", lg: "29px", xl: "35px" },
                fontWeight: "500",
                ":hover": "fontSize:100px",
              }}
            >
              Admin Login
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "14.5px", xl: "15.5px" },
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
              label="Enter Email"
              variant="outlined"
              inputProps={{ style: { color: "white" } }}
              onChange={(e) => {
                setEmail_phoneNo(e.target.value);
              }}
              sx={{
                width: { xs: "90%", lg: "100%" },
                color: "white",
                '& .MuiInputLabel-root': {
                  color: '#fff',
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
                }
              }}
            />
            <TextField
              id="admin-password"
              fullWidth
              label="Enter Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
                '& .MuiInputLabel-root': {
                  color: '#fff',
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSignin}
              sx={{
                fontSize: { xs: "12px", sm: "13px",md:"15px", xl: "18px" },
                padding: { xs: "7px 15px", sm: "9px 24px", xl: "9px 35px" },
                width:{xs:"91%",md:"92%",lg:"100%"},
                fontWeight: "600",
                borderRadius: "40px",
                letterSpacing: "-0.008e",
                textTransform: "capitalize",
                borderRadius:"10px",
              }}
              style={{

              }}
            >
              Sign In
            </Button>
          </Stack>

          <Box
            component="img"
            sx={{
              display: { xs: "none", md: "block" },
              height: { xs: 90, md: 380, lg: 475, xl: 500 },
              width: { xs: 90, md: 470, lg: 480, xl: 580 },
            }}
            style={{objectFit:"contain"}}
            alt="The house from the offer."
            src={Img}
          />
        </Stack>
      </Box>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <Footer/> */}
      <Stack sx={{backgroundColor:"#242A56",position:"absolute",bottom:"0",width:"100%",padding:"15px",alignItems:"center"}}>
            <Typography variant="body1" color="white"><a href="https://www.fluxmedia.in/" target="_blank">Created By: Flux Media</a></Typography>
        </Stack>
    </>
  );
};

export default SignIn;
