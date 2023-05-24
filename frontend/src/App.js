import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/AdminPages/SignIn";
import LogIn from "./Pages/UserPages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/userLogin" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
