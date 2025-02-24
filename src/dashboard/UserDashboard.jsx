import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const UserDashboard = () => {
  const { logout,user } = useContext(AuthContext);
  return (
    <div>
      <p>welcome to user Dashboard {user?.user?.name}</p>
      <button onClick={()=>logout()}>logout</button>
    </div>
  )
}

export default UserDashboard
