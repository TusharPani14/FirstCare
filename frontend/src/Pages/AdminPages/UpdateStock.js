import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
    Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Data } from "../../Utils/TrialData";
import { CustYellowButton } from "../../Utils/Theme";
import AdminHeader from "./AdminHeader";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import StockSortAlgo from "../../Utils/StockSortAlgo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { Data as info } from "../../Utils/TrialData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
const UpdateStock = ({ stockList, setUpdateTrigger, updateTrigger }) => {
  // sorting function start
  const [sortMethod, setSortMethod] = useState("");
  let NewData = Data;
  StockSortAlgo(sortMethod, stockList, NewData);
  // sorting function end

  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [uniqueId, setUniqueId] = useState();
  const [pname, setPname] = useState("");
  const [pack, setPack] = useState("");
  const [rate, setRate] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [date, setDate] = useState(null);
  const [saltName, setSaltName] = useState("");
  const [mfg, setMfg] = useState("");
  const [hsn, setHsn] = useState("");
  const [expiry, setExpiry] = useState(null);
  const [location, setLocation] = useState("");
  const [batch, setBatch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [free, setFree] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  let userInfo;

  useEffect(() => {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) Navigate("/");
  });

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    return [mnth, date.getFullYear() % 100].join("/");
  }

  async function Update() {
    if(expiry===null || date===null){
      showToastMessage()
      return
    }
    setLoading(true);
    const expiryDate = convert(expiry.$d);
    console.log(
      pname,
      pack,
      rate,
      purchaseRate,
      hsn,
      location,
      batch,
      quantity,
      free,
      expiry.$d,
      uniqueId
    );
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/stock/update",
        {
          _id: uniqueId,
          productName: pname,
          pack,
          rate,
          purchaseRate,
          date,
          saltName,
          hsnCode: hsn,
          expDate: expiryDate,
          location,
          mfg,
          batch,
          quantity,
          free,
        },
        config
      );

      if (data) {
        setMessage(data.message);
        setOpenSuccess(true);
        window.location.reload(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setOpenError(true);
    }
  }

  function upgrade(row) {
    setUniqueId(row.id);
    setPname(row.name);
    setPack(row.pack);
    setBatch(row.batch);
    setQuantity(row.quantity);
    setFree(row.free);
    setRate(row.rate);
    setPurchaseRate(row.purchaseRate);
    setHsn(row.hsn);
    setDate(row.date);
    setLocation(row.location);
    setSaltName(row.saltName);
    setMfg(row.mfg);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showToastMessage = () => {
    toast.warning("Don't leave the Date fields Empty !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  function remove(row) {
    handleOpen();
    setUniqueId(row.id);
  }
  async function dataDelete() {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/stock/delete",
        { _id: uniqueId },
        config
      );
      if (data) {
        setMessage(data.message);
        setOpenSuccess(true);
        window.location.reload(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setOpenError(true);
    }
    setOpen(false);
  }

  const handleClose3 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

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
      <Box>
        <AdminHeader
          setUpdateTrigger={setUpdateTrigger}
          updateTrigger={updateTrigger}
        />

        <Stack sx={{ color: "black", padding: "30px" }}>
          <Typography variant="h4" fontWeight="700" mb="25px">
            Update StockList
          </Typography>

          <Stack gap="25px">
            <Stack
              sx={{ flexDirection: { xs: "coloumn", sm: "row" }, gap: "20px" }}
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
              <TextField
                label="Rate"
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
            <Stack
              sx={{ flexDirection: { xs: "coloumn", sm: "row" }, gap: "20px" }}
            >
              <TextField
                label="Purchase Price"
                value={purchaseRate}
                onChange={(e) => setPurchaseRate(e.target.value)}
              />
              <TextField
                label="HSN CODE"
                value={hsn}
                onChange={(e) => setHsn(e.target.value)}
              />
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
                onChange={(e) => setLocation(e.target.value)}
                sx={{ width: 450 }}
              />
            </Stack>
            <Stack
              sx={{ flexDirection: { xs: "coloumn", sm: "row" }, gap: "25px" }}
            >
              <TextField
                label="Batch Number"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                sx={{ width: 400 }}
              />
              <TextField
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                sx={{ width: 200 }}
              />
              <TextField
                label="Free"
                value={free}
                onChange={(e) => setFree(e.target.value)}
                sx={{ width: 200 }}
              />
               <TextField
                  label="MFG"
                  value={mfg}
                
                  onChange={(e) => setMfg(e.target.value)}
                />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  maxWidth: "200px",
                  padding: "16px 33px",
                  borderRadius: "42px",
                }}
                onClick={Update}
              >
                Update
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: { xs: "row" },
            justifyContent: { xs: "space-between" },
            alignItems: { xs: "left", sm: "center" },
            marginTop: "10px",
            gap: "10px",
            padding: {
              xs: "10px 20px",
              sm: "10px 40px",
              md: "15px 70px 15px 38px",
              lg: "15px 40px 15px 30px ",
            },
            position: "relative",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "19px", xl: "29px" }, fontWeight: "700" }}
          >
            Stock List
          </Typography>
          <Stack
            direction="row"
            gap="20px"
            sx={{
              justifyContent: { xs: "left", sm: "space-between" },
              alignItems: { xs: "left", sm: "center" },
            }}
          >
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
              Sort By{" "}
              <KeyboardArrowDownIcon
                sx={{ fontSize: { xs: "16px", sm: "17px", xl: "19px" } }}
              />
            </CustYellowButton>
            <Menu
              sx={{ padding: "100px" }}
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
                onClick={() => {
                  setSortMethod("name");
                  console.log(sortMethod);
                }}
                sx={{ textDecoration: "none", margin: "5px 0" }}
              >
                Name
              </MenuItem>
              <MenuItem
                onClick={() => setSortMethod("hsn")}
                sx={{ textDecoration: "none" }}
              >
                HSN
              </MenuItem>
              {/* <Link to="/"> */}
              <MenuItem
                onClick={() => setSortMethod("date")}
                sx={{ textDecoration: "none" }}
              >
                Expiry Date
              </MenuItem>
              <MenuItem
                onClick={() => setSortMethod("batch")}
                sx={{ textDecoration: "none" }}
              >
                Batch
              </MenuItem>
              {/* </Link> */}
            </Menu>
          </Stack>
        </Stack>

        {/*Table */}
        <Box sx={{ padding: "15px 20px" }}>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: { xl: "22px" } }}
                  >
                    Sl.no.
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: { xl: "22px" } }}
                  >
                    HSN
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: { xl: "22px" } }}
                  >
                    Items Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: { xl: "22px" } }}
                    align="right"
                  >
                    Pack
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: { xl: "22px" } }}
                    align="right"
                  >
                    Batch
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: { xl: "22px" } }}
                    align="right"
                  >
                    Expiry Date
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: { xl: "22px" } }}
                    align="right"
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: { xl: "22px" } }}
                    align="right"
                  >
                    Free
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: { xl: "22px" } }}
                    align="right"
                  >
                    Rate
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontSize: { xl: "22px" } }}
                    align="right"
                  >
                    Location
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockList.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ fontSize: { xl: "20px" } }}>
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: { xl: "20px" }, marginLeft: "-10px" }}
                      align="left"
                    >
                      {row.hsn}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xl: "20px" } }}>
                      {row.name}
                    </TableCell>

                    <TableCell sx={{ fontSize: { xl: "20px" } }} align="right">
                      {row.pack}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xl: "20px" } }} align="right">
                      {row.batch}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xl: "20px" } }} align="right">
                      {row.expiry}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xl: "20px" } }} align="right">
                      {row.quantity}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xl: "20px" } }} align="right">
                      {row.free}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xl: "20px" } }} align="right">
                      {row.rate}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xl: "20px" } }} align="right">
                      {row.location}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <DeleteIcon onClick={() => remove(row)} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <UpgradeIcon onClick={() => upgrade(row)} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
        rowsPerPageOptions={[10, 20,30]}
        component="div"
        count={info.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </Box>
      </Box>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              mb="15px"
            >
              Are you sure want to Delete
            </Typography>
            <Stack direction="row" gap="10px">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dataDelete()}
              >
                Confirm
              </Button>
            </Stack>
          </Box>
        </Modal>
        <ToastContainer />
      </div>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose3} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose3} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose3}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      
    </>
  );
};

export default UpdateStock;
