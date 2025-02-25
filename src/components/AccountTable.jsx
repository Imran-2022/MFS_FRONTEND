export default function AccountTable({ accounts }) {
    const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);
  
    return (
      <table className="w-full text-xs border-collapse border border-gray-300  rounded-xl overflow-hidden">
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index} className="border">
              <td className="font-semibold text-left p-2">{account.name}:</td>
              <td className="text-right p-2 text-green-600 font-bold">{`$${account.balance}`}</td>
            </tr>
          ))}
          <tr className="border">
            <td className="font-semibold text-left p-2">Total Balance:</td>
            <td className="text-right p-2 text-green-600 font-bold">{`$${totalBalance}`}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  