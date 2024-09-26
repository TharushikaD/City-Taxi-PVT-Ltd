import React from 'react'
import { AppContent, AppFooter, AppHeader, AdminSideBar } from '../components/index'

const AdminLayout = () => {
  
  return (
    <div>
      <AdminSideBar />
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

export default AdminLayout
