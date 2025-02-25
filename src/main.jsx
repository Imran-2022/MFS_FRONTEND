import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import ErrorPage from './components/ErrorPage';
import Login from './Auth/Login';
import Register from './Auth/Register';
import UserDashboard from './dashboard/UserDashboard';
import AgentDashboard from './dashboard/AgentDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import UserTransactionPage from './page/UserTransactionPage';
import AgentTransactionPage from './page/AgentTransactionPage';
import AllTransactionPage from './page/AllTransactionPage';
import AgentsAccountApproval from './page/AgentsAccountApproval';
import AgentsWithdrawApproval from './page/AgentsWithdrawApproval';
import AgentsBalanceRecharge from './page/AgentsBalanceRecharge';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Login/>
      }, 
      {
        path: '/register',
        element: <Register/>
      }, 
      {
        path: '/user',
        element: <UserDashboard/>
      }, 
      {
        path: '/user/:mobile',
        element: <UserTransactionPage/>
      }, 
      {
        path: '/agent/:mobile',
        element: <AgentTransactionPage/>
      }, 
      {
        path: '/admin/:mobile',
        element: <AllTransactionPage/>
      }, 
      {
        path: '/agent',
        element: <AgentDashboard/>
      }, 
      {
        path: '/admin',
        element: <AdminDashboard/>
      }, 
      {
        path: '/manage/agents_account',
        element: <AgentsAccountApproval/>
      }, 
      {
        path: '/manage/agents_withdraw',
        element: <AgentsWithdrawApproval/>
      }, 
      {
        path: '/manage/agents_recharge',
        element: <AgentsBalanceRecharge/>
      }, 
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
