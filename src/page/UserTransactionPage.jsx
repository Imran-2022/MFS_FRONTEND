import React, { useContext, useEffect, useState } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { getUserTransactions } from "../api/transactions";
import AuthContext from "../context/AuthContext";
import LoadingPage from "../components/LoadingPage";

const UserTransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { mobile } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user?.user) {
        setLoading(false); // Stop loading once user state is available

        if (user?.user?.mobile != mobile) {
          navigate('/');
        }
      }
      if (!mobile) return;
      try {
        const res = await getUserTransactions(mobile);
        setTransactions(res.slice(0, 100));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [mobile, user, navigate]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Header Section */}
      <div className="w-[70%] bg-white shadow-md px-4 py-5 rounded-t-lg flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-700">Transaction Details for {mobile}, total Count: {transactions?.length || "N/A"}</h2>
        <Link to="/user">
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

export default UserTransactionPage;
