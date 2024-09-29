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
    CImage
} from '@coreui/react';
import instance from '../../components/service/Service';
import './style.css';

export default function AllCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    // const fetchUsers = async () => {
    //     try {
    //         const response = await instance.get('/users');
    //         const data = Array.isArray(response.data) ? response.data : [];
    //         const customersData = data.filter(user => user.userType === 'Customer');
    //         setCustomers(customersData);
    //     } catch (err) {
    //         setError('Failed to fetch users');
    //         console.error('Error fetching users:', err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    useEffect(() => {

        const fetchUsers = async () => {

            const mockData = [
                {
                    userType: 'Customer',
                    profileImage:'src/assets/resources/img2.jpg',
                    username: 'Sasindu Kumara',
                    email: 'sasindu123@gmail.com',
                    contact: '0743234567'
                },
                {
                    userType: 'Customer',
                    profileImage:'src/assets/resources/img1.jpg',
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
                                {/* <CTableDataCell className="text-center">
                                    <CAvatar size="md" src={user.profileImage || 'default-avatar.png'} /> 
                                </CTableDataCell> */}
                                 <CTableDataCell className="text-center">
                                    <CImage src={user.profileImage} width={100} height={100} alt="Customer" />
                                </CTableDataCell>
                                <CTableDataCell>{user.username}</CTableDataCell>
                                <CTableDataCell>{user.email}</CTableDataCell>
                                <CTableDataCell>{user.contact}</CTableDataCell>
                                <CTableDataCell className="text-center">
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
        </div>
    );
}
