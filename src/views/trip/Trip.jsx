import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CForm, CInputGroup, CButton, CRow, CCol } from '@coreui/react';
import '../../scss/formStyles.css';

const Trip = () => {
  const [formData, setFormData] = useState({
    userId: '',
    pickupLocation: '',
    destination: '',
    startLatitude: '',
    startLongitude: '',
    destinationLatitude: '',
    destinationLongitude: '',
    scheduledTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
   
  };

  const handleClear = () => {
    setFormData({
      userId: '',
      pickupLocation: '',
      destination: '',
      startLatitude: '',
      startLongitude: '',
      destinationLatitude: '',
      destinationLongitude: '',
      scheduledTime: ''
    });
  };

  return (
    <CCard className="form-container">
      <CCardHeader className="form-header" style={{background:'linear-gradient(135deg, #FFD700, #322e2e)'}}>
        <h3 className='text-white'>Book Your Trip</h3>
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
                  value={formData.pickupLocation}
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
                  value={formData.destination}
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
                  value={formData.scheduledTime}
                  onChange={handleChange}
                  required
                />
              </CInputGroup>
              <div className="form-buttons" style={{ display: 'flex', gap: '15px', marginTop: '2.5rem' }}>
                <CButton type="submit" color="primary" className="btn-submit">
                  Book
                </CButton>
                <CButton type="button" color="secondary" className="btn-clear" onClick={handleClear}>
                  Clear
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default Trip;
