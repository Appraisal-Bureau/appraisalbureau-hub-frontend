import Navbar from 'components/Navbar/Navbar';
import Page from 'components/Page/Page';
import Sidebar from 'components/Sidebar/Sidebar';
import { useAuthContext } from 'context/AuthContext';
import { getToken } from 'helpers/auth.helpers';
import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import './App.scss';

const Dashboard = React.lazy(() => import('pages/Dashboard'));
const Portfolio = React.lazy(() => import('pages/Portfolio'));
const Login = React.lazy(() => import('pages/Login'));
const Register = React.lazy(() => import('pages/Register'));

function App() {
  const { isLoading } = useAuthContext();
  const wrapPrivateRoute = (element) => {
    if (isLoading) {
      return null;
    }
    if (getToken()) {
      return element;
    } else {
      return <Navigate to="/login" replace />;
    }
  };
  const AuthorizedUserLayout = () => (
    <Page>
      <Navbar />
      <Sidebar />
      <div className="content-container">
        <Outlet />
      </div>
    </Page>
  );
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            getToken() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            getToken() ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route element={wrapPrivateRoute(<AuthorizedUserLayout />)}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
