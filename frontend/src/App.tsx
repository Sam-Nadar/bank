import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import CustomerLogin from "./pages/CustomerLogin";
import BankerLogin from "./pages/BankerLogin";
import Transactions from "./pages/Transactions";
import BankerAccounts from "./pages/BankerAccounts";
import BankerTransactions from "./pages/BankerTransactions";

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login/customer" element={<CustomerLogin />} />
        <Route path="/login/banker" element={<BankerLogin />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/accounts" element={<BankerAccounts />} />
        <Route path="/accounts/:userId/transactions" element={<BankerTransactions />} />
      </Routes>
    </Router>
  );
};

export default App;
