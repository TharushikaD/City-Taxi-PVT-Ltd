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
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import AppSidebar from '../../components/AppSidebar';
import './style.css';


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


        <div className="app-container">
            <AppHeader />
            <div className="main-content">
                <AppSidebar className="app-sidebar" />
                <div className="content-wrap">
                    <div className="gradient-container">
                        <h4 className='text-center' style={{ fontWeight: '600', letterSpacing: '1px' }}>Manage Promotions</h4>
                        <CRow className="mb-4">
                            <CCol className="text-start">
                                <CButton
                                    className='Add'
                                    onClick={handleAddPromotion}
                                >
                                    Add Promotion
                                </CButton>
                            </CCol>
                        </CRow>
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
                                {promotions.map((promotion) => (
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
                                ))}
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>


    );
}

export default Promotions;