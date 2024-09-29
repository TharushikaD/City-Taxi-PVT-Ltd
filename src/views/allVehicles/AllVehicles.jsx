import React, { useEffect, useState } from 'react';
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CSpinner
} from '@coreui/react';
import instance from '../../components/service/Service';
import './style.css';


export default function AllVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            
            const mockData = [
                { registrationNumber: 'ABC123', manufacturer: 'Toyota', model: 'Corolla', vehicleType: 'Sedan' },
                { registrationNumber: 'XYZ789', manufacturer: 'Honda', model: 'Civic', vehicleType: 'Sedan' },
            ];

            
            setLoading(true);
            try {
                
               
                
                const data = mockData; 
                setVehicles(data);
            } catch (err) {
                setError('Failed to fetch vehicles');
                console.error('Error fetching vehicles:', err);
            } finally {
                setLoading(false);
            }
        };
        // const fetchVehicles = async () => {
        //     setLoading(true);
        //     try {
        //         const token = localStorage.getItem('authToken'); 
        //         const response = await instance.get('/vehicles/all', {
        //             headers: {
        //                 Authorization: `Bearer ${token}`, 
        //             },
        //         });
        //         const data = response.data;
        //         setVehicles(data);
        //     } catch (err) {
        //         setError('Failed to fetch vehicles');
        //         console.error('Error fetching vehicles:', err);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        fetchVehicles();
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <CSpinner color="primary" />
                <p>Loading vehicles...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-danger text-center">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center text-white mb-4">All Vehicles</h2>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell className="text-center" >Registration Number</CTableHeaderCell>
                        <CTableHeaderCell>Manufacturer</CTableHeaderCell>
                        <CTableHeaderCell>Model</CTableHeaderCell>
                        <CTableHeaderCell>Vehicle Type</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{vehicle.registrationNumber}</CTableDataCell>
                                <CTableDataCell>{vehicle.manufacturer}</CTableDataCell>
                                <CTableDataCell>{vehicle.model}</CTableDataCell>
                                <CTableDataCell>{vehicle.vehicleType}</CTableDataCell>
                            </CTableRow>
                        ))
                    ) : (
                        <CTableRow>
                            <CTableDataCell colSpan="4" className="text-center">
                                No vehicles found
                            </CTableDataCell>
                        </CTableRow>
                    )}
                </CTableBody>
            </CTable>
        </div>
    );
}
