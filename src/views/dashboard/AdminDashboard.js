import React, { useState } from 'react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CDropdownMenu,
  CDropdownItem,
  CCol,
  CRow,
  CDropdown,
  CDropdownToggle,
} from '@coreui/react'



const getFormattedDateRange = () => {
  const today = new Date()
  const startMonth = 'January'
  const endMonth = today.toLocaleString('default', { month: 'long' })
  const year = today.getFullYear()

  return `${startMonth} - ${endMonth} ${year}`
}

const AdminDashboard = () => {
  const [isHovered, setIsHovered] = useState(false)
  const dateRange = getFormattedDateRange() 

  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Reportings
              </h4>
           
              <div className="small text-body-secondary">{dateRange}</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <div className="d-flex justify-content-left align-items-center mt-2 mb-2">
            <CDropdown className="me-3">
              <CDropdownToggle style={{ backgroundColor: '#e0b506' }}>
                Select Report Type
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Customer Report</CDropdownItem>
                <CDropdownItem>Driver Report</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <CButton
              className="text-white"
              style={{
                backgroundColor: isHovered ? 'bisque' : '#2a303d',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Generate Report
            </CButton>
          </div>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default AdminDashboard
