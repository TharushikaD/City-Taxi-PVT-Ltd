import React, { useState } from 'react';
import {
  CAvatar,
  CButton,
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
} from '@coreui/react';

const getFormattedCurrentDate = () => {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString('default', options);
}

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const currentDate = getFormattedCurrentDate(); 

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Trip Status
              </h4>
            </CCol>
            <CCol sm={7} className="text-end">
              <div className="small text-body-secondary">{currentDate}</div>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
         
        </CCardFooter>
      </CCard>
    </>
  );
}

export default Dashboard;
