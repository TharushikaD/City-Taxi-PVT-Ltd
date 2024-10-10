import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CRow,
    CCol,
    CForm,
    CFormCheck,
    CFormLabel,
    CFormInput,
    CButton,
} from '@coreui/react';
import Alert from '../../components/alert/Alert';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [cardNumber, setCardNumber] = useState('');
    const [csv, setCsv] = useState('');

    const currentDate = new Date().toLocaleDateString('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const trip = {
        tripId: 1234,
        driverName: 'HarendraP',
        pickupLocation: 'Galle',
        destination: 'Karapitiya',
        fare: 525.00,
        date: currentDate,
    };

    const handlePayment = (e) => {
        e.preventDefault();
        if (paymentMethod === 'card' && (cardNumber === '' || csv === '')) {
            Alert({
                title: 'Missisng Data',
                message: "Please add required details",
                icon: 'info',
                confirmButtonText:'close',
            })
        } else {
            alert('Payment successfully processed using ' + paymentMethod + '!');

            const tripHistory = JSON.parse(localStorage.getItem('tripHistory')) || [];
            tripHistory.push({
                ...trip,
                paymentMethod,
            });
            localStorage.setItem('tripHistory', JSON.stringify(tripHistory));
        }
    };

    return (
        <>
            <CCard className="mb-4" style={{ width: '100%' }}>
                <CCardBody>
                    <CForm onSubmit={handlePayment}>
                        <CRow>
                            <CCol sm={12} className="mt-3">
                                <CFormLabel>Select Payment Method:</CFormLabel>
                                <CFormCheck
                                    type="radio"
                                    name="paymentMethod"
                                    id="cashOption"
                                    label="Cash"
                                    value="cash"
                                    checked={paymentMethod === 'cash'}
                                    onChange={() => setPaymentMethod('cash')}
                                />
                                <CFormCheck
                                    type="radio"
                                    name="paymentMethod"
                                    id="cardOption"
                                    label="Card"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                />
                            </CCol>
                        </CRow>

                        {paymentMethod === 'card' && (
                            <CRow className="mt-3">
                                <CCol sm={6}>
                                    <CFormLabel htmlFor="cardNumber">Card Number</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="cardNumber"
                                        placeholder="Enter card number"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </CCol>
                                <CCol sm={6}>
                                    <CFormLabel htmlFor="csv">CSV</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="csv"
                                        placeholder="Enter CSV"
                                        value={csv}
                                        onChange={(e) => setCsv(e.target.value)}
                                    />
                                </CCol>
                                <CRow className="mt-3">
                                    <CCol sm={6}>
                                        <CFormLabel htmlFor="date">Current Date</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="currentDate"
                                            value={currentDate}
                                            disabled
                                        />
                                    </CCol>
                                </CRow>
                            </CRow>
                        )}


                        <CCol className="mt-3" style={{ display: 'flex', justifyContent: 'right' }}>
                            <CButton
                                className="text-white"
                                style={{ backgroundColor: '#2a303d', marginTop: '10px', padding: '12px' }}
                                type="submit"
                            >
                                Checkout
                            </CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    );
};

export default Payment;
