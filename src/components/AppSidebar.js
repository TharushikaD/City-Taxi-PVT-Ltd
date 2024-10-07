import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { AppSidebarNav } from './AppSidebarNav';

import operatorNav from 'src/operatorNav';
import adminNav from 'src/adminNav';
import driverNav from 'src/driverNav';
import _nav from 'src/_nav';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);


  const userRole = localStorage.getItem('userType');


  let navigation;
  switch (userRole) {
    case 'Admin':
      navigation = adminNav;
      break;
    case 'Driver':
      navigation = driverNav;
      break;
    case 'Operator':
      navigation = operatorNav;
      break;
    case 'Customer':
    default:
      navigation = _nav;
      break;
  }

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/" style={{ textDecoration: 'none' }}>
          <img
            src="src/assets/resources/logo.jpeg"
            alt="City Taxi Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#fff' }}>
            CITY TAXI PVT LTD
          </span>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
