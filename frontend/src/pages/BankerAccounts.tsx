import { useEffect, useState } from "react";
import { getCustomerAccounts } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const BankerAccounts = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCustomerAccounts();
        setAccounts(response.data);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    }
    fetchData();
  }, []);

  const handleViewTransactions = (userId: number) => {
    navigate(`/accounts/${userId}/transactions`);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Customer Accounts</h2>
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Customer Name</th>
              <th className="p-2 border">Balance</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length > 0 ? accounts.map((account) => (
              <tr key={account.id} className="text-center">
                <td className="p-2 border">{account.user.name}</td>
                <td className="p-2 border">₹{account.balance}</td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={() => handleViewTransactions(account.user.id)}
                  >
                    View Transactions
                  </button>
                </td>
              </tr>
            )) : <tr><td colSpan={3} className="p-2 border text-center">No accounts found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankerAccounts;
