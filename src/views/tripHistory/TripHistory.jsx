import React, { useState, useEffect } from 'react';
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
import AppFooter from '../../components/AppFooter';
import AppHeader from '../../components/AppHeader';
import AppSidebar from '../../components/AppSidebar';
import './style.css';
import instance from '../../components/service/Service';

const TripHistory = () => {
    const [tripHistory, setTripHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [selectedTrip, setSelectedTrip] = useState(null);

    const fetchTripHistory = async () => {
        try {
            const response = await instance.get('/trip-history'); 
            setTripHistory(response.data); 
            console.error('Error fetching trip history:', error);
            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTripHistory();
    }, []);

    const handleFeedbackSubmit = () => {
        alert(`Feedback for Trip ID ${selectedTrip}: ${feedback}`);
        setFeedback('');
        setModalVisible(false);
    };

    return (
        <div className='app-container'>
            <AppHeader />
            <div className="main-content">
                <AppSidebar className="app-sidebar" />
                <div className="content-wrap">
                    <div className="gradient-container">
                        <h4 className="text-center text-white mb-4" style={{ fontWeight: '600', letterSpacing: '1px' }}>Trip History</h4>
                        <CCardBody>
                            {loading ? (
                                <p>Loading trip history...</p>
                            ) : (
                                tripHistory.length > 0 ? (
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
                                )
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
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    );
};

export default TripHistory;
