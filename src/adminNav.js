import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilGroup,
  cilHome,
  cilCarAlt,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const adminNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/adminDashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Manage',
  },
  {
    component: CNavItem,
    name:'Passengers',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    to: '/allCustomers',

  },
  {
    component: CNavItem,
    name:'Drivers',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    to: '/allDrivers',

  },

  {
    component: CNavTitle,
    name: 'Manage',
  },
  {
    component: CNavItem,
    name:'Vehicles',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    to: '/allVehicles',

  },

//   {
//     component: CNavGroup,
//     name: 'Pages',
//     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Error 404',
//         to: '/404',
//       },
//       {
//         component: CNavItem,
//         name: 'Error 500',
//         to: '/500',
//       },
//     ],
//   },
]

export default adminNav
