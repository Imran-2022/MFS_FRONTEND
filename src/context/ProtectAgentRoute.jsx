import React, { useContext, useEffect, useState } from 'react'
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';

const ProtectAgentRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user?.user) {
      setLoading(false); // Stop loading once user state is available

      if (user?.user?.accountType !== "Agent") {
        navigate('/');
      }
    }
  }, [user, navigate]);

  if (loading) {
    return <LoadingPage/>;
  }

  return <>{children}</>;
};

export default ProtectAgentRoute;
