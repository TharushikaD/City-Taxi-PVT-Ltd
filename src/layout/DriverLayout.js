import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'


const DriverLayout = () => {
  
  return (
    <div>
      <AppSidebar />
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
