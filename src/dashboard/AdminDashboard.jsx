import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getAgentsBalance, getAgentswithPending, getAgentswithRechargeRequest, getCountOfUsers, getUserProfile, getUsersBalance } from "../api/user";
import { Link } from "react-router-dom";
import AccountTable from "../components/AccountTable";

const AdminDashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ sendMoney: { receiver: "", amount: "" }, cashIn: { receiver: "", amount: "" } });
  const [profileData, setProfileData] = useState(null); // State for user profile

  const handleChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: { ...formData[type], [e.target.name]: e.target.value },
    });
  };


  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.user?.mobile) return; // Ensure user is available before making the request
      try {
        const profile = await getUserProfile(user?.user?.mobile);
        // console.log("User Profile Data ", profile);
        setProfileData(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user]); // Dependency array includes `user` to refetch when it changes


  // pending agent size, 

  const [agents, setAgents] = useState([]);
  const [countUser, setCountUser] = useState([]);
  const [balanceRequest, setBalanceRequest] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await getAgentswithPending();
        setAgents(res);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await getAgentswithRechargeRequest();
        setBalanceRequest(res);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await getCountOfUsers();
        setCountUser(res);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  const [userTotalBalance, setUserTotalBalance] = useState(0);
  const [agentTotalBalance, setAgentTotalBalance] = useState(0);

  useEffect(() => {
      async function fetchBalances() {
          setUserTotalBalance(await getUsersBalance());
          setAgentTotalBalance(await getAgentsBalance());
      }
      fetchBalances();
  }, []);

  const accounts = [
    { name: "Total Admin Account Balance", balance: `${profileData?.balance || 0}` },
    { name: "Total Users Account Balance", balance: userTotalBalance },
    { name: "Total Agents Account Balance", balance: agentTotalBalance },
  ];


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl p-4 rounded-xl shadow text-gray-900 bg-white border">
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="text-base font-medium">Admin Account Details</h2>
          <div className="flex gap-2">
            <Link
              to={`/admin/${user?.user?.mobile}`}
              className="px-3 py-1 text-xs rounded-md bg-blue-500 text-white font-medium hover:opacity-80 transition"
            >
              Transaction History
            </Link>
            <button
              onClick={logout}
              className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium hover:opacity-80 transition"
            >
              Logout
            </button>
          </div>

        </div>

        <table className="w-full text-xs border-collapse border border-gray-300 rounded-xl overflow-hidden">
          <tbody>
            {["Total Balance", "Name", "Mobile Number", "Email", "Nid"].map((label, index) => {
              const value = {
                "Total Balance": `$${profileData?.balance || 0}`,
                Name: profileData?.name || "N/A",
                "Mobile Number": profileData?.mobile || "N/A",
                Email: profileData?.email || "N/A",
                Nid: profileData?.nid || "N/A",
              }[label];

              return (
                <tr key={index} className="border">
                  <td className="font-semibold text-left p-2">{label}:</td>
                  <td className={`text-right p-2 ${label === "Total Balance" ? "text-green-600 font-bold" : ""}`}>
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

      </div>

      {/* Total Balance of the Entire System */}

     

      {/* Transaction Forms */}
      <div className="w-full max-w-4xl mt-4 flex gap-4">
      <div className="w-1/2 p-4 rounded-xl shadow text-gray-900 border bg-white">
        <h2 className="text-sm font-semibold text-center mb-2">Total Balance in the System</h2>
        <AccountTable accounts={accounts} />
      </div>

        <div className="w-1/2 p-4 rounded-xl shadow text-gray-900 border bg-white">
          <h2 className="text-sm font-semibold text-center mb-2">Handle Admin Task</h2>
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="p-2 text-left font-semibold">Task</th>
                <th className="p-2 text-center font-semibold">Pending</th>
                <th className="p-2 text-right font-semibold">Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              <tr className="border-b">
                <td className="p-1 text-left text-sm">Agents Account Approval</td>
                <td className="p-1 text-center text-blue-600 font-bold text-xs">{agents.length || "0"}</td>
                <td className="p-1 text-right">
                  <Link to="/manage/agents_account">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg text-xs font-semibold hover:opacity-90 transition px-3 py-1"
                    >
                      Manage
                    </button>
                  </Link>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-1 text-left text-sm">Agent Balance Recharge</td>
                <td className="p-1 text-center text-blue-600 font-bold text-xs">{balanceRequest.length||"0"}</td>
                <td className="p-1 text-right">
                  <Link to="/manage/agents_recharge">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg text-xs font-semibold hover:opacity-90 transition px-3 py-1"
                    >
                      Manage
                    </button>
                  </Link>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-1 text-left text-sm">Manage Users of the System</td>
                <td className="p-1 text-center text-blue-600 font-bold text-xs">{countUser}</td>
                <td className="p-1 text-right">
                  <Link to="/manage/manage_user">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg text-xs font-semibold hover:opacity-90 transition px-3 py-1"
                    >
                      Manage
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;