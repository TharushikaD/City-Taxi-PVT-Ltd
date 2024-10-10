import React, { useState, useEffect } from 'react';
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CSpinner,
} from '@coreui/react';
import './style.css';
import AppFooter from '../../components/AppFooter';
import AppHeader from '../../components/AppHeader';
import AppSidebar from '../../components/AppSidebar';
import instance from '../../components/service/Service';

const BookingHistory = ({ driverId }) => {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            setLoading(true);
            setError(null); 
            try {
                const token = localStorage.getItem('authToken'); 
                const response = await instance.get(`/bookings/driver/${driverId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });

                if (Array.isArray(response.data)) {
                    setBookingHistory(response.data);
                } else {
                    setError('Unexpected response format.');
                }
            } catch (err) {
                setError('Failed to fetch booking history');
                console.error('Error fetching booking history:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, [driverId]);

    return (
        <div className="app-container">
            <AppHeader />
            <div className="main-content">
                <AppSidebar className="app-sidebar" />
                <div className="content-wrap">
                    <div className="gradient-container">
                        <h4 className='text-center' style={{ fontWeight: '600', letterSpacing: '1px', padding: '10px' }}>Booking History</h4>
                        {loading ? (
                            <div className="text-center">
                                <CSpinner color="primary" />
                                <p>Loading booking history...</p>
                            </div>
                        ) : (
                            <CTable hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Booking ID</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Pickup Location</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Destination</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Fare (Rs.)</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Feedback</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {error ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan="8" className="text-danger text-center">
                                                {error}
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : bookingHistory.length > 0 ? (
                                        bookingHistory.map((booking, index) => (
                                            <CTableRow key={index}>
                                                <CTableDataCell>{booking.bookingId}</CTableDataCell>
                                                <CTableDataCell>{booking.customerName}</CTableDataCell>
                                                <CTableDataCell>{booking.pickupLocation}</CTableDataCell>
                                                <CTableDataCell>{booking.destination}</CTableDataCell>
                                                <CTableDataCell>{booking.fare.toFixed(2)}</CTableDataCell>
                                                <CTableDataCell>{booking.paymentMethod}</CTableDataCell>
                                                <CTableDataCell>{booking.date}</CTableDataCell>
                                                <CTableDataCell>{booking.feedback}</CTableDataCell>
                                            </CTableRow>
                                        ))
                                    ) : (
                                        <CTableRow>
                                            <CTableDataCell colSpan="8" className="text-center">
                                                No booking history available.
                                            </CTableDataCell>
                                        </CTableRow>
                                    )}
                                </CTableBody>
                            </CTable>
                        )}
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    );
};

export default BookingHistory;
