import React, { useEffect, useState } from 'react';
import {
    CAvatar,
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
import AddCustomer from '../../views/addCustomer/AddCustomer'; // Import the AddCustomer component
import './style.css';

export default function AllCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        const fetchUsers = async () => {
            const mockData = [
                {
                    userType: 'Customer',
                    profileImage: 'src/assets/resources/img2.jpg',
                    username: 'Sasindu Kumara',
                    email: 'sasindu123@gmail.com',
                    contact: '0743234567'
                },
                {
                    userType: 'Customer',
                    profileImage: 'src/assets/resources/img1.jpg',
                    username: 'DasunP',
                    email: 'dasun2024@gmail.com',
                    contact: '0775434567'
                },
            ];

            setLoading(true);
            try {
                const data = mockData;
                const customerData = data.filter(user => user.userType === 'Customer');
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
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.username !== username));
    };

    const handleAddCustomerClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    if (loading) {
        return (
            <div className="text-center">
                <CSpinner color="primary" />
                <p>Loading customers...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-danger text-center">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center text-white mb-4">All Customers</h2>
            <CButton className="Add mb-3" onClick={handleAddCustomerClick}>
                Add Customer
            </CButton>
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
                    {customers.length > 0 ? (
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
                    )}
                </CTableBody>
            </CTable>

            {/* Add Customer Modal */}
            <CModal visible={showModal} onClose={handleModalClose} size="lg">
                <CModalHeader closeButton>
                    <h5>Add Customer</h5>
                </CModalHeader>
                <CModalBody>
                    <AddCustomer />
                </CModalBody>
            </CModal>
        </div>
    );
}
