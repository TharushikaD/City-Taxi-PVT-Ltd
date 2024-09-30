import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
  cilCarAlt,
  cilHome,
  cilAlignCenter
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const driverNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/driverDashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Manage',
  },
  
  {
    component: CNavItem,
    name:'Vehicles',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    to: '/driverVehicles',

  },

  {
    component: CNavTitle,
    name: 'View',
  },
  
  {
    component: CNavItem,
    name:'History & Feedbacks',
    icon: <CIcon icon={cilAlignCenter} customClassName="nav-icon" />,
    to: '/bookingHistory',

  },



]

export default driverNav
