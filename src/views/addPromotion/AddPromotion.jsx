import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardHeader
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import instance from '../../components/service/Service';
import Alert from '../../components/alert/Alert';

export default function AddPromotion() {
  const [formData, setFormData] = useState({
    name: '',
    discountPercentage: '',
    promotionType: '',
    validFrom: '',
    validTo: '',
  });

  const [errors, setErrors] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFormData();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formDataToSubmit = {
        name: formData.name,
        discountPercentage: formData.discountPercentage,
        promotionType: formData.promotionType,
        validFrom: formData.validFrom,
        validTo: formData.validTo,
      };

      console.log('Submitting form data:', formDataToSubmit);

      try {
        // const response = await instance.post('/promotions/add', formDataToSubmit);
        Alert('Promotion Added', 'The promotion has been added successfully!', 'success');
      } catch (error) {
        console.error('Error adding promotion:', error);
        Alert('Failed to Add Promotion', 'There was an error while adding the promotion.', 'error');
      }
    } else {
      console.error('Validation errors:', validationErrors);
    }
  };

  const validateFormData = () => {
    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = 'Promotion name is required';
    }
    if (!formData.discountPercentage || isNaN(formData.discountPercentage)) {
      validationErrors.discountPercentage = 'Valid discount percentage is required';
    }
    if (!formData.promotionType) {
      validationErrors.promotionType = 'Promotion type is required';
    }
    if (!formData.validFrom) {
      validationErrors.validFrom = 'Valid from date is required';
    }
    if (!formData.validTo) {
      validationErrors.validTo = 'Valid to date is required';
    }
    return validationErrors;
  };

  return (
    <>
      <CCard style={{ padding: '20px' }}>
        <CCardBody className="form-body">
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText>Name</CInputGroupText>
                  <CFormInput
                    name="name"
                    placeholder="Promotion Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </CInputGroup>
                {errors.name && <p className="text-danger">{errors.name}</p>}
              </CCol>
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText>Discount %</CInputGroupText>
                  <CFormInput
                    name="discountPercentage"
                    placeholder="Discount Percentage"
                    value={formData.discountPercentage}
                    onChange={handleInputChange}
                    required
                  />
                </CInputGroup>
                {errors.discountPercentage && <p className="text-danger">{errors.discountPercentage}</p>}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText>Promotion Type</CInputGroupText>
                  <CFormInput
                    name="promotionType"
                    placeholder="Type of Promotion"
                    value={formData.promotionType}
                    onChange={handleInputChange}
                    required
                  />
                </CInputGroup>
                {errors.promotionType && <p className="text-danger">{errors.promotionType}</p>}
              </CCol>
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText>Valid From</CInputGroupText>
                  <CFormInput
                    type="date"
                    name="validFrom"
                    value={formData.validFrom}
                    onChange={handleInputChange}
                    required
                  />
                </CInputGroup>
                {errors.validFrom && <p className="text-danger">{errors.validFrom}</p>}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText>Valid To</CInputGroupText>
                  <CFormInput
                    type="date"
                    name="validTo"
                    value={formData.validTo}
                    onChange={handleInputChange}
                    required
                  />
                </CInputGroup>
                {errors.validTo && <p className="text-danger">{errors.validTo}</p>}
              </CCol>
            </CRow>

            <CRow>
              <CCol style={{ display: 'flex', justifyContent: 'center' }}>
                <CButton
                  type="submit"
                  className="w-25 mt-3 text-white"
                  style={{
                    backgroundColor: isHovered ? 'bisque' : '#e0b506',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Add Promotion
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
}
