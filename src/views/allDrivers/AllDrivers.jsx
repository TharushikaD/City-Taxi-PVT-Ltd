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
} from '@coreui/react';
import AddDriver from '../../views/addDriver/AddDriver';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import AppSidebar from '../../components/AppSidebar';
import './style.css';
import Alert from '../../components/alert/Alert';
import instance from '../../components/service/Service';

export default function AllDrivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddDriverModal, setShowAddDriverModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await instance.get('/users');
                const driversData = response.data.filter(user => user.userType === 'Driver');
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

    const handleDelete = (username) => {
        Alert({
            title: 'Are you sure?',
            message: "Want to remove the data",
            icon: 'warning',
            showYesNo: true,
            confirmButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                setDrivers(prevDrivers => prevDrivers.filter(driver => driver.username !== username));

                Alert({
                    title: 'Deleted!',
                    message: 'The driver has been deleted.',
                    icon: 'success',
                });
            }
        });
    };

    if (loading) {
        return (
            <div className="text-center">
                <CSpinner color="primary" />
                <p>Loading drivers...</p>
            </div>
        );
    }

    return (
        <div className="app-container">
            <AppHeader />
            <div className="main-content">
                <AppSidebar className="app-sidebar" />
                <div className="content-wrap">
                    <div className="gradient-container">
                        <h4 className="text-center text-white mb-4" style={{ fontWeight: '600', letterSpacing: '1px' }}>All Drivers</h4>
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
                                                <CButton className="Delete" onClick={() => handleDelete(user.username)}>Delete</CButton>
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

                       
                        <CModal visible={showAddDriverModal} onClose={() => setShowAddDriverModal(false)} size="lg">
                            <CModalHeader closeButton>
                                <h5 className="modal-title">Add Driver</h5>
                            </CModalHeader>
                            <CModalBody>
                                <AddDriver />
                            </CModalBody>
                        </CModal>
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}
