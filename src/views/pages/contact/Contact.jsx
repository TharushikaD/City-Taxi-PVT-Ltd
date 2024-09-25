import React from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CInputGroup, CButton, CRow, CCol, CCarousel, CCarouselItem, CImage, CFormTextarea, CInputGroupText, CFormInput } from '@coreui/react';
import Layout from '../../../components/layoutNav/Layout';
import './style.css'
import { CFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'


export default function Contact() {
  return (
    <>
      <Layout>
        <CCarousel>
          <CCarouselItem>
            <div className="container-fluid p-0">
              <img
                src="src/assets/resources/join.png"
                alt="carousel image"
                className="wall img-fluid w-100"
              />
            </div>
          </CCarouselItem>
        </CCarousel>
        <CCard className="form-container">
          <CCardHeader className="form-header">
            <h3>Get in Touch</h3>
          </CCardHeader>
        </CCard>
        <CRow className="mt-5">
          <CCol lg={6} md={12} className="d-flex flex-column align-items-center">
            <CCard className="form-container w-75" style={{border:'none',outline:'none'}}>
              <CCardBody className="form-body text-left">
                <h5>We would love to hear from you. Get in touch with us by email.</h5>
                <CForm>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Name" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email Address" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormTextarea placeholder="Your Message" rows="4" />
                  </CInputGroup>
                  <CButton className="w-100 text-white cSubmit" style={{backgroundColor:'#2a303d'}} >
                    Submit
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>

          <CCol lg={6} md={12} className="p-5">
            <h3 className="mb-4" style={{fontSize:'25px', fontWeight:'bold'}}>Hotlines</h3>
            <CRow>
              <CCol className='contact'>
                <h5>General Inquiries</h5>
                <p className="mb-0 text-muted" >+94765455678</p>
              </CCol>
              <CCol className='contact'>
                <h5>Business Inquiries</h5>
                <p className="mb-0 text-muted">+94014507600</p>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol className='contact'>
                <h5>Media & Marketing</h5>
                <p><a href="mailto:social@pickme.lk">social@citytaxi.lk</a></p>
              </CCol>
              <CCol className='contact'>
                <h5>Careers</h5>
                <p><a href="mailto:careers@pickme.lk">careers@citytaxi.lk</a></p>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol className='contact'>
                <h5>Inquiries on Affiliations</h5>
                <p className="mb-0 text-muted">+9445117507855</p>
                <p><a href="mailto:registration@pickme.lk">registration@citytaxi.lk</a></p>
              </CCol>
            </CRow>
          </CCol>

        </CRow>

        <div className="footer">
          <CFooter className="px-4">
            <div>
              <a href="http://localhost:3000/#/home" target="_blank" rel="noopener noreferrer">
                CITY TAXI PVT LTD
              </a>
              <span className="ms-1">&copy; @2024.</span>
            </div>
          </CFooter>
        </div>
      </Layout>
    </>
  )
}
