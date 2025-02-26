import React, { useContext } from 'react'
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectAgentRoute = ({children}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  if(user?.user?.accountType!=="Agent"){
    navigate('/');
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectAgentRoute;
