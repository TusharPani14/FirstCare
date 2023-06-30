import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Snackbar,
  Backdrop,
  CircularProgress,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Footer from "../UserPages/Footer";

const showToastMessage = () => {
  toast.warning("Don't leave the Date fields Empty !", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateStock() {
  const [pname, setPname] = useState("");
  const [pack, setPack] = useState("");
  const [rate, setRate] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [date, setDate] = useState(null);
  const [saltname, setSaltname] = useState("");
  const [hsn, setHsn] = useState("");
  const [expiry, setExpiry] = useState(null);
  const [location, setLocation] = useState("");
  const [mfg, setMfg] = useState("");
  const [batch, setBatch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [free, setFree] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  let userInfo;
  const medicine = [
    { label: "parcetamol", year: 1994 },
    { label: "dolo", year: 1972 },
    { label: "azithromycine", year: 1974 },
  ];

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    return [mnth, date.getDate(), date.getFullYear()].join("/");
  }
  useEffect(() => {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) navigate("/");
  });

  async function Create() {
    if (expiry === null || date === null) {
      showToastMessage();
      return;
    }
    setLoading(true);
    const newDate = new Date(date).toLocaleDateString();
    const expiryDate = new Date(expiry).toLocaleDateString();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/stock/create",
        {
          productName: pname,
          pack,
          rate,
          purchaseRate,
          date: newDate,
          saltName: saltname,
          hsnCode: hsn,
          expDate: expiryDate,
          location,
          mfg,
          batch,
          quantity: quantity,
          totalQuantity:quantity * Number(pack),
          free,
        },
        config
      );
      console.log(data);
      if (data) {
        setMessage(data.message);
        setOpenSuccess(true);
        setTimeout(() => navigate("/adminStockList"), 1000);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setMessage(e.message);
      setOpenError(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <>
      <Box>
        <AdminHeader />
        <ToastContainer />
        <Stack sx={{ color: "black", padding: "30px", alignItems: "center" }}>
          <Typography variant="h4" fontWeight="700" mb="25px">
            Create StockList
          </Typography>

          <Stack gap="25px" sx={{ maxWidth: "80vw" }}>
            <Stack gap="20px">
              <Stack
                sx={{
                  flexDirection: { xs: "coloumn", sm: "row" },
                  gap: "20px",
                }}
              >
                <TextField
                  label="Product Name"
                  value={pname}
                  onChange={(e) => setPname(e.target.value)}
                  sx={{ width: 500 }}
                />
                <TextField
                  label="Pack"
                  value={pack}
                  onChange={(e) => setPack(e.target.value)}
                />
              </Stack>
              <Stack
                sx={{
                  flexDirection: { xs: "coloumn", sm: "row" },
                  gap: "20px",
                }}
              >
                <TextField
                  label="Purchase Price"
                  value={purchaseRate}
                  onChange={(e) => setPurchaseRate(e.target.value)}
                />
                <TextField
                  label="Selling Price"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Entry Date"
                    value={date}
                    onChange={(neWValue) => setDate(neWValue)}
                  />
                </LocalizationProvider>
              </Stack>
            </Stack>
            <Stack gap="20px">
              <Stack
                sx={{
                  flexDirection: { xs: "coloumn", sm: "row" },
                  gap: "20px",
                }}
              >
                <TextField
                  label="SaltName"
                  value={saltname}
                  sx={{ width: { lg: 500, xs: 450 } }}
                  onChange={(e) => setSaltname(e.target.value)}
                />
                <TextField
                  label="HSN CODE"
                  value={hsn}
                  onChange={(e) => setHsn(e.target.value)}
                />
              </Stack>

              <Stack
                sx={{
                  flexDirection: { xs: "coloumn", sm: "row" },
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Expiry Date"
                    value={expiry}
                    onChange={(neWValue) => setExpiry(neWValue)}
                  />
                </LocalizationProvider>
                <TextField
                  label="Location"
                  value={location}
                  sx={{ width: { lg: 400, xs: 250 } }}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Stack>
            </Stack>
            <Stack gap="20px">
              <Stack
                sx={{
                  flexDirection: { xs: "coloumn", sm: "row" },
                  gap: "25px",
                }}
              >
                <TextField
                  label="MFG"
                  value={mfg}
                  fullWidth={true}
                  onChange={(e) => setMfg(e.target.value)}
                />
                <TextField
                  label="Batch Number"
                  value={batch}
                  fullWidth={true}
                  onChange={(e) => setBatch(e.target.value)}
                />
              </Stack>
              <Stack
                sx={{
                  flexDirection: { xs: "coloumn", sm: "row" },
                  gap: "25px",
                }}
              >
                <TextField
                  label="Quantity"
                  value={quantity}
                  fullWidth={true}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <TextField
                  label="Free"
                  value={free}
                  fullWidth={true}
                  onChange={(e) => setFree(e.target.value)}
                />
              </Stack>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  maxWidth: "200px",
                  padding: "16px 33px",
                  borderRadius: "42px",
                }}
                onClick={Create}
              >
                CREATE
              </Button>
            </Stack>
          </Stack>
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
      <Stack
        sx={{
          backgroundColor: "#242A56",
          position: "sticky",
          bottom: "0",
          width: "100%",
          padding: "15px",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" color="white">
          <a href="https://www.fluxmedia.in/" target="_blank">
            Created By: Flux Media
          </a>
        </Typography>
      </Stack>
    </>
  );
}
