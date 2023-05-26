import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/AdminPages/SignIn";
import LogIn from "./Pages/UserPages/Login";
import StockList from "./Pages/AdminPages/StockList";
import StockView from "./Pages/UserPages/StockView";

function App() {
  return (
    <>
      <Routes>
        <Route path="/adminLogin" element={<SignIn />} />
        <Route path="/userLogin" element={<LogIn />} />
        <Route path="/adminStockList" element={<StockList/>} />
        <Route path="/" element={<StockView/>} />
      </Routes>
    </>
  );
}

export default App;
