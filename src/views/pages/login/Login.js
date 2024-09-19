import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  return (
    <div className="d-flex align-items-center min-vh-100" style={{backgroundColor:'#2a303d'}}>
      <CContainer>
        <CRow className="justify-content-between">
          <CCol lg={6} className="d-flex flex-column justify-content-center text-center p-5" style={{color:'#2a303d'}}>
            <h1 className='text-white'>Welcome to City Taxis</h1>
            <p className="text-white lead">Your Journey Begins Here!</p>
          </CCol>

          <CCol lg={4} md={6} className="d-flex justify-content-center align-items-center">
            <CCard className="p-4 shadow-lg" style={{backgroundColor:'#e0b506'}}>
              <CCardBody>
                <div className="text-center mb-4">
                  <img src="src/assets/resources/logo.jpeg" alt="City Taxis Logo" className="logo img-fluid" style={{width:'100px',marginBottom:'1 rem'}} />
                </div>
                <CForm>
                  <h2 className="text-center mb-4">Login</h2>
                  <p className="text-body-secondary text-center mb-4">Sign in to your account</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                     <CCol xs={12} className="text-right">
                      <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CInputGroup>

                  <CRow className="mb-3">
                    <CCol xs={12}>
                      <CButton className="w-100 text-white" style={{backgroundColor:'#2a303d'}}>
                        Login
                      </CButton>
                    </CCol>
                    <CCol xs={12} className="text-center">
                      <CButton color="link" className="px-0" href='http://localhost:3000/#/register'>
                       Don't have an account!
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
