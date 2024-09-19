import React, { useState } from 'react';
import {
    CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav,
    CNavItem, CNavLink
} from '@coreui/react';

export default function Home() {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <CNavbar expand="lg" style={{ backgroundColor: '#e0b506' }}>
                <CContainer fluid className="justify-content-between" style={{ maxWidth: '1400px' }}>
                    <CNavbarBrand href="#">
                        <img
                            src="src/assets/resources/logo.jpeg"
                            alt="Logo"
                            height="60"
                        />
                    </CNavbarBrand>

                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />

                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarNav className="ms-auto d-flex align-items-center" style={{ gap: '20px' }}>
                            <CNavItem>
                                <CNavLink href="http://localhost:3000/#/login" active style={{ fontWeight: 'bold', color: 'black' }}>
                                    SIGN IN
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="http://localhost:3000/#/register" active style={{ fontWeight: 'bold', color: 'black' }}>
                                    SIGN UP
                                </CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                    </CCollapse>

                </CContainer>
            </CNavbar>
        </>
    );
}
