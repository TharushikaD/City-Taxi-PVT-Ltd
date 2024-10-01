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
} from '@coreui/react';
import './style.css';
import AppFooter from '../../components/AppFooter';
import AppHeader from '../../components/AppHeader';
import AppSidebar from '../../components/AppSidebar';


const getBookingHistoryByDriverId = (driverId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = [
                {
                    bookingId: 201,
                    customerName: 'Sumith K',
                    pickupLocation: 'Colombo',
                    destination: 'Kandy',
                    fare: 1500.00,
                    paymentMethod: 'Card',
                    date: 'September 25, 2024',
                    feedback: 'Great service!',
                },
                {
                    bookingId: 202,
                    customerName: 'Kumara Dias',
                    pickupLocation: 'Galle',
                    destination: 'Matara',
                    fare: 800.00,
                    paymentMethod: 'Cash',
                    date: 'September 26, 2024',
                    feedback: 'Driver was very polite.',
                },
            ];
            resolve(mockData);
        }, 1000);
    });
};

const BookingHistory = ({ driverId }) => {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBookingHistoryByDriverId(driverId).then((data) => {
            setBookingHistory(data);
            setLoading(false);
        });
    }, [driverId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app-container">
        <AppHeader />
        <div className="main-content">
            <AppSidebar className="app-sidebar" />
            <div className="content-wrap">
                <div className="gradient-container">
                <h4 className='text-center' style={{ fontWeight: '600', letterSpacing: '1px',padding:'10px' }}>Booking History</h4>
                {bookingHistory.length > 0 ? (
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
                            {bookingHistory.map((booking, index) => (
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
                            ))}
                        </CTableBody>
                    </CTable>
                ) : (
                    <p>No booking history available.</p>
                )}
            </div>
            </div>
            </div>
            <AppFooter/>
            </div>
    );
};

export default BookingHistory;
