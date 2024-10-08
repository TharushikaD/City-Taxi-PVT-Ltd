import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';
import routes from '../routes';

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
const DriverDashboard = React.lazy(() => import('../views/dashboard/DriverDashboard'));
const AdminDashboard = React.lazy(() => import('../views/dashboard/AdminDashboard'));
const OperatorDashboard = React.lazy(() => import('../views/dashboard/OperatorDashboard'))

const AppContent = () => {
  const [userRole, setUserRole] = useState(null);


  useEffect(() => {
    const role = localStorage.getItem('userType');
    setUserRole(role);
  }, []);

  
  const getDashboardComponent = () => {
    switch (userRole) {
      case 'Admin':
        return <AdminDashboard />;
      case 'Driver':
        return <DriverDashboard />;
      case 'Operator':
        return <OperatorDashboard/>;
      case 'Customer':
      default:
        return <Dashboard />;
    }
  };

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path="/" element={getDashboardComponent()} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
