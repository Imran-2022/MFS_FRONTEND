import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getUserProfile } from "../api/user";
import { cashOut } from "../api/transactions";

const UserDashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ sendMoney: { receiver: "", amount: "" }, cashOut: { receiver: "", amount: "" } });
  const [profileData, setProfileData] = useState(null); // State for user profile

  const handleChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: { ...formData[type], [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    console.log(`${type} transaction:`, formData[type]);
    setFormData({ ...formData, [type]: { receiver: "", amount: "" } });

    // handle send money and cash out logic. 

    if(type="cashOut"){
      const transactionData= {sender:user?.user?.mobile,...formData[type],type:"Cash Out",amount:Number(formData[type].amount)};
      console.log(transactionData,"transactionData");
      const handleCashOut = async () => {
        if (!user?.user?.mobile) return; // Ensure user is available before making the request
        try {
          const profile = await cashOut(transactionData);
          console.log("User Profile Data ", profile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
  
      handleCashOut();
    }

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


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl p-4 rounded-xl shadow text-gray-900 bg-white border">
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="text-base font-medium">User Account Details</h2>
          <button
            onClick={logout}
            className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium hover:opacity-80 transition"
          >
            Logout
          </button>
        </div>

        <table className="w-full text-xs border-collapse border border-gray-300 rounded-xl overflow-hidden">
          <tbody>
            {["Total Balance", "Name", "Mobile Number", "Email", "NID"].map((label, index) => (
              <tr key={index} className="border flex justify-between p-2">
                <td className="font-semibold w-1/2 text-left">{label}:</td>
                <td className={`w-1/2 text-right ${label === "Total Balance" ? "text-green-600 font-bold" : ""}`}>
                  {label === "Total Balance"
                    ? `$${profileData?.balance || 0}`
                    : label === "Name"
                      ? profileData?.name || "N/A"
                      : label === "Mobile Number"
                        ? profileData?.mobile || "N/A"
                        : label === "Email"
                          ? profileData?.email || "N/A"
                          : profileData?.nid || "N/A"}
                    </td>
                  </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Transaction Forms */}
      <div className="w-full max-w-4xl mt-4 flex gap-4">
        {["sendMoney", "cashOut"].map((type, index) => (
          <div key={type} className="w-1/2 p-4 rounded-xl shadow text-gray-900 border bg-white">
            <h2 className="text-sm font-semibold text-center">{type === "sendMoney" ? "Send Money" : "Cash Out"}</h2>
            <form className="mt-2 space-y-2" onSubmit={(e) => handleSubmit(e, type)}>
              <input
                type="text"
                name="receiver"
                placeholder={type === "sendMoney" ? "Receiver Phone" : "Agent Phone"}
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
                {type === "sendMoney" ? "Send Money" : "Cash Out"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
