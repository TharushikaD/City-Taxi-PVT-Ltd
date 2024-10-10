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
import AddCustomer from '../../views/addCustomer/AddCustomer';
import AppFooter from '../../components/AppFooter'; 
import AppHeader from '../../components/AppHeader';
import AppSidebar from '../../components/AppSidebar';
import './style.css';
import Alert from '../../components/alert/Alert';
import instance from '../../components/service/Service'; 

export default function AllCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await instance.get('/users'); 
                const customerData = response.data.filter(user => user.userType === 'Customer');
                setCustomers(customerData);
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
                setCustomers(prevCustomers => prevCustomers.filter(customer => customer.username !== username));
                
                Alert({
                    title: 'Deleted!',
                    message: 'The customer has been deleted.',
                    icon: 'success',
                });
            }
        });
    };
    
    const handleAddCustomerClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className="app-container">
            <AppHeader />
            <div className="main-content">
                <AppSidebar className="app-sidebar" />
                <div className="content-wrap">
                    <div className="gradient-container">
                        <h4 className="text-center text-white mb-4" style={{ fontWeight: '600', letterSpacing: '1px' }}>All Customers</h4>
                        <div className="d-flex justify-content-start mb-3">
                            <CButton className="Add" onClick={handleAddCustomerClick}>
                                Add Customer
                            </CButton>
                        </div>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className="text-center">Profile Image</CTableHeaderCell>
                                    <CTableHeaderCell>Username</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell>Contact</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {loading ? (
                                    <CTableRow>
                                        <CTableDataCell colSpan="5" className="text-center">
                                            <CSpinner color="primary" />
                                            <p>Loading customers...</p>
                                        </CTableDataCell>
                                    </CTableRow>
                                ) : (
                                    customers.length > 0 ? (
                                        customers.map((user, index) => (
                                            <CTableRow key={index}>
                                                <CTableDataCell className="text-center">
                                                    <CImage src={user.profileImage} width={100} height={100} alt="Customer" />
                                                </CTableDataCell>
                                                <CTableDataCell>{user.username}</CTableDataCell>
                                                <CTableDataCell>{user.email}</CTableDataCell>
                                                <CTableDataCell>{user.contact}</CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    <CButton className='Update me-2'>Update</CButton>
                                                    <CButton className='Delete' onClick={() => handleDelete(user.username)}>Delete</CButton>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))
                                    ) : (
                                        <CTableRow>
                                            <CTableDataCell colSpan="5" className="text-center">
                                                No customers found
                                            </CTableDataCell>
                                        </CTableRow>
                                    )
                                )}
                            </CTableBody>
                        </CTable>

                        <CModal visible={showModal} onClose={handleModalClose} size="lg">
                            <CModalHeader closeButton>
                                <h5>Add Customer</h5>
                            </CModalHeader>
                            <CModalBody>
                                <AddCustomer />
                            </CModalBody>
                        </CModal>
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}
