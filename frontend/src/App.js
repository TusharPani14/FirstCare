import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/AdminPages/SignIn";
import LogIn from "./Pages/UserPages/Login";
import StockList from "./Pages/AdminPages/StockList";
import StockView from "./Pages/UserPages/StockView";
import ProfitPage from "./Pages/AdminPages/ProfitPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/adminLogin" element={<SignIn />} />
        <Route path="/userLogin" element={<LogIn />} />
        <Route path="/adminStockList" element={<StockList/>} />
        <Route path="/userStockView" element={<StockView/>} />
        <Route path="/" element={<ProfitPage/>} />
      </Routes>
    </>
  );
}

export default App;
