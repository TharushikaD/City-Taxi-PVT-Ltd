import React, { useEffect, useState } from 'react';
import {
    CAvatar,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CSpinner
} from '@coreui/react';
import instance from '../../components/service/Service';

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
                    { userType: 'Customer', profileImage: 'customer.png', username: 'customer1', email: 'customer1@example.com', contact: '1234567890' },
                    { userType: 'Customer', profileImage: 'customer.png', username: 'customer2', email: 'customer2@example.com', contact: '0987654321' },
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
            <h2 className="text-center mb-4">All Customers</h2>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Profile Image</CTableHeaderCell>
                        <CTableHeaderCell>Username</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell>Contact</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {customers.length > 0 ? (
                        customers.map((user, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell className="text-center">
                                    <CAvatar size="md" src={user.profileImage || 'default-avatar.png'} />
                                </CTableDataCell>
                                <CTableDataCell>{user.username}</CTableDataCell>
                                <CTableDataCell>{user.email}</CTableDataCell>
                                <CTableDataCell>{user.contact}</CTableDataCell>
                            </CTableRow>
                        ))
                    ) : (
                        <CTableRow>
                            <CTableDataCell colSpan="4" className="text-center">
                                No customers found
                            </CTableDataCell>
                        </CTableRow>
                    )}
                </CTableBody>
            </CTable>
        </div>
    );
}
