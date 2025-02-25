import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getUserProfile } from "../api/user";
import { cashIn, sendMoney } from "../api/transactions";
import { Link } from "react-router-dom";

const AgentDashboard = () => {
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
  }, [user, formData, profileData]); // Dependency array includes `user` to refetch when it changes

  const handleSubmit = (e, type) => {
    e.preventDefault();
    console.log(`${type} transaction:`, formData[type]);
    setFormData({ ...formData, [type]: { receiver: "", amount: "" } });

    // handle send money and cash out logic. 

    if (type == "cashIn") {
      const transactionData = { sender: user?.user?.mobile, ...formData[type], type: "Cash In", amount: Number(formData[type].amount) };
      console.log(transactionData, "transactionData");
      const handlecashIn = async () => {
        if (!user?.user?.mobile) return; // Ensure user is available before making the request
        try {
          const res = await cashIn(transactionData);
          console.log("User Profile Data ", res);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      handlecashIn();
    }


    if (type == "sendMoney") {
      const transactionData = { sender: user?.user?.mobile, ...formData[type], type: "Send Money", amount: Number(formData[type].amount) };
      console.log(transactionData, "transactionData");
      const handleCSendMoney = async () => {
        if (!user?.user?.mobile) return; // Ensure user is available before making the request
        try {
          const res = await sendMoney(transactionData);
          console.log("User Profile Data ", res);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      handleCSendMoney();
    }

  };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl p-4 rounded-xl shadow text-gray-900 bg-white border">
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="text-base font-medium">User Account Details</h2>
          <div className="flex gap-2">
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
            {["Total Balance", "Name", "Mobile Number", "Email", "Nid", "Income"].map((label, index) => {
              const value = {
                "Total Balance": `$${profileData?.balance || 0}`,
                Name: profileData?.name || "N/A",
                "Mobile Number": profileData?.mobile || "N/A",
                Email: profileData?.email || "N/A",
                Nid: profileData?.nid || "N/A",
                Income: profileData?.income || "N/A",
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
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
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