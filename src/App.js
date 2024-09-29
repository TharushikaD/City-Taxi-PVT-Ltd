import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const DriverLayout = React.lazy(() => import('./layout/DriverLayout'));
const AdminLayout = React.lazy(() => import('./layout/AdminLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Home = React.lazy(() => import('./views/pages/home/Home'));
const Profile = React.lazy(() => import('./views/pages/profile/Profile'));
const Vehicles = React.lazy(() => import('./views/vehicles/Vehicles'));


const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userType');

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }

    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, [isColorModeSet, setColorMode, storedTheme]);

  
  const handleLoginSuccess = (token, usertype) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userType', usertype);
    setIsAuthenticated(true);
    setUserRole(usertype);
  };


  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" name="Home" element={<Home />} />
          <Route path="/login" name="Login Page" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" name="Register Page" element={<Register />} />

          <Route path="/adminLayout/*" element={<PrivateRoute element={<AdminLayout />} />} />
          <Route path="/defaultLayout/*" element={<PrivateRoute element={<DefaultLayout />} />} />
          <Route path="/driverLayout/*" element={<PrivateRoute element={<DriverLayout />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/vehicles" element={<PrivateRoute element={<Vehicles />} />} />
         
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
