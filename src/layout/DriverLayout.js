import React from 'react'
import { AppContent, DriverSideBar, AppFooter, AppHeader } from '../components/index'


const DriverLayout = () => {
  
  return (
    <div>
      <DriverSideBar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DriverLayout
