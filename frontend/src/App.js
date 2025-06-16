import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EquipmentList from './pages/EquipmentList';
import EquipmentForm from './pages/EquipmentForm';
import Layout from './components/Layout';
import theme from './theme';

const PrivateRouteWrapper = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRouteWrapper>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRouteWrapper>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRouteWrapper>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRouteWrapper>
        }
      />
      <Route
        path="/equipment"
        element={
          <PrivateRouteWrapper>
            <Layout>
              <EquipmentList />
            </Layout>
          </PrivateRouteWrapper>
        }
      />
      <Route
        path="/equipment/new"
        element={
          <PrivateRouteWrapper>
            <Layout>
              <EquipmentForm />
            </Layout>
          </PrivateRouteWrapper>
        }
      />
      <Route
        path="/equipment/edit/:id"
        element={
          <PrivateRouteWrapper>
            <Layout>
              <EquipmentForm />
            </Layout>
          </PrivateRouteWrapper>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
