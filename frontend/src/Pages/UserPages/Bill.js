import {
  Stack,
  TextField,
  Button,
  Typography,
  Box,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Bill() {
  let userInfo;
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join(".");
  }
  useEffect(() => {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) navigate("/");
  });

  async function handleprint() {
    setLoading(true);
    const newInvoiceDate = convert(invdate.$d);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const billData = await axios.post(
        "/bill/create",
        {
          invoiceNo: invnum,
          name: username,
          invoiceDate: newInvoiceDate,
          phoneNo: phnnum,
          products: data,
          total,
        },
        config
      );

      if (billData) {
        setMessage(billData.data.message);
        setOpenSuccess(true);
      }
      setLoading(false);
      setShowInv(true);
    } catch (e) {
      console.log(e);
      setMessage(e.message);
      setOpenError(true);
    }
  }

  const fetchStockNames = async () => {
    setLoading(true);
    setStockNames(() => []);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const names = await axios.get("/stock/get", config);
      const stocksName = names.data.stockList;
      console.log(stocksName);
      const nameList = stocksName.map((stock) => stock.productName);
    setStockNames(nameList);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStockNames();
  }, []);

  function handleSubmit() {
    setData([...data, { pname, quantity, rate, amount: rate * quantity }]);
    setAmount(amount + rate * quantity);
    setPname("");
    setQuantity("");
    setRate("");
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  const [data, setData] = useState([]);
  const [pname, setPname] = useState("");
  const [showInv, setShowInv] = useState(false);
  const [username, setUsername] = useState("");
  const [invnum, setInvnum] = useState("");
  const [invdate, setInvdate] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [phnnum, setPhnnum] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const [stockNames, setStockNames] = useState([]);
  const navigate = useNavigate();
  let total = amount - amount * (discount / 100);
  return (
    <>
      {showInv ? (
        <Stack sx={{ color: "black", padding: "50px" }} gap="20px">
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
            <Button
              variant="contained"
              color="primary"
              sx={{ height: "40px", display: showInv ? "block" : "none" }}
              onClick={() => {
                setShowInv(false);
                window.print();
              }}
            >
              Print
            </Button>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                Name:{username}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                Phone Number:{phnnum}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                Invoice Number:{invnum}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                Invoice Date:{invdate.$D}-{invdate.$M + 1}-{invdate.$y}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack>
          <UserHeader />
          <Stack gap="25px" sx={{ padding: "40px" }}>
            <Typography variant="h3">Billing Page</Typography>
            <Stack
              sx={{ flexDirection: { xs: "column", sm: "row" } }}
              gap="20px"
            >
              <TextField
                label="Invoice Number"
                name="invoice_num"
                value={invnum}
                onChange={(e) => setInvnum(e.target.value)}
              />
              <TextField
                label="Name"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Invoice Date"
                  value={invdate}
                  onChange={(neWValue) => setInvdate(neWValue)}
                />
              </LocalizationProvider>
              <TextField
                label="Phone Number"
                name="phone_number"
                value={phnnum}
                onChange={(e) => setPhnnum(e.target.value)}
              />
            </Stack>
            <Stack>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Product Details
              </Typography>

              <Stack
                sx={{ direction: { lg: "row", sm: "coloumn" } }}
                gap="20px"
              >
                <Stack
                  sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  gap="20px"
                >
                  <FormControl sx={{width: 300 }}>
                    <InputLabel id="demo-simple-select-label">Meds Name</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={pname}
                      label="Product Name"
                      onChange={(e) => setPname(e.target.value)}
                    >
                      {stockNames.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Rate"
                    name="rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                  <TextField
                    label="Quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <TextField
                    label="Amount"
                    name="amount"
                    value={quantity * rate}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Stack>
                <Stack sx={{ gap: "15px", flexDirection: { sm: "row" } }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{
                      maxWidth: "200px",
                      padding: "16px 33px",
                      borderRadius: "42px",
                    }}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleprint}
                    sx={{
                      maxWidth: "200px",
                      padding: "16px 33px",
                      borderRadius: "42px",
                    }}
                  >
                    Preview Invoice
                  </Button>
                </Stack>
                <Box>
                  <TextField
                    label="Discount"
                    name="discount"
                    value={discount}
                    placeholder="Enter discount in (1%-15%)"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
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
              {data.map((n) => {
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
                <TableCell colSpan="3" align="right" sx={{ fontWeight: "700" }}>
                  Sub-Total
                </TableCell>
                <TableCell sx={{ fontWeight: "700" }}>{amount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan="3" align="right" sx={{ fontWeight: "700" }}>
                  Total Discount
                </TableCell>
                <TableCell sx={{ fontWeight: "700" }}>
                  {(amount * discount) / 100}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan="3" align="right" sx={{ fontWeight: "700" }}>
                  Total
                </TableCell>
                <TableCell sx={{ fontWeight: "700" }}>{total}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Stack>
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
    </>
  );
}
