import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getUserProfile, updateAgentAccountStatus } from "../api/user";
import { cashIn, sendMoney } from "../api/transactions";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AgentDashboard = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ sendMoney: { receiver: "", amount: "",pin:"" }, cashIn: { receiver: "", amount: "",pin:"" } });
  const [profileData, setProfileData] = useState(null); // State for user profile
  const [refresh, setRefresh] = useState(false);

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
  }, [user, refresh]); // Dependency array includes `user` to refetch when it changes

  const handleSubmit = (e, type) => {
    e.preventDefault();
    // console.log(`${type} transaction:`, formData[type]);

    // handle send money and cash out logic. 

    if (type == "cashIn") {
      const transactionData = {
        sender: user?.user?.mobile,
        receiver: formData[type].receiver, 
        amount: Number(formData[type].amount),
        pin : formData[type].pin,
        type: "Cash In"
      };
      const handlecashIn = async (e) => {
        if (!user?.user?.mobile) return; // Ensure user is available before making the request
        try {
          const res = await cashIn(transactionData);
          const {amount,receiver,transactionId,type} = res;
          
          toast.success( `${type} $${amount} to ${receiver} successful. ! TrxID : ${transactionId}`);
          setRefresh(!refresh);
          setFormData({ ...formData, [e]: { receiver: "", amount: "",pin:"" } });
        } catch (error) {
          // console.error("Error:", error.response?.data || error.message);
          toast.error(error.response?.data?.error || "Something went wrong!");
        }
      };

      handlecashIn(type);
    }


    if (type == "sendMoney") {

      const transactionData = {
        sender: user?.user?.mobile,
        receiver: formData[type].receiver, 
        amount: Number(formData[type].amount),
        pin : formData[type].pin,
        type: "Send Money"
      };

      // console.log(transactionData, "transactionData");
      const handleCSendMoney = async (e) => {
        if (!user?.user?.mobile) return; // Ensure user is available before making the request
        try {
          const res = await sendMoney(transactionData);
          // console.log("sendMoney Response",res)
          const {amount,receiver,transactionId,type} = res;
          
          toast.success( `${type} $${amount} to ${receiver} successful. ! TrxID : ${transactionId}`);
          setRefresh(!refresh);
          setFormData({ ...formData, [e]: { receiver: "", amount: "",pin:"" } });
        } catch (error) {
          toast.error(error.response?.data?.error || "Something went wrong!");
        }
      };

      handleCSendMoney(type);
    }

  };


  // handle balance recharge request to admin 

  const handleRecharge=async(balanceRequest)=>{
    if (!user?.user?.mobile) return; 
    try {
        if(!balanceRequest){
          const approval = "balanceRequest";
            const result = await updateAgentAccountStatus(user?.user?.mobile, approval);
            setRefresh(!refresh)
            toast.success("Balance Recharge Requested!!");
        }
        else{
          toast.error("Balance Recharge Requested Pending .........!!");
        }
        } catch (error) {
          toast.error(error.response?.data?.error || "Something went wrong!");
      }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <ToastContainer />
      <div className="w-full max-w-4xl p-4 rounded-xl shadow text-gray-900 bg-white border">
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="text-base font-medium">Agent Account Details</h2>
          <div className="flex gap-2">
            {profileData?.approval === "pending" && (
              <div className="bg-red-100 text-red-600 border border-red-400 px-3 py-1 rounded-md text-xs font-semibold text-center">
                ❌ Not Verified
              </div>
            )}
            {profileData?.approval === "rejected" && (
              <div className="bg-red-100 text-red-600 border border-red-400 px-3 py-1 rounded-md text-xs font-semibold text-center">
                ❌ Account Rejected
              </div>
            )}

            {
              profileData?.approval==="verified" && profileData?.status==="active" &&(
                <button disabled={profileData?.balanceRequest}
              onClick={()=>handleRecharge(profileData?.balanceRequest)}
              className="px-3 py-1 text-xs rounded-md bg-purple-600 text-white font-medium hover:opacity-80 transition"
            >
              
              {
                !profileData?.balanceRequest ?"Balance-Recharge Request":"Balance-Recharge Request pending"
              }
            </button>
              )
            }
            {
              profileData?.status==="block" && <button disabled className="bg-red-100 text-red-600 border border-red-400 px-3 py-1 rounded-md text-xs font-semibold text-center">❌ Blocked Account</button>
            }

            <Link
              to={`/agent/${user?.user?.mobile}`}
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
                "Total Balance": showBalance ? `$${profileData?.balance || 0}` : "************",
                Name: profileData?.name || "N/A",
                "Mobile Number": profileData?.mobile || "N/A",
                Email: profileData?.email || "N/A",
                Nid: profileData?.nid || "N/A",
              }[label];

              return (
                <tr key={index} className="border">
                  <td className="font-semibold text-left p-2">{label}:</td>
                  <td
                    className={`text-right p-2 ${["Total Balance"].includes(label) ? "text-green-600 font-bold cursor-pointer" : ""}`}
                    onClick={() => {
                      if (label === "Total Balance") setShowBalance(!showBalance);
                    }}
                  >
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

      </div>

      {/* Transaction Forms */}
      <div className="w-full max-w-4xl mt-4 flex gap-4">
        {["sendMoney", "cashIn"].map((type, index) => (
          <div key={type} className="w-1/2 p-4 rounded-xl shadow text-gray-900 border bg-white">
            <h2 className="text-sm font-semibold text-center">{type === "sendMoney" ? "Send Money" : "Cash In"}</h2>
            <form className="mt-2 space-y-2" onSubmit={(e) => handleSubmit(e, type)}>
              <input
                type="text"
                name="receiver"
                placeholder="Receiver Phone"
                value={formData[type].receiver}
                onChange={(e) => handleChange(e, type)}
                className="w-full p-2 border rounded-lg focus:ring-0 focus:outline-none"
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData[type].amount}
                onChange={(e) => handleChange(e, type)}
                className="w-full p-2 border rounded-lg focus:ring-0 focus:outline-none"
                required
              />
              <input
                type="password"
                name="pin"
                placeholder="pin"
                value={formData[type].pin}
                onChange={(e) => handleChange(e, type)}
                className="w-full p-2 border rounded-lg focus:ring-0 focus:outline-none"
                required
              />
              <button disabled={profileData?.status==="block"||profileData?.approval!=="verified"} type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                {type === "sendMoney" ? "Send Money" : "Cash In"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentDashboard;