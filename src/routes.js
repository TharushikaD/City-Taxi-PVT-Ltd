import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Vehicles = React.lazy(() => import('./views/vehicles/Vehicles'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/vehicles', name: 'Vehicles', element: Vehicles },
 
  
]

export default routes
