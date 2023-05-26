import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/AdminPages/SignIn";
import LogIn from "./Pages/UserPages/Login";
import StockList from "./Pages/AdminPages/StockList";
import StockView from "./Pages/UserPages/StockView";
<<<<<<< HEAD
import ProfitPage from "./Pages/AdminPages/ProfitPage";
=======
import Bill from "./Pages/UserPages/Bill";
>>>>>>> 60c6e274ca8e631cede066a74a91ae40e0d44b00


function App() {
  return (
    <>
      <Routes>
        <Route path="/adminLogin" element={<SignIn />} />
        <Route path="/userLogin" element={<LogIn />} />
        <Route path="/adminStockList" element={<StockList/>} />
<<<<<<< HEAD
        <Route path="/userStockView" element={<StockView/>} />
        <Route path="/" element={<ProfitPage/>} />
=======
        <Route path="/billpage" element={<Bill/>} />
        <Route path="/" element={<StockView/>} />
>>>>>>> 60c6e274ca8e631cede066a74a91ae40e0d44b00
      </Routes>
    </>
  );
}

export default App;
