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
import AgentsAccountApproval from './page/AgentsAccountApproval';
import AgentsBalanceRecharge from './page/AgentsBalanceRecharge';
import ManageUsers from './page/ManageUsers';
import AdminTransactionPage from './page/AdminTransactionPage';
import ProtectUserRoute from './context/ProtectUserRoute';
import ProtectAdminRoute from './context/ProtectAdminRoute';
import ProtectAgentRoute from './context/ProtectAgentRoute';
import TransactionPage from './page/TransactionPage';

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
        element:  <ProtectUserRoute><UserDashboard/></ProtectUserRoute>
      }, 
      {
        path: '/user/:mobile',
        element: <ProtectUserRoute><UserTransactionPage/></ProtectUserRoute>
      }, 
      {
        path: '/agent/:mobile',
        element: <ProtectAgentRoute><AgentTransactionPage/></ProtectAgentRoute>
      }, 
      {
        path: '/admin/:mobile',
        element: <ProtectAdminRoute><AdminTransactionPage/></ProtectAdminRoute>
      }, 
      {
        path: '/agent',
        element: <ProtectAgentRoute><AgentDashboard/></ProtectAgentRoute>
      }, 
      {
        path: '/admin',
        element: <ProtectAdminRoute><AdminDashboard/></ProtectAdminRoute>
      }, 
      {
        path: '/manage/agents_account',
        element: <ProtectAdminRoute><AgentsAccountApproval/></ProtectAdminRoute>
      }, 
      {
        path: '/manage/manage_user',
        element: <ProtectAdminRoute><ManageUsers/></ProtectAdminRoute>
      }, 
      {
        path: '/manage/:mobile',
        element: <ProtectAdminRoute><TransactionPage/></ProtectAdminRoute>
      }, 
      {
        path: '/manage/agents_recharge',
        element: <ProtectAdminRoute><AgentsBalanceRecharge/></ProtectAdminRoute>
      }, 
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
