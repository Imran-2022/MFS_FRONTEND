import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllTransactions } from "../api/transactions";

const AllTransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { mobile } = useParams();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!mobile) return;
      try {
        const res = await getAllTransactions();
        setTransactions(res);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [mobile]);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Header Section */}
      <div className="w-[70%] bg-white shadow-md px-4 py-5 rounded-t-lg flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-700">ALL Transaction Details, total Count: {transactions?.length ||"N/A"}</h2>
        <Link to="/admin">
          <button className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium hover:opacity-80 transition">
            Back to Account
          </button>
        </Link>
      </div>

      {/* Transactions Table */}
      <div className="w-[70%] overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white shadow-md rounded-b-lg text-sm">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-2 text-left">Type</th>
              <th className="py-2 px-2 text-left">Sender</th>
              <th className="py-2 px-2 text-left">Receiver</th>
              <th className="py-2 px-2 text-left">Amount</th>
              <th className="py-2 px-2 text-left">Transaction ID</th>
              <th className="py-2 px-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.transactionId} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-2">{tx.type}</td>
                  <td className="py-2 px-2">{tx.sender}</td>
                  <td className="py-2 px-2">{tx.receiver}</td>
                  <td className="py-2 px-2 text-green-600 font-semibold">${tx.amount}</td>
                  <td className="py-2 px-2">{tx.transactionId}</td>
                  <td className="py-2 px-2">{new Date(tx.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-2 text-gray-500">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTransactionPage;