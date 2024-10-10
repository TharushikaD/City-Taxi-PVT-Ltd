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
    CModalTitle,
    CModalBody,
} from '@coreui/react';
import Vehicles from '../vehicles/Vehicles';
import AppFooter from '../../components/AppFooter'; 
import AppHeader from '../../components/AppHeader';
import AppSidebar from '../../components/AppSidebar';
import './style.css';
import instance from '../../components/service/Service';

export default function DriverVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); 

    useEffect(() => {
        const fetchDriverVehicles = async () => {
            setLoading(true);
            try {
                const userId = localStorage.getItem('userId'); 
                const token = localStorage.getItem('authToken'); 
                const response = await instance.get(`/vehicles/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                const data = response.data;
                setVehicles(data); 
            } catch (err) {
                setError('Failed to fetch vehicles');
                console.error('Error fetching vehicles:', err);
            } finally {
                setLoading(false); 
            }
        };

        fetchDriverVehicles();
    }, []);

    const handleAdd = () => {
        setModalVisible(true); 
    };

    const handleUpdate = (registrationNumber) => {
        console.log(`Update Vehicle button clicked for ${registrationNumber}`);
    };

    const handleDelete = (registrationNumber) => {
        console.log(`Delete Vehicle button clicked for ${registrationNumber}`);
    };

    const handleCloseModal = () => {
        setModalVisible(false); 
    };

    const handleRegistrationClick = (vehicle) => {
        localStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
        console.log(`Vehicle ${vehicle.registrationNumber} saved!`);
        handleAdd();
    };

    return (
        <div className="app-container">
            <AppHeader />
            <div className="main-content">
                <AppSidebar className="app-sidebar" />
                <div className="content-wrap">
                    <div className="gradient-container">
                        <h4 className="text-center text-white mb-4" style={{ fontWeight: '600', letterSpacing: '1px', }}>Registered Vehicles</h4>
                        <CButton onClick={handleAdd} className="Add mb-3">Add Vehicle</CButton>
                        
                        {loading ? (
                            <div className="text-center">
                                <CSpinner color="primary" />
                                <p>Loading vehicles...</p>
                            </div>
                        ) : (
                            <>
                                <CTable align="middle" className="mb-0 border" hover responsive>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell className="text-center">Image</CTableHeaderCell>
                                            <CTableHeaderCell className="text-center">Registration Number</CTableHeaderCell>
                                            <CTableHeaderCell>Manufacturer</CTableHeaderCell>
                                            <CTableHeaderCell>Model</CTableHeaderCell>
                                            <CTableHeaderCell>Vehicle Type</CTableHeaderCell>
                                            <CTableHeaderCell>Actions</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {vehicles.length > 0 ? (
                                            vehicles.map((vehicle, index) => (
                                                <CTableRow key={index}>
                                                    <CTableDataCell className="text-center">
                                                        <CImage src={vehicle.imageUrl} width={100} height={100} alt="Vehicle" />
                                                    </CTableDataCell>
                                                    <CTableDataCell className="text-center" onClick={() => handleRegistrationClick(vehicle)}
                                                        style={{ cursor: 'pointer', color: 'blue' }}>{vehicle.registrationNumber}</CTableDataCell>
                                                    <CTableDataCell>{vehicle.manufacturer}</CTableDataCell>
                                                    <CTableDataCell>{vehicle.model}</CTableDataCell>
                                                    <CTableDataCell>{vehicle.vehicleType}</CTableDataCell>
                                                    <CTableDataCell>
                                                        <CButton onClick={() => handleUpdate(vehicle.registrationNumber)} className="Update me-2">
                                                            Update
                                                        </CButton>
                                                        <CButton onClick={() => handleDelete(vehicle.registrationNumber)} className="Delete">
                                                            Delete
                                                        </CButton>
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

                                {error && <div className="text-danger text-center">{error}</div>}
                            </>
                        )}

                        <CModal visible={modalVisible} onClose={handleCloseModal} size='xl'>
                            <CModalHeader>
                                <CModalTitle>Add Vehicle</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <Vehicles /> 
                            </CModalBody>
                        </CModal>
                    </div> 
                </div>
            </div>
            <AppFooter />
        </div>
    );
}
