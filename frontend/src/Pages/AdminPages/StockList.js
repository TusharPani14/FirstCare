import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Data } from "../../Utils/TrialData";
import { CustYellowButton } from "../../Utils/Theme";
import StockTable from "./StockTable";
import AdminHeader from "./AdminHeader";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StockSortAlgo from "../../Utils/StockSortAlgo";

const StockList = () => {
  
  // sorting function start
  const [sortMethod, setSortMethod] = useState("");
  let NewData = Data;
  StockSortAlgo(sortMethod,Data,NewData);
  // sorting function end

  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <Box>
        <AdminHeader />
        
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "left", sm: "space-between" },
            alignItems: { xs: "left", sm: "center" },
            marginTop: "10px",
            gap: "10px",
            padding: {
              xs: "10px",
              md: "15px 70px 15px 38px",
              lg: "15px 40px 15px 30px ",
            },
            position: "relative",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "21px", xl: "29px" }, fontWeight: "700" }}
          >
            Stock List
          </Typography>
          <Stack
            direction="row"
            gap="20px"
            sx={{
              flexWrap:"wrap",
              justifyContent: { xs: "left", sm: "space-between" },
              alignItems: { xs: "left", sm: "center" },
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              style={{ outline: "none" }}
              sx={{
                border: "2px solid #000",
                padding: { xs: "5px", sm: "6px 15px", xl: "9px 30px" },
                fontSize: { xs: "11px", sm: "12px", xl: "16px" },
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
                fontSize: { xs: "10px", sm: "12px", xl: "16px" },
                fontWeight: "600",
                "&:hover": { margin: " 0 1px", transform: "scale(0.99)" },
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
              Sort By <KeyboardArrowDownIcon sx={{fontSize: { xs: "16px", sm: "17px", xl: "23px" },}}/>
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
        <StockTable DataArray={NewData} />
      </Box>
    </>
  );
};

export default StockList;
