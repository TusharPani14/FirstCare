import { Route, Routes } from "react-router-dom";
import LogIn from "./Pages/UserPages/Login";
import StockList from "./Pages/AdminPages/StockList";
import StockView from "./Pages/UserPages/StockView";
import SignIn from "./Pages/AdminPages/SignIn";
import Bill from "./Pages/UserPages/Bill";
import UpdateStock from "./Pages/AdminPages/UpdateStock";
import ProfitPage from "./Pages/AdminPages/ProfitPage";
import DeleteStock from "./Pages/AdminPages/DeleteStock";



function App() {
  return (
    <>  
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/adminStockList" element={<StockList/>} />
        <Route path="/adminProfitPage" element={<ProfitPage/>} />
        <Route path="/deleteStockPage" element={<DeleteStock/>} />
        <Route path="/update" element={<UpdateStock/>} />
        <Route path="/userLogin" element={<LogIn />} />
        <Route path="/userStockView" element={<StockView/>} />
        <Route path="/bill" element={<Bill/>} />
      </Routes>
    </>
  );
}

export default App;
