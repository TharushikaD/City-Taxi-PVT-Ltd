import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4" style={{backgroundColor:'#e0b506'}} >
      <div>
        <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
          CITY TAXI PVT LTD
        </a>
        <span className="ms-1">&copy; @2024.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
