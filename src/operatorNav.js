import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilGroup,
  cilHome,
  cilCarAlt,
  cilBadge
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const operatorNav = [
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
]

export default operatorNav
