import React from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CInputGroup, CButton, CRow, CCol, CCarousel, CCarouselItem, CImage } from '@coreui/react';
import Layout from '../../../components/layoutNav/Layout';
import './style.css'



export default function Ride() {
  return (
    <Layout>
      <CCarousel>
        <CCarouselItem>
          <div className="container-fluid p-0">
            <img
              src="src/assets/resources/riding.png"
              alt="carousel image"
              className="wall img-fluid w-100"
            />
          </div>
        </CCarouselItem>
      </CCarousel>
      <CCard className="form-container">
        <CCardHeader className="form-header">
          <h3>Sign Up to Ride </h3>
        </CCardHeader>
        <CCardBody className="form-body text-left mt-5">
          <h5>Plan your trip</h5>
          <p>Register below and Login to experience a seamless ride</p>
          <div className="form-buttons" style={{ display: 'flex', gap: '15px', marginTop: '3.5rem' }}>
            <CButton type="button" className="btn-submit" href='http://localhost:3000/#/register'>
              Register
            </CButton>
            <CButton type="button" className="btn-submit" href='http://localhost:3000/#/login'>
              Login
            </CButton>
          </div>

        </CCardBody>

      </CCard>
      <div class="opportunity-container">
        <div class="opportunity-section">
          <h3 style={{ margin: '20px', color: '#e0b506' }}>Reasons why you should go with City Taxis as your Travel Partner</h3>
          <ul> 
            <li>City Taxis maintain high standards of cleanliness, with well-maintained and comfortable vehicles for a pleasant ride</li>
            <li>Can easily book taxis through the website, with options.</li>
            <li>Prioritize punctuality and ensure passengers reach their destinations efficiently and on time.</li>
            <li>Safety is first, as  all drivers undergo background checks, and the vehicles are regularly maintained.</li>
            <li>Fares are calculated upfront with no hidden charges, ensuring a fair and predictable cost for every journey</li>

          </ul>
        </div>
      </div>
    </Layout>
  )
}
