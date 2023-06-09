import React, { useEffect, useState } from "react";
import { Backdrop, Box, CircularProgress, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Data } from "../../Utils/TrialData";
import { CustYellowButton } from "../../Utils/Theme";
import UserHeader from "./UserHeader";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StockTable from "../AdminPages/StockTable";
import StockSortAlgo from "../../Utils/StockSortAlgo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
const StockView = () => {
  const navigate = useNavigate();
  // sorting function start
  const [sortMethod, setSortMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [stockList, setStockList] = useState(() => []);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  let NewData = Data;
  let userInfo;
  StockSortAlgo(sortMethod, stockList, NewData); // sorting function end

  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const fetchStocks = async () => {
    setLoading(true);
    setStockList(() => []);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const stocks = await axios.get("/stock/get", config);
      const stocksList = stocks.data.stockList;
      
      if (stocksList) {
        Array.prototype.forEach.call(stocksList, (d) => {
          // Add Row
          setStockList((prevRows) => [...prevRows, myFunction(d)]);
        });
      }
      function myFunction(stockItem) {
        return {
          id: stockItem._id,
          serial: 1,
          hsn: stockItem.hsnCode,
          name: stockItem.productName,
          date: stockItem.date,
          saltName: stockItem.saltName,
          location: stockItem.location,
          mfg: stockItem.mfg,
          pack: stockItem.pack,
          batch: stockItem.batch,
          expiry: stockItem.expDate,
          quantity: stockItem.quantity,
          free: stockItem.free,
          rate: stockItem.rate,
          purchaseRate:stockItem.purchaseRate
        };
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) navigate("/");
  });

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };
  const newStocksList = stockList;
  StockSortAlgo(sortMethod, stockList,newStocksList, NewData);
  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <UserHeader />
        <Stack
          sx={{
            flexDirection: { xs: "row" },
            justifyContent: { xs: "space-between" },
            alignItems: { xs: "center" },
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
            sx={{ fontSize: { xs: "19px", xl: "27px" }, fontWeight: "700" }}
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
                fontSize: { xs: "12px", sm: "13px", xl: "16px" },
                padding: { xs: "5px 15px", sm: "7px 24px", xl: "9px 30px" },
              }}
            >
              Sort By{" "}
              <KeyboardArrowDownIcon
                sx={{ fontSize: { xs: "16px", sm: "17px", xl: "23px" } }}
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
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {stockList[0] != null && <StockTable DataArray={newStocksList} />}{" "}
      </Box>
      {/* <Footer/> */}
    </>
  );
};

export default StockView;
