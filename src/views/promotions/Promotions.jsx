import React, { useState, useEffect } from 'react';
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CButton,
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalBody,
    CSpinner
} from '@coreui/react';
import AddPromotion from '../addPromotion/AddPromotion';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import AppSidebar from '../../components/AppSidebar';
import axios from 'axios';
import './style.css';
import instance from '../../components/service/Service';

const Promotions = () => {
    const [promotions, setPromotions] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchPromotions = async () => {
            setLoading(true);
            try {
              
                const response = await instance.get('/promotions/all');
                setPromotions(response.data); 
            } catch (err) {
                setError('Failed to load promotions');
                console.error('Error fetching promotions:', err);
            } finally {
                setLoading(false); 
            }
        };

        fetchPromotions();
    }, []);

    const handleAddPromotion = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleUpdatePromotion = (id) => {
        alert(`Update promotion with id ${id}`);
    };

    const handleDeletePromotion = (id) => {
        setPromotions(promotions.filter((promo) => promo.id !== id));
    };

    return (
        <div className="app-container">
            <AppHeader />
            <div className="main-content">
                <AppSidebar className="app-sidebar" />
                <div className="content-wrap">
                    <div className="gradient-container">
                        <h4 className='text-center' style={{ fontWeight: '600', letterSpacing: '1px' }}>Manage Promotions</h4>

                        <CRow className="mb-4">
                            <CCol className="text-start">
                                <CButton className='Add' onClick={handleAddPromotion}>
                                    Add Promotion
                                </CButton>
                            </CCol>
                        </CRow>

                        {loading ? (
                            <div className="text-center">
                                <CSpinner color="primary" />
                                <p>Loading promotions...</p>
                            </div>
                        ) : (
                            <CTable align="middle" className="mb-0 border" hover responsive style={{ fontSize: '1rem', borderRadius: '10px' }}>
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
                                    {promotions.length > 0 ? (
                                        promotions.map((promotion) => (
                                            <CTableRow key={promotion.id} style={{ transition: '0.3s' }}>
                                                <CTableDataCell>{promotion.name}</CTableDataCell>
                                                <CTableDataCell>{promotion.discountPercentage}</CTableDataCell>
                                                <CTableDataCell>{promotion.promotionType}</CTableDataCell>
                                                <CTableDataCell>{promotion.validFrom}</CTableDataCell>
                                                <CTableDataCell>{promotion.validTo}</CTableDataCell>
                                                <CTableDataCell>
                                                    <CButton
                                                        className=" Update me-2"
                                                        onClick={() => handleUpdatePromotion(promotion.id)}
                                                    >
                                                        Update
                                                    </CButton>
                                                    <CButton
                                                        className='Delete'
                                                        onClick={() => handleDeletePromotion(promotion.id)}
                                                    >
                                                        Delete
                                                    </CButton>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))
                                    ) : (
                                        <CTableRow>
                                            <CTableDataCell colSpan="6" className="text-center">
                                                No promotions found
                                            </CTableDataCell>
                                        </CTableRow>
                                    )}
                                </CTableBody>
                            </CTable>
                        )}

                        {error && <div className="text-danger text-center mt-2">{error}</div>}

                        <CModal visible={showModal} onClose={handleModalClose} size="lg">
                            <CModalHeader closeButton>
                                <h5>Add Promotion</h5>
                            </CModalHeader>
                            <CModalBody>
                                <AddPromotion />
                            </CModalBody>
                        </CModal>
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}

export default Promotions;
