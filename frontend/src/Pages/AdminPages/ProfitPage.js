import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { Backdrop, Box, CircularProgress } from "@mui/material";
// import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import ProfitTable from "./ProfitTable";
import { ProfitData } from "../../Utils/TrialData";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Footer from "../UserPages/Footer";

const ProfitPage = () => {
  const [profitList, setProfitList] = useState(() => []);
  const [loading, setLoading] = useState(false);

  var dateVal = 0;
  var dateVal2 = 0;
  var userInfo;
  const handleDate = (e) => {
    dateVal = new Date(e.target.value);
    dateVal2 = `${dateVal.getFullYear()}-${
      dateVal.getMonth() + 1
    }-${dateVal.getDate()}`;
    // console.log(dateVal2);
    sortByDate();
  };
  var ddate = 0;
  var ddate2 = 0;
  const [DateSortedArray2, setDateSortedArray2] = useState(ProfitData);
  var DateSortedArray = profitList;
  const sortByDate = () => {
    DateSortedArray = [];
    profitList.forEach((element) => {
      ddate = new Date(element.date);
      ddate2 = `${ddate.getFullYear()}-${
        ddate.getMonth() + 1
      }-${ddate.getDate()}`;
      if (ddate2 === dateVal2) {
        DateSortedArray.push(element);
      }
    });
    setProfitList(DateSortedArray);
    // console.log(DateSortedArray)
    // console.log(DateSortedArray2)
  };
  // sortByDate();

  const fetchProfitList = async () => {
    setLoading(true);
    setProfitList(() => []);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const bills = await axios.get("/bill/get", config);
      const billsList = bills.data.billList;

      if (billsList) {
        const updatedProfitList = await Promise.all(
          billsList.map((billItem) => myFunction(billItem, config))
        );

        setProfitList(updatedProfitList);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function myFunction(billItem, config) {
    var totalCP = 0;

    await Promise.all(
      billItem.products.map(async (product) => {
        const cp = await axios.post(
          "/stock/getCP",
          { productName: product.pname },
          config
        );
        totalCP += Number(cp.data.stockCP) * Number(product.quantity);
      })
    );

    return {
      id: billItem._id,
      serial: 1,
      invoice_number: billItem.invoiceNo,
      bill_amount: billItem.total,
      profit: Number(billItem.total) - totalCP,
      date: billItem.invoiceDate,
      name: billItem.name,
      phoneNo: billItem.phoneNo,
      products: billItem.products,
    };
  }

  useEffect(() => {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) Navigate("/");
  });

  useEffect(() => {
    fetchProfitList();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <>
      <Box>
        <AdminHeader />
        <ProfitTable DataArray={profitList} handleDate={handleDate} />
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Footer/>
    </>
  );
};

export default ProfitPage;
