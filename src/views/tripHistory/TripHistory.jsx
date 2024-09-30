import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormLabel,
    CFormTextarea,
} from '@coreui/react';

const TripHistory = () => {
    const mockTrips = [
        {
            tripId: 101,
            driverName: 'Harendra P',
            pickupLocation: 'Galle',
            destination: 'Karapitiya',
            fare: 525.00,
            paymentMethod: 'Cash',
            date: 'September 20, 2024',
        },
    ];

    const [tripHistory] = useState(mockTrips);
    const [modalVisible, setModalVisible] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [selectedTrip, setSelectedTrip] = useState(null);

    const handleFeedbackSubmit = () => {
        alert(`Feedback for Trip ID ${selectedTrip}: ${feedback}`);
        setFeedback('');
        setModalVisible(false);
    };

    return (
        <CCard className="mb-4">
            <CCardHeader
                style={{ background: 'linear-gradient(135deg, #FFD700, #322e2e)' }}
                className='text-center text-white'
            >
                <h4>Trip History</h4>
            </CCardHeader>
            <CCardBody>
                {tripHistory.length > 0 ? (
                    <CTable hover>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">Trip ID</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Driver</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Pickup Location</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Destination</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Fare (Rs.)</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Feedback</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {tripHistory.map((trip, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{trip.tripId}</CTableDataCell>
                                    <CTableDataCell>{trip.driverName}</CTableDataCell>
                                    <CTableDataCell>{trip.pickupLocation}</CTableDataCell>
                                    <CTableDataCell>{trip.destination}</CTableDataCell>
                                    <CTableDataCell>{trip.fare.toFixed(2)}</CTableDataCell>
                                    <CTableDataCell>{trip.paymentMethod}</CTableDataCell>
                                    <CTableDataCell>{trip.date}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton
                                            style={{ backgroundColor: '#2a303d' }}
                                            onClick={() => {
                                                setSelectedTrip(trip.tripId);
                                                setModalVisible(true);
                                            }}
                                            className='text-white'
                                        >
                                            Feedback
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                ) : (
                    <p>No trip history available.</p>
                )}
            </CCardBody>

            <CModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <CModalHeader>
                    <CModalTitle>Feedback</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormLabel htmlFor="feedback">Your Feedback:</CFormLabel>
                        <CFormTextarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={3}
                            required
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        style={{ backgroundColor: '#2a303d' }}
                        onClick={() => setModalVisible(false)}
                        className='text-white'
                    >
                        Close
                    </CButton>
                    <CButton
                        className='text-white'
                        style={{ backgroundColor: '#e0b506' }}
                        onClick={handleFeedbackSubmit}>
                        Add Feedback
                    </CButton>
                </CModalFooter>
            </CModal>
        </CCard>
    );
};

export default TripHistory;
