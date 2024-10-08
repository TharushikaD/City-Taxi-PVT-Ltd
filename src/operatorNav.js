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
        component: CNavItem,
        name: 'Dashboard',
        to: '/operatorDashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
]

export default operatorNav
