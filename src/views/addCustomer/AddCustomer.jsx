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
  import { cilLockLocked, cilUser, cilLowVision, cilPhone } from '@coreui/icons';
  import instance from '../../components/service/Service';
  import { Alert } from '../../components/alert/Alert';

export default function AddCustomer() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        userType: '',
        contact: '',
        profileImage: '',
      });
    
      const [showPassword, setShowPassword] = useState(false);
      const [errors, setErrors] = useState({});
      const [isHovered, setIsHovered] = useState(false);
    
      const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const regexName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
      const regexPassword = /^(?=.*[A-Z])(?=.*\W)(?=.*\d).{8,}$/;
    
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
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
          try {
            const formDataToSubmit = {
              username: formData.username,
              password: formData.password,
              email: formData.email,
              userType: formData.userType,
              contact: formData.contact,
              profileImage: formData.profileImage,
            };
    
            console.log('Submitting form data:', formDataToSubmit);
    
            const response = await instance.post('/users/register', formDataToSubmit, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            Alert('Registration Successful', 'You have registered successfully!', 'success');
            console.log('Registration successful:', response.data);
          } catch (error) {
            console.error('Registration error:', error);
            if (error.response && error.response.data) {
              setErrors({ server: error.response.data.message });
            }
            Alert('Registration Failed', 'There was an error during registration.', 'error');
          }
        } else {
          console.error('Validation errors:', validationErrors);
        }
      };
    
      const validateFormData = () => {
        const validationErrors = {};
    
        if (!regexName.test(formData.username)) {
          validationErrors.username = 'Invalid username format';
        }
        if (!regexEmail.test(formData.email)) {
          validationErrors.email = 'Invalid email format';
        }
        if (!regexPassword.test(formData.password)) {
          validationErrors.password =
            'Password must be at least 8 characters long, contain one uppercase letter, one special character, and one number.';
        }
        if (!formData.userType) {
          validationErrors.userType = 'User type is required';
        }
        if (!formData.contact) {
          validationErrors.contact = 'Contact number is required';
        }
    
        return validationErrors;
      };

    return (
        <>
            <CCard className="form-container">
                <CCardHeader className="form-header" style={{ background: 'linear-gradient(135deg, #FFD700, #322e2e)' }}>
                    <h3 className='text-white text-center'>Add Customer</h3>
                </CCardHeader>
                <CCardBody className="form-body">

                    <CForm onSubmit={handleSubmit}>
                        <CRow className="mb-3">
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                    </CInputGroupText>
                                    <CFormInput
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </CInputGroup>
                                {errors.username && <p className="text-danger">{errors.username}</p>}
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>@</CInputGroupText>
                                    <CFormInput
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </CInputGroup>
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>
                                        <CIcon icon={cilPhone} />
                                    </CInputGroupText>
                                    <CFormInput
                                        name="contact"
                                        placeholder="Contact Number"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </CInputGroup>
                                {errors.contactNumber && <p className="text-danger">{errors.contactNumber}</p>}
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>
                                        <CIcon icon={cilLockLocked} />
                                    </CInputGroupText>
                                    <CFormInput
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <CInputGroupText onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                        <CIcon icon={showPassword ? cilLowVision : cilLowVision} />
                                    </CInputGroupText>
                                </CInputGroup>
                                {errors.password && <p className="text-danger">{errors.password}</p>}
                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                    </CInputGroupText>
                                    <select
                                        className="form-select"
                                        name="userType"
                                        value={formData.userType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="Customer">Customer</option>
                                    </select>
                                </CInputGroup>
                            </CCol>
                        </CRow>

                        <CButton type="submit" className="w-100 text-white" style={{
                            backgroundColor: isHovered ? 'bisque' : '#2a303d',
                            transition: 'background-color 0.3s ease',
                        }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Register
                        </CButton>
                    </CForm>
                </CCardBody>
            </CCard>

        </>
    )
}
