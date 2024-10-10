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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser, cilLowVision, cilPhone } from '@coreui/icons';
import instance from '../../../components/service/Service';
import Alert from '../../../components/alert/Alert';

const Register = () => {
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
  const [alertData, setAlertData] = useState(null);

  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const regexName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
  const regexPassword = /^(?=.*[A-Z])(?=.*\W)(?=.*\d).{8,}$/;
  const regexContact = /^(?:\+94|0)?[7]\d{8}$/;

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

        setAlertData({ title: 'Registration Successful', message: 'You have registered successfully!', icon: 'success' });
        console.log('Registration successful:', response.data);
      } catch (error) {
        console.error('Registration error:', error);
        if (error.response && error.response.data) {
          setErrors({ server: error.response.data.message });
        }
        setAlertData({ title: 'Registration Failed', message: 'There was an error during registration.', icon: 'error' });
      }
    } else {
      console.error('Validation errors:', validationErrors);
    }
  };

  const validateFormData = () => {
    const validationErrors = {};

    if (!regexName.test(formData.username)) {
      validationErrors.username = 'Invalid username';
    }
    if (!regexEmail.test(formData.email)) {
      validationErrors.email = 'Invalid email';
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
    if (!regexContact.test(formData.contact)) {
      validationErrors.contact = 'Invalid contact number. Please enter a valid number.';
    }

    return validationErrors;
  };

  return (
    <div className="d-flex align-items-center min-vh-100" style={{ backgroundColor: '#2a303d' }}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol lg={8}>
            <CCard className="p-4 shadow-lg" style={{ backgroundColor: '#e0b506' }}>
              <CCardBody className="p-4">
                <div className="text-center mb-4">
                  <img
                    src="src/assets/resources/logo.jpeg"
                    alt="City Taxis Logo"
                    className="logo img-fluid"
                    style={{ width: '70px', marginBottom: '1rem' }}
                  />
                  <h1 className="text-white" style={{ fontSize: '20px', }}>
                    Join City Taxi today and enjoy fast, reliable service at your fingertips
                  </h1>
                  <p className="text-white lead">Sign up to get started!</p>
                </div>

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
                      {errors.username && <p className="text-white">{errors.username}</p>}
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
                      {errors.email && <p className="text-white">{errors.email}</p>}
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
                          value={formData.contact}
                          onChange={handleInputChange}
                          required
                        />
                      </CInputGroup>
                      {errors.contact && <p className="text-white">{errors.contact}</p>}
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
                      {errors.password && <p className="text-white">{errors.password}</p>}
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
                          <option value="">Select user type</option>
                          <option value="Driver">Driver</option>
                          <option value="Customer">Customer</option>
                        </select>
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CButton type="submit" className="w-100 text-white" style={{
                    backgroundColor: '#2a303d',
                    transition: 'background-color 0.3s ease',
                  }}>
                    Register
                  </CButton>
                  <CCol xs={12} className="text-center">
                    <CButton color="link" className="px-0" href="http://localhost:3000/#/login">
                      Already have an account!
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

     
      {alertData && <Alert title={alertData.title} message={alertData.message} icon={alertData.icon} />}
    </div>
  );
};

export default Register;
