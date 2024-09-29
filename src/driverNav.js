import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
  cilCarAlt,
  cilHome
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const driverNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Home',
  //   to: '/home',
  //   icon: <CIcon icon={cilHome} customClassName="nav-icon" />,

  // },
  {
    component: CNavTitle,
    name: 'Manage',
  },
  {
    component: CNavItem,
    name:'Register Vehicle',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    to: '/vehicles',

  },

  {
    component: CNavTitle,
    name: 'Availables',
  },
  {
    component: CNavItem,
    name:'Vehicles',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    to: '/driverVehicles',

  },


]

export default driverNav
