import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  transactionType: "DEPOSIT" | "WITHDRAWAL";
  balance: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, transactionType, balance }) => {
  const [amount, setAmount] = useState<number>(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (transactionType === "WITHDRAWAL" && amount > balance) {
      alert("Insufficient balance.");
      return;
    }
    onConfirm(amount);
    setAmount(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold text-center mb-4">
          {transactionType === "DEPOSIT" ? "Deposit Money" : "Withdraw Money"}
        </h2>
        <p className="text-gray-600 text-center mb-2">Available Balance: <strong>${balance}</strong></p>
        <input
          type="number"
          className="border p-2 w-full my-2"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div className="flex justify-between mt-4">
          <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
