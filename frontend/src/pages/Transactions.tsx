import { useEffect, useState } from "react";
import { getTransactions, depositMoney, withdrawMoney } from "../services/api";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [balance, setBalance] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"DEPOSIT" | "WITHDRAWAL">("DEPOSIT");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTransactions();
        setTransactions(response.data.transactions);
        console.log(response.data.transactions)
        setBalance(response.data.balance); // Assuming balance is returned in response
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    }
    fetchData();
  }, []);

  const handleTransaction = async (amount: number) => {
    if (transactionType === "DEPOSIT") {
      await depositMoney(amount);
    } else {
      await withdrawMoney(amount);
    }
    window.location.reload(); // Refresh data after transaction
  };

  return (
    <>
    <Navbar/>
    <div className="p-6">
      <h2 className="text-2xl font-bold">Transactions</h2>

      {/* Balance & Transaction Buttons */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg">Balance: <strong>${balance}</strong></p>
        <div>
          <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => { setTransactionType("DEPOSIT"); setModalOpen(true); }}>
            Deposit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => { setTransactionType("WITHDRAWAL"); setModalOpen(true); }}>
            Withdraw
          </button>
        </div>
      </div>

      {/* Transactions Table */}
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
          )) : <tr><td colSpan={3} className="p-2 border text-center">No transactions yet</td></tr>}
        </tbody>
      </table>

      {/* Transaction Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleTransaction}
        transactionType={transactionType}
        balance={balance}
      />
    </div>
    </>
  );
};

export default Transactions;
