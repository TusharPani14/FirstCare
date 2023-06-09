import {
  Box,
  Button,
  Stack,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../UserPages/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function CreateUser() {
  var userInfo;
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [id, setId] = useState("");
  const [userupd, setUserupd] = useState("");
  const [pwdupd, setPwdupd] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [userList, setUserList] = useState(() => []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const showToastMessage = () => {
    toast.success("User removed successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) navigate("/");
  });

  async function updateUser(n) {
    setPwdupd(n.pwd);
    setUserupd(n.user);
    setId(n.id);
  }

  async function updateButton() {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        "/user/updateUser",
        {
          id: id,
          email_phoneNo: userupd,
          password: pwdupd,
        },
        config
      );
      if (data) {
        setMessage(data.message);
        setOpenSuccess(true);
        fetchUsers();
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setMessage(e.message);
      setOpenError(true);
    }
  }

  async function createUser() {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/user/createUser",
        {
          email_phoneNo: user,
          password: pwd,
        },
        config
      );
      console.log(data);
      if (data) {
        setMessage(data.message);
        setOpenSuccess(true);
        fetchUsers();
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setMessage(e.message);
      setOpenError(true);
    }
  }

  const fetchUsers = async () => {
    setLoading(true);
    setUserList(() => []);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const users = await axios.get("/user/getUsers", config);
      const userssList = users.data.userList;
      if (userssList) {
        Array.prototype.forEach.call(userssList, (d) => {
          // Add Row
          setUserList((prevRows) => [...prevRows, myFunction(d)]);
        });
      }
      function myFunction(userItem) {
        return {
          id: userItem._id,
          user: userItem.email_phoneNo,
          pwd: userItem.password,
        };
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteUser() {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/user/deleteUser",
        { _id: id },
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <>
      <AdminHeader />
      <Stack
        sx={{
          padding: { md: "40px", xs: "5px" },
          flexDirection: { md: "row", xs: "column" },
          gap: "25px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ width: "360px", gap: "15px" }}>
          <Typography variant="h5" color="initial">
            Create User
          </Typography>
          <TextField
            label="Email or PhoneNo"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            label="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <Button variant="contained" onClick={createUser}>
            Create User
          </Button>
        </Stack>
        <Stack sx={{ width: "360px", gap: "15px" }}>
          <Typography variant="h5" color="initial">
            Update User
          </Typography>
          <TextField
            label="Email or PhoneNo"
            value={userupd}
            onChange={(e) => setUserupd(e.target.value)}
          />
          <TextField
            label="Password"
            value={pwdupd}
            onChange={(e) => setPwdupd(e.target.value)}
          />
          <Button variant="contained" onClick={updateButton}>
            update User
          </Button>
        </Stack>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "650px", margin: "25px auto" }}
      >
        <Table sx={{ padding: "20px" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Info</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((n) => {
              return (
                <TableRow>
                  <TableCell>{n.user}</TableCell>
                  <TableCell>{n.pwd}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => updateUser(n)}>
                      <UpgradeIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => {
                      setId(n.id)
                      setOpen(true)}}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
      <Footer />
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
              Are you sure want to remove this user
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
                onClick={() => deleteUser()}
              >
                Confirm
              </Button>
            </Stack>
          </Box>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
}
