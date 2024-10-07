import { element } from 'prop-types'
import React from 'react'



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DriverDashobard = React.lazy(() => import('./views/dashboard/DriverDashboard'))
const AdminDashobard = React.lazy(() => import('./views/dashboard/AdminDashboard'))
const Vehicles = React.lazy(() => import('./views/vehicles/Vehicles'))
const Trip =  React.lazy(() => import('./views/trip/Trip'))
const DriverVehicles = React.lazy(() => import('./views/driverVehicles/DriverVehicles'))
const AllCustomers = React.lazy(() => import('./views/allCustomers/AllCustomers'))
const AllDrivers = React.lazy(() => import('./views/allDrivers/AllDrivers'))
const AllVehicles = React.lazy(() => import('./views/allVehicles/AllVehicles'))
const AddDriver = React.lazy(() => import('./views/addDriver/AddDriver'))
const AddCustomer =  React.lazy(() => import('./views/addCustomer/AddCustomer'))
const TripHistory =  React.lazy(() => import('./views/tripHistory/TripHistory'))
const Payment =  React.lazy(() => import('./views/payment/Payment'))
const BookingHistory = React.lazy(() => import('./views/bookingHistory/BookingHistory'))
const Promotions = React.lazy(() => import('./views/promotions/Promotions'))
const Map = React.lazy(() => import('./views/map/Map'))



 


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/driverDashboard', name: 'DriverDashboard', element: DriverDashobard },
  { path: '/adminDashboard', name: 'AdminDashboard', element: AdminDashobard },
  { path: '/vehicles', name: 'Vehicles', element: Vehicles },
  { path: '/trip', name: 'Trip', element: Trip },
  { path: '/driverVehicles', name: 'DriverVehicles', element: DriverVehicles },
  { path: '/allCustomers', name: 'AllCustomers', element: AllCustomers },
  { path: '/allDrivers', name: 'AllDrivers', element: AllDrivers },
  { path: '/allVehicles', name: 'AllVehicles', element: AllVehicles },
  { path: '/addDriver', name: 'AddDriver', element: AddDriver },
  { path: '/addCustomer', name: 'AddCustomer', element: AddCustomer },
  { path: '/tripHistory', name: 'TripHistory', element: TripHistory },
  { path: '/payment', name: 'Payment', element: Payment },
  { path: '/bookingHistory', name: 'BookingHistory', element: BookingHistory },
  { path: '/promtions', name: 'Promotions', element: Promotions },
  { path: '/map', name: 'Map', element: Map },

 
  
]

export default routes
