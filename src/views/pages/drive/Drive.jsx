import React from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CInputGroup, CButton, CRow, CCol, CCarousel, CCarouselItem, CImage } from '@coreui/react';
import Layout from '../../../components/layoutNav/Layout';
import './style.css'
import { CFooter } from '@coreui/react'


export default function Drive() {
    return (
        <>

            <Layout>
                <CCarousel>
                    <CCarouselItem>
                        <div className="container-fluid p-0">
                            <img
                                src="src/assets/resources/join4.png"
                                alt="carousel image"
                                className="wall img-fluid w-100"
                            />
                        </div>
                    </CCarouselItem>
                </CCarousel>
                <CCard className="form-container">
                    <CCardHeader className="form-header">
                        <h3>Sign Up to Drive </h3>
                    </CCardHeader>
                    <CCardBody className="form-body text-left mt-5">
                        <h5>Get to your life goals in ease. Join Us Today</h5>
                        <p>Register below and Login to be a part of City Taxis</p>
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
                        <h3 style={{ margin: '20px', color: '#e0b506' }}>Opportunities are Endless with City Taxis</h3>
                        <ul>
                            <li>If you own Car, We got rides for you! Join the largest network in the country & make driving fun while you earn over 100,000 Rupees per month</li>
                            <li>Enjoy a Monthly Income of 100,000 Rupees & upwards</li>
                            <li>Get a Life Insurance Cover of 3,000,000 Rupees</li>
                            <li>Earn weekly and daily incentives</li>
                            <li>Pay Lesser Commission while receiving Higher Earnings</li>
                            <li>Immediate Earnings regardless of payment methods</li>
                        </ul>
                    </div>
                </div>
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

    );
};




