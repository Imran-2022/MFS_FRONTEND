import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const AgentDashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ sendMoney: { receiver: "", amount: "" }, cashIn: { receiver: "", amount: "" } });

  const handleChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: { ...formData[type], [e.target.name]: e.target.value }
    });
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    console.log(`${type} transaction:`, formData[type]);
    setFormData({ ...formData, [type]: { receiver: "", amount: "" } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl p-4 rounded-xl shadow text-gray-900 bg-white border">
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="text-base font-medium">Agent Account Details</h2>
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
                  {label === "Total Balance" ? "$5000" : label === "Name" ? "John Doe" : label === "Mobile Number" ? "+1234567890" : label === "Email" ? "johndoe@example.com" : "123456789"}
                </td>
              </tr>
            ))}
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



