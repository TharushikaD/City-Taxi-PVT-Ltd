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
import Vehicles from '../vehicles/Vehicles'; // Assuming Vehicles is in the same folder
import AppFooter from '../../components/AppFooter'; 
import AppHeader from '../../components/AppHeader';
import AppSidebar from '../../components/AppSidebar';
import './style.css';

export default function DriverVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

    useEffect(() => {
        // const fetchDriverVehicles = async () => {
        //   setLoading(true);
        //   try {
        //     const userId = localStorage.getItem('userId');
        //     const token = localStorage.getItem('authToken'); 
        //     const response = await instance.get(`/vehicles/user/${userId}`, {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //     });
        //     const data = response.data;
        //     setVehicles(data);
        //   } catch (err) {
        //     setError('Failed to fetch vehicles');
        //     console.error('Error fetching vehicles:', err);
        //   } finally {
        //     setLoading(false);
        //   }
        // };

        // Mock data for testing
        const mockVehicles = [
            { 
                imageUrl: 'src/assets/resources/bike1.webp',
                registrationNumber: 'DV001', 
                manufacturer: 'Bajaj', 
                model: 'Pulsor', 
                vehicleType: 'Bike' 
            },
            { 
                imageUrl: 'src/assets/resources/nano.jpg',
                registrationNumber: 'DV002', 
                manufacturer: 'Tata', 
                model: 'Nano', 
                vehicleType: 'Car' 
            },
            { 
                imageUrl: 'src/assets/resources/alto.jpg',
                registrationNumber: 'DV003', 
                manufacturer: 'Suzuki', 
                model: 'Alto', 
                vehicleType: 'Car' 
            }
        ];

        setLoading(true);
        try {
            setTimeout(() => {
                setVehicles(mockVehicles); 
                setLoading(false);
            }, 1000);
        } catch (err) {
            setError('Failed to fetch vehicles');
            console.error('Error fetching vehicles:', err);
            setLoading(false);
        }
    }, []);

    const handleAdd = () => {
        setModalVisible(true); // Show the modal when the button is clicked
    };

    const handleUpdate = (registrationNumber) => {
        console.log(`Update Vehicle button clicked for ${registrationNumber}`);
    };

    const handleDelete = (registrationNumber) => {
        console.log(`Delete Vehicle button clicked for ${registrationNumber}`);
    };

    const handleCloseModal = () => {
        setModalVisible(false); // Close the modal
    };

    const handleRegistrationClick = (vehicle) => {
        // Save the entire vehicle object to localStorage
        localStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
        console.log(`Vehicle ${vehicle.registrationNumber} saved!`);
        const selectedVehicle = localStorage.getItem('selectedVehicle');
        console.log(selectedVehicle)
        handleAdd();
    };

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
                        <h4 className="text-center text-white mb-4" style={{ fontWeight: '600', letterSpacing: '1px', }}>Registered Vehicles</h4>
                        <CButton onClick={handleAdd} className="Add mb-3">Add Vehicle</CButton>
                        
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className="text-center">Image</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" >Registration Number</CTableHeaderCell>
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

                        {/* Modal for Adding Vehicle */}
                        <CModal visible={modalVisible} onClose={handleCloseModal} size='xl'>
                            <CModalHeader>
                                <CModalTitle>Add Vehicle</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <Vehicles onClose={handleCloseModal} /> {/* Pass the onClose function to the Vehicles component */}
                            </CModalBody>
                        </CModal>
                    </div> {/* Close gradient-container */}
                </div>
            </div>
            <AppFooter />
        </div>
    );
}
