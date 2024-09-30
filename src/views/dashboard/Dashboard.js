import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardFooter,
  CRow,
  CCol,
  CButton,
  CAlert
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';


const getTripStatus = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tripId: 1234,
        status: 'accepted',
        driverName: 'HarendraP',
        pickupLocation: 'Galle',
        destination: 'Karapitiya',
        fare: 525.00
      });
    }, 1000);
  });
};

const CustomerDashboard = () => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getTripStatus().then((data) => {
      setTrip(data);
      setLoading(false);
    });
  }, []);

  const handlePayment = () => {
    navigate('/payment');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 className="card-title mb-3">Trip Status</h4>
              {trip.status === 'accepted' ? (
                <CAlert color="success">
                  <strong>Trip Accepted!</strong> Your driver {trip.driverName} has accepted the trip.
                </CAlert>
              ) : (
                <CAlert color="danger">
                  <strong>Trip Declined!</strong> Your driver {trip.driverName} has declined the trip.
                </CAlert>
              )}
            </CCol>
          </CRow>

          {trip.status === 'accepted' && (
            <>
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
            </>
          )}
        </CCardBody>

        <CCardFooter>
          {trip.status === 'accepted' && (
            <CButton
              style={{ backgroundColor: '#2a303d' }}
              className='text-white'
              onClick={handlePayment}
            >
              Proceed to Payment
            </CButton>
          )}
        </CCardFooter>
      </CCard>
    </>
  );
};

export default CustomerDashboard;
