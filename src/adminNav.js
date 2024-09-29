import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
  cilCarAlt,
  cilGroup,
  cilHome
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const adminNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,

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
