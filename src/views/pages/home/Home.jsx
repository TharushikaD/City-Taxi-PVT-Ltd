import React, { useState, useEffect } from 'react';
import './style.css'
import RoundICard from '../../../components/roundimgcard/RoundICard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CFooter } from '@coreui/react'
import Layout from '../../../components/layoutNav/Layout';



export default function Home() {
    const [visible, setVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('History');
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector('.container-1');
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (sectionPosition < screenPosition) {
                setFadeIn(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleButtonClick = (section) => {
        setActiveSection(section);
    };

    return (
        <>
            <Layout>
            <div className="container-fluid p-0">
                <img
                    src="src/assets/resources/wall9.png"
                    alt="carousel image"
                    className="wall img-fluid w-100"
                />
            </div>

            <div className={`container-1 ${fadeIn ? 'fade-in' : ''}`}>
                <div className="row align-items-center">
                    <div className="col-md-6 col-sm-12 text-center mb-4">
                        <img
                            src="src/assets/resources/about.jpg"
                            alt="owner"
                            className="img-fluid owner-image"
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 all-description text-center text-md-start">
                        <h2 className="section-title">THE CEO'S OVERVIEW</h2>
                        <h1 className="owner-name">Gesith Gunawardhana</h1>
                        <p className="owner-description text-muted">
                            We are committed to delivering convenient, safe, and reliable taxi services tailored to meet your transportation needs. With a focus on providing exceptional service, our professional drivers and well-maintained vehicles ensure that every ride is comfortable and stress-free. Whether you're heading to a meeting, an event, or just exploring the city, City Taxi is here to get you there on time.
                        </p>
                    </div>
                </div>
            </div>

            <div className='container-2'>
                <button type="button" className="btn" onClick={() => handleButtonClick('History')}>
                    History
                </button>
                <button type="button" className="btn" onClick={() => handleButtonClick('Vision')}>
                    Vision
                </button>
                <button type="button" className="btn" onClick={() => handleButtonClick('Mission')}>
                    Mission
                </button>
            </div>

            <div className='show' xl={6} lg={8} md={10} sm={12} xs={12}>
                {activeSection === 'History' && (
                    <div>
                        <h2>Our History</h2>
                        <p className='text-muted'>City Taxi (PVT) Ltd was founded in 1999 transforming urban transportation across island-wide city areas. The company began with a small fleet of taxis, primarily serving local communities. Over time, City Taxi expanded its services to cover multiple cities, offering a reliable and affordable means of transportation. With a commitment to providing high-quality service, City Taxi has grown into a trusted brand in the taxi industry, known for its dedication to passenger safety, convenience, and innovation.</p>
                    </div>
                )}
                {activeSection === 'Vision' && (
                    <div>
                        <h2>Our Vision</h2>
                        <p className='text-muted'>Be the leading provider of safe, reliable, and affordable transportation solutions, connecting passengers across city areas through innovative technology and superior service. City Taxi (PVT) Ltd aims to set the standard for quality in the taxi industry, ensuring that every journey contributes to a seamless and enjoyable passenger experience.</p>
                    </div>
                )}
                {activeSection === 'Mission' && (
                    <div>
                        <h2>Our Mission</h2>
                        <p className='text-muted' >While providing efficient, safe, and affordable taxi services for passengers across island-wide, leveragaing technology to streamline the booking process, enhance passenger and driver communication, and ensure timely services.</p>
                    </div>
                )}
            </div>

            <div className="container-3">
                <div className='content'>
                    <RoundICard
                        src="src/assets/resources/cus1.png"
                        title="Customer Satisfaction"
                        description="95%"
                    />
                    <RoundICard
                        src="src/assets/resources/driver1.png"
                        title="Driver Facility"
                        description="98%"
                    />
                    <RoundICard
                        src="src/assets/resources/price.png"
                        title="Best Price"
                        description="100%"
                    />
                </div>
            </div>

            <div className='caption'>
                <RoundICard
                    title="YOUR RIDE IS ONE TOUCH AWAY"
                    description="Register and Login Today!"
                />
            </div>
            <div className='container-4'>
                <div className="row align-items-center">
                    <div className="col-md-6 col-sm-12 text-center mb-4">
                        <img src="src/assets/resources/phone.png" alt="Phone" className="img-fluid phone-image" />
                    </div>
                    <div className="col-md-6 col-sm-12 all-description text-center text-md-start">
                        <div className="app-description">
                            <div className="features">
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <button>1</button>
                                    </div>
                                    <div className="feature-text">
                                        <h5>Book in just 2 Taps</h5>
                                        <p>Key in your pick-up and drop-off locations to get your estimated fare.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <button>2</button>
                                    </div>
                                    <div className="feature-text">
                                        <h5>Get a Driver</h5>
                                        <p>City Taxis will show you the nearest available Drivers. Choose your prefered Driver</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <button>3</button>
                                    </div>
                                    <div className="feature-text">
                                        <h5>Arrive Safely</h5>
                                        <p>Share your trip details and rate our skillfull Drivers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container-5'>
                <h5>CALL US TO BOOK A TAXI</h5>
                <h1>(+94) 134548050</h1>
                <p>For a customized seamless experience, make sure to join us by registering with City Taxis. Get 40% off your first booking online.</p>
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
}
