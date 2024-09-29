import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
  CButton
} from '@coreui/react';
import instance from '../../components/service/Service';
import './style.css';

export default function DriverVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      { registrationNumber: 'DR123', manufacturer: 'Tesla', model: 'Model S', vehicleType: 'Electric' },
      { registrationNumber: 'DR456', manufacturer: 'Ford', model: 'F-150', vehicleType: 'Truck' },
      { registrationNumber: 'DR789', manufacturer: 'BMW', model: 'X5', vehicleType: 'SUV' }
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
    console.log('Add Vehicle button clicked');
    
  };

  const handleUpdate = (registrationNumber) => {
    console.log(`Update Vehicle button clicked for ${registrationNumber}`);
    
  };

  const handleDelete = (registrationNumber) => {
    console.log(`Delete Vehicle button clicked for ${registrationNumber}`);
    
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
    <div className="container mt-4">
      <h2 className="text-center text-white mb-4">Registered Vehicles</h2>
      <CButton  onClick={handleAdd} className=" Add mb-3" href='http://localhost:3000/#/vehicles'>Add Vehicle</CButton>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead>
          <CTableRow>
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
                <CTableDataCell className="text-center">{vehicle.registrationNumber}</CTableDataCell>
                <CTableDataCell>{vehicle.manufacturer}</CTableDataCell>
                <CTableDataCell>{vehicle.model}</CTableDataCell>
                <CTableDataCell>{vehicle.vehicleType}</CTableDataCell>
                <CTableDataCell>
                  <CButton  onClick={() => handleUpdate(vehicle.registrationNumber)} className=" Update me-2">
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
              <CTableDataCell colSpan="5" className="text-center">
                No vehicles found
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </div>
  );
}
