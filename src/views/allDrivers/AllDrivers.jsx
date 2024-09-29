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

export default function AllDrivers() {
    const [drivers, setDrivers] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      
        const fetchUsers = async () => {
            
            const mockData = [
                { userType: 'Driver', profileImage: 'driver.png', username: 'driver1', email: 'driver1@example.com', contact: '1234567890' },
                { userType: 'Driver', profileImage: 'driver2.png', username: 'driver2', email: 'driver2@example.com', contact: '0987654321' },
            ];
        
            
            setLoading(true);
            try {
              
                const data = mockData; 
                const driversData = data.filter(user => user.userType === 'Driver');
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
            <h2 className="text-center mb-4">All Drivers</h2>
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
                    {drivers.length > 0 ? (
                        drivers.map((user, index) => (
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
                                No drivers found
                            </CTableDataCell>
                        </CTableRow>
                    )}
                </CTableBody>
            </CTable>
        </div>
    );
}
