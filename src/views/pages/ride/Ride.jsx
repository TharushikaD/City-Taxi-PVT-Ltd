import React from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CInputGroup, CButton, CRow, CCol, CCarousel, CCarouselItem, CImage } from '@coreui/react';
import Layout from '../../../components/layoutNav/Layout';


export default function Ride() {
  return (
    <Layout>
      <CCarousel>
        <CCarouselItem>
          <div className="container-fluid p-0">
            <img
              src="src/assets/resources/ride2.png"
              alt="carousel image"
              className="wall img-fluid w-100"
            />
          </div>
        </CCarouselItem>
      </CCarousel>
    </Layout>
  )
}
