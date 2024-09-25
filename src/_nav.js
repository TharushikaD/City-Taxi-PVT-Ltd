import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
  cilCarAlt,
  cilHome
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
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
  // {
  //   component: CNavGroup,
  //   name: 'Vehicles',
  //   icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Register Vehicle',
  //       to: '/vehicles',
  //     },
  //     ]
  // },
  {
    component: CNavTitle,
    name: 'Ride',
  },
  {
    component: CNavItem,
    name:'Trip',
    icon:<CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    to:'/trip'

  },

  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
]

export default _nav
