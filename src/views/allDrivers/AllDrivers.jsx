import React, { useEffect, useState } from 'react';
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CSpinner,
    CButton,
    CImage,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
} from '@coreui/react';
import instance from '../../components/service/Service';
import AddDriver from '../../views/addDriver/AddDriver';
} from '@coreui/react';
import AddDriver from '../../views/addDriver/AddDriver';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import AppSidebar from '../../components/AppSidebar';
import './style.css';

export default function AllDrivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddDriverModal, setShowAddDriverModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const mockData = [
                {
                    userType: 'Driver',
                    profileImage: 'src/assets/resources/dasun.webp',
                    username: 'HarendraP',
                    email: 'harendra2024@gmail.com',
                    contact: '0776567890',
                },
                {
                    userType: 'Driver',
                    profileImage: 'src/assets/resources/sasindu.jpeg',
                    username: 'HasinduW',
                    email: 'hasindu2024@gmail.com',
                    contact: '0765434567',
                },
            ];

            setLoading(true);
            try {
                const data = mockData;
                const driversData = data.filter((user) => user.userType === 'Driver');
                setDrivers(driversData);
            } catch (err) {
                setError('Failed to fetch users');
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <CSpinner color="primary" />
                <p>Loading drivers...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-danger text-center">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center text-white mb-4">All Drivers</h2>
            <CButton className="Add mb-3" onClick={() => setShowAddDriverModal(true)}>Add Driver</CButton>

            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell className="text-center">Profile Image</CTableHeaderCell>
                        <CTableHeaderCell>Username</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell>Contact</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {drivers.length > 0 ? (
                        drivers.map((user, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell className="text-center">
                                    <CImage src={user.profileImage} width={100} height={100} alt="Driver" />
                                </CTableDataCell>
                                <CTableDataCell>{user.username}</CTableDataCell>
                                <CTableDataCell>{user.email}</CTableDataCell>
                                <CTableDataCell>{user.contact}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton className="Update me-2">Update</CButton>
                                    <CButton className="Delete">Delete</CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))
                    ) : (
                        <CTableRow>
                            <CTableDataCell colSpan="4" className="text-center">
                                No drivers found
                            </CTableDataCell>
                        </CTableRow>
                    )}
                </CTableBody>
            </CTable>

            {/* Modal for adding a driver */}
            <CModal visible={showAddDriverModal} onClose={() => setShowAddDriverModal(false)} size="lg">
                <CModalHeader closeButton>
                    <h5 className="modal-title">Add Driver</h5>
                </CModalHeader>
                <CModalBody>
                    <AddDriver />
                </CModalBody>
            </CModal>
        <div className="app-container">
            <AppHeader />
            <div className="main-content">
                <AppSidebar className="app-sidebar" />
                <div className="content-wrap">
                    <div className="gradient-container"> {/* Add a div with gradient background */}
                        <h2 className="text-center text-white mb-4">All Drivers</h2>
                        <CButton className="Add mb-3" onClick={() => setShowAddDriverModal(true)}>
                            Add Driver
                        </CButton>

                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className="text-center">Profile Image</CTableHeaderCell>
                                    <CTableHeaderCell>Username</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell>Contact</CTableHeaderCell>
                                    <CTableHeaderCell>Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {drivers.length > 0 ? (
                                    drivers.map((user, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell className="text-center">
                                                <CImage src={user.profileImage} width={100} height={100} alt="Driver" />
                                            </CTableDataCell>
                                            <CTableDataCell>{user.username}</CTableDataCell>
                                            <CTableDataCell>{user.email}</CTableDataCell>
                                            <CTableDataCell>{user.contact}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButton className="Update me-2">Update</CButton>
                                                <CButton className="Delete">Delete</CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))
                                ) : (
                                    <CTableRow>
                                        <CTableDataCell colSpan="5" className="text-center">
                                            No drivers found
                                        </CTableDataCell>
                                    </CTableRow>
                                )}
                            </CTableBody>
                        </CTable>

                        {/* Add Driver Modal */}
                        <CModal visible={showAddDriverModal} onClose={() => setShowAddDriverModal(false)} size="lg">
                            <CModalHeader closeButton>
                                <h5 className="modal-title">Add Driver</h5>
                            </CModalHeader>
                            <CModalBody>
                                <AddDriver />
                            </CModalBody>
                        </CModal>
                    </div> {/* Close gradient-container */}
                </div>
            </div>
            <AppFooter />
        </div>
    );
}

