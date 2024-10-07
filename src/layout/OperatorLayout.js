import React from 'react'
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../components/index'

const OperatorLayout = () => {
  
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

export default OperatorLayout
