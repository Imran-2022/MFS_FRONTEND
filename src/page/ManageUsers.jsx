import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers, updateAgentAccountStatus } from "../api/user";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthContext";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await getAllUsers();
        // console.log("res", res)
        setUsers(res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchusers();
  }, [refresh]);

  // console.log(users, "users")


  // handle user - block and active status 

    const handleBlock= async (mobile) => {
      try {
        const approval = "block";
        const result = await updateAgentAccountStatus(mobile, approval);
        // console.log("user updated successfully:", result);
        setRefresh(!refresh);
        toast.success("Account Blocked!!");
      } catch (error) {
        toast.error(error.response?.data?.error || "Something went wrong!");
      }
    };
  
    const handleUnBlock = async (mobile) => {
      try {
        const approval = "unblock";
        const result = await updateAgentAccountStatus(mobile, approval);
        setRefresh(!refresh);
        toast.success("Account UnBlocked!!");
      } catch (error) {
        toast.error(error.response?.data?.error || "Something went wrong!");
      }
    };

    const handleTransactionView=async(type,mobile)=>{
      navigate(`/${type.toLowerCase()}/${mobile}`);
    }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <ToastContainer />
      {/* Header Section */}
      <div className="w-[70%] bg-white shadow-md px-4 py-5 rounded-t-lg flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-700">Manage All Users , Total Count: {users?.length || "N/A"}</h2>
        <Link to="/admin">
          <button className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium hover:opacity-80 transition">
            Back to Account
          </button>
        </Link>
      </div>

      {/* users Table */}
      <div className="w-[70%] overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white shadow-md rounded-b-lg text-sm">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-2 text-left">Account Type</th>
              <th className="py-2 px-2 text-left">Transaction History</th>
              <th className="py-2 px-2 text-left">Current Balance</th>
              <th className="py-2 px-2 text-left">Mobile</th>
              <th className="py-2 px-2 text-left">Name</th>
              <th className="py-2 px-2 text-left">Email</th>
              <th className="py-2 px-2 text-left">NID</th>
              <th className="py-2 px-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-2">{user.accountType}</td>
                  <td className="py-2 px-2 flex space-x-2">
                    <button onClick={()=>handleTransactionView(user.accountType,user.mobile)}
                      className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium hover:opacity-80 transition"
                    >
                      Transactions
                    </button>
                  </td>
                  <td className="py-2 px-2">{user.balance}</td>
                  <td className="py-2 px-2">{user.mobile}</td>
                  <td className="py-2 px-2">{user.name}</td>
                  <td className="py-2 px-2">{user.email}</td>
                  <td className="py-2 px-2">{user.nid}</td>
                  <td className="py-2 px-2 flex space-x-2">
                    {
                      user?.status == "active" ? <button
                        onClick={() => handleBlock(user.mobile)}
                        className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium hover:opacity-80 transition"
                      >
                        Block
                      </button> : <button
                        onClick={() => handleUnBlock(user.mobile)}
                        className="px-3 py-1 text-xs rounded-md bg-blue-500 text-white font-medium hover:opacity-80 transition"
                      >
                        UnBlock
                      </button>
                    }
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

export default ManageUsers;