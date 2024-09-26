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
import { cilLockLocked, cilUser, cilLowVision } from '@coreui/icons';
import instance from '../../../components/service/Service'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await instance.post('/login', loginData);
      const token = response.data.token;
      const userId = response.data.userId;

     
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);

     
      const userResponse = await instance.get(`/users/${userId}`);

      const userRole = userResponse.data.role;

      
      if (userRole === 'admin') {
        navigate('/adminLayout');
      } else if (userRole === 'driver') {
        navigate('/driverLayout');
      } else if (userRole === 'customer') {
        navigate('/defaultLayout');
      }

      console.log('Login successful:', userResponse.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="d-flex align-items-center min-vh-100" style={{ backgroundColor: '#2a303d' }}>
      <CContainer>
        <CRow className="justify-content-between">
          <CCol lg={6} className="d-flex flex-column justify-content-center text-center p-5">
            <h1 className="text-white" style={{ fontSize: '40px' }}>
              Welcome to City Taxis
            </h1>
            <p className="text-white lead">Your Journey Begins Here!</p>
          </CCol>

          <CCol lg={4} md={6} className="d-flex justify-content-center align-items-center">
            <CCard className="p-4 shadow-lg" style={{ backgroundColor: '#e0b506' }}>
              <CCardBody>
                <div className="text-center mb-4">
                  <img
                    src="src/assets/resources/logo.jpeg"
                    alt="City Taxis Logo"
                    className="logo img-fluid"
                    style={{ width: '80px', marginBottom: '1rem' }}
                  />
                </div>
                <CForm onSubmit={handleSubmit}>
                  <h2 className="text-center mb-4" style={{ fontSize: '30px' }}>
                    Login
                  </h2>
                  <p className="text-body-secondary text-center mb-4">Sign in to your account</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="username"
                      placeholder="Username"
                      autoComplete="username"
                      value={loginData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <CInputGroupText onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                      <CIcon icon={cilLowVision} />
                    </CInputGroupText>
                  </CInputGroup>

                  <CRow className="mb-3">
                    <CCol xs={12}>
                      <CButton type="submit" className="w-100 text-white" style={{ backgroundColor: '#2a303d' }}>
                        Login
                      </CButton>
                    </CCol>
                    <CCol xs={12} className="text-center">
                      <CButton color="link" className="px-0" href="http://localhost:3000/#/register">
                        Don't have an account!
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
