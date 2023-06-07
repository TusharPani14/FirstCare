import { Route, Routes } from "react-router-dom";
import LogIn from "./Pages/UserPages/Login";
import StockList from "./Pages/AdminPages/StockList";
import StockView from "./Pages/UserPages/StockView";
import SignIn from "./Pages/AdminPages/SignIn";
import Bill from "./Pages/UserPages/Bill";
import UpdateStock from "./Pages/AdminPages/UpdateStock";
import ProfitPage from "./Pages/AdminPages/ProfitPage";
import CreateUser from "./Pages/AdminPages/CreateUser";
import CreateStock from "./Pages/AdminPages/CreateStock";



function App() {
  return (
    <>  
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/adminStockList" element={<StockList/>} />
        <Route path="/adminProfitPage" element={<ProfitPage/>} />
        <Route path="/user" element={<CreateUser/>} />
        <Route path="/update" element={<UpdateStock/>} />
        <Route path="/create" element={<CreateStock/>} />
        <Route path="/userLogin" element={<LogIn />} />
        <Route path="/userStockView" element={<StockView/>} />
        <Route path="/bill" element={<Bill/>} />
      </Routes>
    </>
  );
}

export default App;
