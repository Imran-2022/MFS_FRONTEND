import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAgentswithRechargeRequest, updateAgentAccountStatus } from "../api/user";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cashIn } from "../api/transactions";

const AgentsAccountApproval = () => {
  const [agents, setAgents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await getAgentswithRechargeRequest();
        console.log("res", res)
        setAgents(res);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, [refresh]);

  const handleAccept = async (mobile) => {
    console.log("Accept agent with ID:", mobile);
    const transactionData = {
      balanceRequest: true,
      sender: "01771207845",// admin
      receiver: mobile,
      amount: 100000,
      type: "Cash In"
    };

    const handlecashIn = async () => {
      try {
        const res = await cashIn(transactionData);
        console.log("User Profile Data ", res);
        toast.success("Balance Recharged!!");
        setRefresh(!refresh);
      } catch (error) {
        // console.error("Error:", error.response?.data || error.message);
        toast.error(error.response?.data?.error || "Something went wrong!");
      }
    };

    handlecashIn();

  };

  const handleReject = async (mobile) => {
    try {
      const approval = "rejectedRecharge";
      const result = await updateAgentAccountStatus(mobile, approval);
      setRefresh(!refresh)
      toast.success("rejected!!");
      console.log("Agent updated successfully:", result);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong!");
    }
  };

  console.log(agents, "agents")

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <ToastContainer />
      {/* Header Section */}
      <div className="w-[70%] bg-white shadow-md px-4 py-5 rounded-t-lg flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-700">ALL Agents Balance recharge Request , Total Count: {agents?.length || "N/A"}</h2>
        <Link to="/admin">
          <button className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium hover:opacity-80 transition">
            Back to Account
          </button>
        </Link>
      </div>

      {/* Agents Table */}
      <div className="w-[70%] overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white shadow-md rounded-b-lg text-sm">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-2 text-left">Account Type</th>
              <th className="py-2 px-2 text-left">Current Balance</th>
              <th className="py-2 px-2 text-left">Mobile</th>
              <th className="py-2 px-2 text-left">Name</th>
              <th className="py-2 px-2 text-left">Email</th>
              <th className="py-2 px-2 text-left">NID</th>
              <th className="py-2 px-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.length > 0 ? (
              agents.map((agent) => (
                <tr key={agent._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-2">{agent.accountType}</td>
                  <td className="py-2 px-2">{agent.balance}</td>
                  <td className="py-2 px-2">{agent.mobile}</td>
                  <td className="py-2 px-2">{agent.name}</td>
                  <td className="py-2 px-2">{agent.email}</td>
                  <td className="py-2 px-2">{agent.nid}</td>
                  <td className="py-2 px-2 flex space-x-2">
                    <button
                      onClick={() => handleAccept(agent.mobile)}
                      className="px-3 py-1 text-xs rounded-md bg-green-500 text-white font-medium hover:opacity-80 transition"
                    >
                      Recharge 100000
                    </button>
                    <button
                      onClick={() => handleReject(agent.mobile)}
                      className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium hover:opacity-80 transition"
                    >
                      Reject Request
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-2 text-gray-500">
                  No Recharge Request found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentsAccountApproval;
