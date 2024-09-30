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
    CCol,
    CRow
} from '@coreui/react';

const Promotions = () => {
    const [promotions, setPromotions] = useState([
        {
            id: 1,
            name: 'New Year Sale',
            discountPercentage: '20%',
            promotionType: 'Seasonal',
            validFrom: '2024-04-01',
            validTo: '2024-04-30'
        },
        {
            id: 2,
            name: 'Chirstmas Sale',
            discountPercentage: '45%',
            promotionType: 'Seasonal',
            validFrom: '2024-11-30',
            validTo: '2024-12-30'
        }
    ]);

    const handleAddPromotion = () => {
        alert('Add promotion clicked');
    };

    const handleUpdatePromotion = (id) => {
        alert(`Update promotion with id ${id}`);
    };

    const handleDeletePromotion = (id) => {
        setPromotions(promotions.filter((promo) => promo.id !== id));
    };

    return (
        <>
            <div style={{  display: 'flex', justifyContent: 'center', margin: 'auto', padding: '2rem 0' }}>
                <CCard className="mb-4" style={{ borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <CCardHeader
                        style={{
                            background: 'linear-gradient(135deg, #FFD700, #322e2e)',
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px'
                        }}
                        className='text-center text-white p-4'
                    >
                        <h4 style={{ fontWeight: '600', letterSpacing: '1px' }}>Manage Promotions</h4>
                    </CCardHeader>
                    <CCardBody style={{ padding: '2rem' }}>
                        <CRow className="mb-4">
                            <CCol className="text-start">
                                <CButton
                                    onClick={handleAddPromotion}
                                    style={{
                                        backgroundColor: '#2a303d',
                                        borderColor: '#4CAF50',
                                        borderRadius: '8px',
                                        padding: '0.5rem 1.5rem',
                                        fontWeight: '600',
                                        color:'white'
                                    }}
                                >
                                    Add Promotion
                                </CButton>
                            </CCol>
                        </CRow>
                        <CTable hover responsive style={{ fontSize: '1rem', borderRadius: '10px' }}>
                            <CTableHead>
                                <CTableRow style={{ backgroundColor: '#f8f9fa' }}>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Discount Percentage</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Promotion Type</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Valid From</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Valid To</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {promotions.map((promotion) => (
                                    <CTableRow key={promotion.id} style={{ transition: '0.3s' }}>
                                        <CTableDataCell>{promotion.name}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{promotion.discountPercentage}</CTableDataCell>
                                        <CTableDataCell>{promotion.promotionType}</CTableDataCell>
                                        <CTableDataCell>{promotion.validFrom}</CTableDataCell>
                                        <CTableDataCell>{promotion.validTo}</CTableDataCell>
                                        <CTableDataCell>
                                            <CButton
                                                size="sm"
                                                className="me-2"
                                                style={{
                                                    borderRadius: '8px',
                                                    backgroundColor: '#2a303d',
                                                    color:'white',
                                                     padding:'10px'
                                                }}
                                                onClick={() => handleUpdatePromotion(promotion.id)}
                                            >
                                                Update
                                            </CButton>
                                            <CButton
                                                size="sm"
                                                style={{
                                                    borderRadius: '8px',
                                                    backgroundColor: '#2a303d',
                                                    color:'white',
                                                    padding:'10px'

                                                }}
                                                onClick={() => handleDeletePromotion(promotion.id)}
                                            >
                                                Delete
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </div>

        </>
    );
};

export default Promotions;
