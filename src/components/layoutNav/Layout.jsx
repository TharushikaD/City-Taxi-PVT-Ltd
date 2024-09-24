import React from 'react';
import {
    CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav,
    CNavItem, CNavLink
} from '@coreui/react';
import './style.css'; 


import logo from 'src/assets/resources/logo.jpeg'; 

const Layout = ({ children }) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <>
            <CNavbar expand="lg" style={{ backgroundColor: '#e0b506' }}>
                <CContainer fluid className="justify-content-between" style={{ maxWidth: '1400px' }}>
                    <CNavbarBrand href="#">
                        <img
                            src={logo} 
                            alt="City Taxi Logo"
                            height="70"
                        />
                    </CNavbarBrand>

                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />

                    <CCollapse className="navbar-collapse" visible={visible}>
                        {/* Centered links */}
                        <CNavbarNav className="mx-auto d-flex align-items-center" style={{ gap: '40px' }}>
                            <CNavItem>
                                <CNavLink className='navLinks' href="http://localhost:3000/#/home" active>
                                    HOME
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className='navLinks' href="http://localhost:3000/#/ride" active>
                                    RIDE
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className='navLinks' href="http://localhost:3000/#/vehicles" active>
                                    DRIVE
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className='navLinks' href="http://localhost:3000/#/about" active>
                                    ABOUT US
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className='navLinks' href="http://localhost:3000/#/contact" active>
                                    CONTACT US
                                </CNavLink>
                            </CNavItem>
                        </CNavbarNav>

                        {/* Right aligned Sign In and Sign Up */}
                        <CNavbarNav className="ms-auto d-flex align-items-center" style={{ gap: '20px' }}>
                            <CNavItem>
                                <CNavLink className='navLinks' href="http://localhost:3000/#/login" active>
                                    LOGIN
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className='navLinks' href="http://localhost:3000/#/register" active>
                                    REGISTER
                                </CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>

            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;
