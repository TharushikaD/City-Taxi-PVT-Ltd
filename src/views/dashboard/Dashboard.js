import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardFooter,
  CRow,
  CCol,
  CButton,
  CAlert,
  CSpinner
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import promoImage from 'src/assets/resources/promo3.png';
import instance from '../../components/service/Service'; 

const Dashboard = () => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTripStatus = async () => {
      try {
        const token = localStorage.getItem('authToken'); 
        const response = await instance.get('/trips/status', { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrip(response.data); 
      } catch (err) {
        setError('Failed to fetch trip status');
        console.error('Error fetching trip status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTripStatus();
  }, []);

  const handlePayment = () => {
    navigate('/payment');
  };

  if (loading) {
    return (
      <div className="text-center">
        <CSpinner color="primary" />
        <p>Loading trip status...</p>
      </div>
    );
  }

  return (
    <>
      <CCard style={{ backgroundColor: '#e0b506', marginBottom: '65px' }}>
        <CCardBody>
          <CRow>
            <CCol sm={12} style={{ backgroundColor: '#2a303d', padding: '20px' }}>
              <h4 className="card-title mb-3 text-white text-center">P R O M O T I O N S !!!</h4>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <img
            src={promoImage}
            alt="Promotional Advertisement"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </CCardFooter>
      </CCard>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 className="card-title mb-3">Trip Status</h4>
              {error ? (
                <CAlert color="danger">{error}</CAlert>
              ) : trip ? (
                trip.status === 'accepted' ? (
                  <CAlert color="success">
                    <strong>Trip Accepted!</strong> Your driver {trip.driverName} has accepted the trip.
                  </CAlert>
                ) : (
                  <CAlert color="danger">
                    <strong>Trip Declined!</strong> Your driver {trip.driverName} has declined the trip.
                  </CAlert>
                )
              ) : (
                <CAlert color="warning">
                  <strong>No Trip Data Available!</strong> Please check back later.
                </CAlert>
              )}
            </CCol>
          </CRow>

          {trip && trip.status === 'accepted' && (
            <CRow>
              <CCol sm={6}>
                <div><strong>Pickup Location:</strong> {trip.pickupLocation}</div>
                <div><strong>Destination:</strong> {trip.destination}</div>
              </CCol>
              <CCol sm={6}>
                <div><strong>Driver Name:</strong> {trip.driverName}</div>
                <div><strong>Fare:</strong> Rs. {trip.fare.toFixed(2)}</div>
              </CCol>
            </CRow>
          )}
        </CCardBody>

        {trip && trip.status === 'accepted' && (
          <CCardFooter>
            <CButton
              style={{ backgroundColor: '#2a303d' }}
              className='text-white'
              onClick={handlePayment}
            >
              Proceed to Payment
            </CButton>
          </CCardFooter>
        )}
      </CCard>
    </>
  );
};

export default Dashboard;
