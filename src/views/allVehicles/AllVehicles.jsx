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
    CImage
} from '@coreui/react';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import AppSidebar from '../../components/AppSidebar';
import './style.css';

export default function AllVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchVehicles = async () => {
            const mockData = [
                { 
                    registrationNumber: 'ABC123', 
                    manufacturer: 'Suzuki', 
                    model: 'Alto', 
                    vehicleType: 'Car', 
                    imageUrl: 'src/assets/resources/alto.jpg'  
                },
                { 
                    registrationNumber: 'XYZ789', 
                    manufacturer: 'Toyota', 
                    model: 'Vitz', 
                    vehicleType: 'Car', 
                    imageUrl: 'src/assets/resources/vitz.jpg' 
                },
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
        <div className="app-container">
            
            <AppHeader />
            <div className="main-content">
                <AppSidebar className="app-sidebar" />
                <div className="content-wrap">
                    <div className="gradient-container"> 
                        <h4 className="text-center text-white mb-4"  style={{ fontWeight: '600', letterSpacing: '1px' }}>All Vehicles</h4>

                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className="text-center">Image</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Registration Number</CTableHeaderCell>
                                    <CTableHeaderCell>Manufacturer</CTableHeaderCell>
                                    <CTableHeaderCell>Model</CTableHeaderCell>
                                    <CTableHeaderCell>Vehicle Type</CTableHeaderCell>
                                    <CTableHeaderCell>Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {vehicles.length > 0 ? (
                                    vehicles.map((vehicle, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell className="text-center">
                                                <CImage src={vehicle.imageUrl} width={100} height={100} alt="Vehicle" />
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">{vehicle.registrationNumber}</CTableDataCell>
                                            <CTableDataCell>{vehicle.manufacturer}</CTableDataCell>
                                            <CTableDataCell>{vehicle.model}</CTableDataCell>
                                            <CTableDataCell>{vehicle.vehicleType}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButton className='Delete'>Delete</CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))
                                ) : (
                                    <CTableRow>
                                        <CTableDataCell colSpan="6" className="text-center">
                                            No vehicles found
                                        </CTableDataCell>
                                    </CTableRow>
                                )}
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}
