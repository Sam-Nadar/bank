import { useEffect, useState } from "react";
import { getCustomerTransactions } from "../services/api";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const BankerTransactions = () => {
  const { userId } = useParams();
  const [transactions, setTransactions] = useState<any[]>([]); //  Ensures transactions is always an array
  const [customerName, setCustomerName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); //  Handles API errors
  const [loading, setLoading] = useState(true); //  Loading state

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await getCustomerTransactions(Number(userId));


        setTransactions(response.data.transactions || []); // Ensures transactions is an array
        setCustomerName(response.data.customerName || "Unknown");
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setErrorMessage("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold">{customerName}'s Transactions</h2>

        {/*  Show Error Messages */}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        {/*  Show Loading State */}
        {loading ? (
          <p className="text-gray-500 mt-4">Loading transactions...</p>
        ) : (
          <table className="w-full mt-4 border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map((txn, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{new Date(txn.date).toLocaleDateString()}</td>
                  <td className={`p-2 border ${txn.type === "CREDIT" ? "text-green-500" : "text-red-500"}`}>
                    {txn.type === "CREDIT" ? "Deposit" : "Withdraw"}
                  </td>
                  <td className="p-2 border">${txn.amount}</td>
                </tr>
              )) : <tr><td colSpan={3} className="p-2 border text-center">No transactions found</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BankerTransactions;
