import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CInputGroup,
  CButton,
  CRow,
  CCol
} from '@coreui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import AppFooter from '../../components/AppFooter';
import AppHeader from '../../components/AppHeader';
import AppSidebar from '../../components/AppSidebar';
import '../../scss/formStyles.css';

const Trip = () => {
  const [formData, setFormData] = useState({
    pickupLocation: { lat: 7.8731, lng: 80.7718 },  
    destination: { lat: 0, lng: 0 },
    startLatitude: '',
    startLongitude: '',
    destinationLatitude: '',
    destinationLongitude: '',
    scheduledTime: '',
    selectedDriver: ''
  });

  const drivers = [
    { id: 1, name: 'Harendra P' },
    { id: 2, name: 'Sasindu Kumara' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("Latitude") || name.includes("Longitude")) {
      const isLatitude = name.includes("Latitude");
      const locationKey = isLatitude ? "pickupLocation" : "destination";
      setFormData(prev => ({
        ...prev,
        [locationKey]: {
          ...prev[locationKey],
          [name]: value
        },
        [name]: value
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const handleClear = () => {
    setFormData({
      pickupLocation: { lat: 7.8731, lng: 80.7718 },
      destination: { lat: 0, lng: 0 },
      startLatitude: '',
      startLongitude: '',
      destinationLatitude: '',
      destinationLongitude: '',
      scheduledTime: '',
      selectedDriver: ''
    });
  };

  const pickupCoords = [formData.pickupLocation.lat, formData.pickupLocation.lng];
  const destinationCoords = [formData.destination.lat, formData.destination.lng];

  return (
    <div className="app-container">
      <AppHeader />
      <div className="main-content">
        <AppSidebar className="app-sidebar" />
        <div className="content-wrap">
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', width: '100%' }}>
            <div style={{ width: '50%', height: '450px', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <MapContainer
                center={pickupCoords}
                zoom={12} 
                style={{ minHeight: '450px', width: '90%', border: '1px solid #ccc' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={pickupCoords}>
                  <Popup>Pickup Location</Popup>
                </Marker>
                <Marker position={destinationCoords}>
                  <Popup>Destination</Popup>
                </Marker>
              </MapContainer>
            </div>
            <div style={{ width: '50%', padding: '0 15px' }}>
              <CCard className="form-container" style={{ width: '100%' }}>
                <CCardHeader className="form-header" style={{ background: 'linear-gradient(135deg, #FFD700, #322e2e)' }}>
                  <h3 className="text-white">Book Your Trip</h3>
                </CCardHeader>
                <CCardBody className="form-body">
                  <CForm onSubmit={handleSubmit}>
                    <CRow>
                      <CCol md="6">
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="pickupLocation" className="form-label">Pickup Location</label>
                          <input
                            type="text"
                            id="pickupLocation"
                            name="pickupLocation"
                            className="form-control"
                            placeholder="Enter Pickup Location"
                            onChange={handleChange}
                            required
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="destination" className="form-label">Destination</label>
                          <input
                            type="text"
                            id="destination"
                            name="destination"
                            className="form-control"
                            placeholder="Enter Destination"
                            onChange={handleChange}
                            required
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="startLatitude" className="form-label">Start Latitude</label>
                          <input
                            type="number"
                            id="startLatitude"
                            name="startLatitude"
                            className="form-control"
                            placeholder="Enter Start Latitude"
                            value={formData.startLatitude}
                            onChange={handleChange}
                            required
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="startLongitude" className="form-label">Start Longitude</label>
                          <input
                            type="number"
                            id="startLongitude"
                            name="startLongitude"
                            className="form-control"
                            placeholder="Enter Start Longitude"
                            value={formData.startLongitude}
                            onChange={handleChange}
                            required
                          />
                        </CInputGroup>
                      </CCol>

                      <CCol md="6">
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="destinationLatitude" className="form-label">Destination Latitude</label>
                          <input
                            type="number"
                            id="destinationLatitude"
                            name="destinationLatitude"
                            className="form-control"
                            placeholder="Enter Destination Latitude"
                            value={formData.destinationLatitude}
                            onChange={handleChange}
                            required
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="destinationLongitude" className="form-label">Destination Longitude</label>
                          <input
                            type="number"
                            id="destinationLongitude"
                            name="destinationLongitude"
                            className="form-control"
                            placeholder="Enter Destination Longitude"
                            value={formData.destinationLongitude}
                            onChange={handleChange}
                            required
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="scheduledTime" className="form-label">Scheduled Time</label>
                          <input
                            type="datetime-local"
                            id="scheduledTime"
                            name="scheduledTime"
                            className="form-control"
                            onChange={handleChange}
                            required
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="selectedDriver" className="form-label">Select Driver</label>
                          <select
                            id="selectedDriver"
                            name="selectedDriver"
                            className="form-select"
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select a driver</option>
                            {drivers.map(driver => (
                              <option key={driver.id} value={driver.id}>{driver.name}</option>
                            ))}
                          </select>
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <div style={{ display: 'flex', justifyContent: 'right', gap: '10px' }}>
                      <CButton className='btn-submit' type="submit">Book Trip</CButton>
                      <CButton className='btn-clear' type="button" onClick={handleClear}>Clear</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default Trip;
