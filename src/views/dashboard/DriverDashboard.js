import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
  CFormCheck,
  CModal,
  CModalHeader,
  CModalBody,
} from '@coreui/react';
import Map from '../map/Map';

const getFormattedCurrentDate = () => {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString('default', options);
}

const DriverDashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const currentDate = getFormattedCurrentDate();
  const[showModal, setShowModal] = useState(false);


  const [tripRequests, setTripRequests] = useState([
    {
      id: 1,
      pickupLocation: "Galle",
      destination: "Karapitiya",
      customerName: "Mihindu Kulasooriya",
      status: "pending",
    },
    {
      id: 2,
      pickupLocation: "Mirissa",
      destination: "Mathara",
      customerName: "Jasmin Weerasingha",
      status: "pending",
    },
  ]);

  const [driverStatus, setDriverStatus] = useState('Available');
  const [acceptedTrip, setAcceptedTrip] = useState(null);

  const handleAcceptTrip = (id) => {
    const acceptedRequest = tripRequests.find(request => request.id === id);
    setTripRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'accepted' } : request
      )
    );
    setDriverStatus('Busy');
    setAcceptedTrip(acceptedRequest);
  };

  const handleDeclineTrip = (id) => {
    setTripRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'declined' } : request
      )
    );
  };

  const toggleDriverStatus = () => {
    setDriverStatus((prevStatus) => (prevStatus === 'Available' ? 'Busy' : 'Available'));
  };

  const handleMapClick = () => {
    setShowModal(true);
};

const handleModalClose = () => {
    setShowModal(false);
};

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow style={{padding:'5px'}}>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title" >
                Trip Requests
              </h4>
            </CCol>
            <CCol sm={7} className="text-end">
              <div className="small text-body-secondary">{currentDate}</div>
            </CCol>
          </CRow>

          <CRow className="mt-3">
            <CCol>
              <CFormCheck
                type="switch"
                id="driverStatusToggle"
                label={
                  <span style={{ fontWeight: '500' }}>
                    Driver is Currently: <strong>{driverStatus}</strong>
                  </span>
                }
                checked={driverStatus === 'Busy'}
                onChange={toggleDriverStatus}
                style={{
                  backgroundColor: driverStatus === 'Busy' ? '#f44336': '#4caf50',
                  borderRadius: '25px',
                }}
              />
            </CCol>
          </CRow>

          <div className="mt-3" >
            {tripRequests.map((request) => (
              <div key={request.id} className="border p-2 mb-2 rounded" style={{ padding: '20px', backgroundColor: '#e0b506', lineHeight:'30px' }}>
                <div>
                  <strong>Customer:</strong> {request.customerName}
                </div>
                <div>
                  <strong>Pickup:</strong> {request.pickupLocation}
                </div>
                <div>
                  <strong>Destination:</strong> {request.destination}
                </div>
                <div>
                  <strong>Status:</strong> {request.status}
                </div>
                {request.status === 'pending' && (
                  <div className="mt-2">
                    <CButton
                      style={{ backgroundColor: '#2a303d' }}
                      onClick={handleMapClick}
                      className="me-2 text-white"
                    >
                     View map
                    </CButton>
                    <CButton
                      style={{ backgroundColor: '#2a303d' }}
                      onClick={() => handleAcceptTrip(request.id)}
                      className="me-2 text-white"
                    >
                      Accept
                    </CButton>
                    <CButton
                      style={{ backgroundColor: '#2a303d' }}
                      onClick={() => handleDeclineTrip(request.id)}
                      className="text-white"
                    >
                      Decline
                    </CButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CCardBody>
        <CCardFooter>
          <div>
            <strong>Accepted Trip Details:</strong>
            {acceptedTrip ? (
              <div>
                <div>
                  <strong>Customer:</strong> {acceptedTrip.customerName}
                </div>
                <div>
                  <strong>Pickup:</strong> {acceptedTrip.pickupLocation}
                </div>
                <div>
                  <strong>Destination:</strong> {acceptedTrip.destination}
                </div>
                <div>
                  <strong>Status:</strong> Accepted
                </div>
                <CButton
                  color="primary"
                  className="mt-2"
                  onClick={() => {
                    setDriverStatus('available');
                    setAcceptedTrip(null);
                  }}
                >
                  Mark Trip Complete
                </CButton>
              </div>
            ) : (
              <div>No trip accepted yet.</div>
            )}
             <CModal visible={showModal} onClose={handleModalClose} size="lg">
                            <CModalHeader  closeButton>
                                <h5>Map</h5>
                            </CModalHeader>
                            <CModalBody>
                                <Map />
                            </CModalBody>
                        </CModal>
          </div>
        </CCardFooter>
      </CCard>
    </>
  );
}

export default DriverDashboard;
