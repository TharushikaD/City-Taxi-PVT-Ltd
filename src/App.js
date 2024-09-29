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
const Ride =  React.lazy(() => import('./views/pages/ride/Ride'));
const Drive =  React.lazy(() => import('./views/pages/drive/Drive'));
const Contact =  React.lazy(() => import('./views/pages/contact/Contact'));
const Profile = React.lazy(() => import('./views/pages/profile/Profile'));

//views
const Vehicles = React.lazy(() => import('./views/vehicles/Vehicles'));
const DriverVehicles = React.lazy(() => import('./views/driverVehicles/DriverVehicles'))
const AllCustomers = React.lazy(() => import('./views/allCustomers/AllCustomers'))
const AllDrivers = React.lazy(() => import('./views/allDrivers/AllDrivers'))
const AllVehicles = React.lazy(() => import('./views/allVehicles/AllVehicles'))
const Trip = React.lazy(() => import('./views/trip/Trip'))
const AddDriver = React.lazy(() => import('./views/addDriver/AddDriver'))
const AddCustomer = React.lazy(() => import('./views/addCustomer/AddCustomer'))





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
          <Route path="/ride" name="Ride" element={<Ride />} />
          <Route path="/drive" name="Drive" element={<Drive />} />
          <Route path="/contact" name="Contact" element={<Contact />} />
          <Route path="/login" name="Login Page" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" name="Register Page" element={<Register />} />

          <Route path="/adminLayout/*" element={<PrivateRoute element={<AdminLayout />} />} />
          <Route path="/defaultLayout/*" element={<PrivateRoute element={<DefaultLayout />} />} />
          <Route path="/driverLayout/*" element={<PrivateRoute element={<DriverLayout />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/vehicles" element={<PrivateRoute element={<Vehicles />} />} />
          <Route path="/allCustomers" element={<PrivateRoute element={<AllCustomers />} />} />
          <Route path="/allDrivers" element={<PrivateRoute element={<AllDrivers />} />} />
          <Route path="/driverVehicles" element={<PrivateRoute element={<DriverVehicles />} />} />
          <Route path="/allVehicles" element={<PrivateRoute element={<AllVehicles />} />} />
          <Route path="/trip" element={<PrivateRoute element={<Trip />} />} />
          <Route path="/addDriver" element={<PrivateRoute element={<AddDriver />} />} />
          <Route path="/addCustomer" element={<PrivateRoute element={<AddCustomer />} />} />


         
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
