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
  const [errorMessage, setErrorMessage] = useState('');
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
    setErrorMessage('');

    try {

      const response = await instance.post('/login', loginData);
      const { token, userId } = response.data;


      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);


      const userResponse = await instance.get(`/users/${userId}`);
      const userRole = userResponse.data.role;


      switch (userRole) {
        case 'admin':
          navigate('/adminLayout');
          break;
        case 'driver':
          navigate('/driverLayout');
          break;
        case 'customer':
          navigate('/defaultLayout');
          break;
        default:
          throw new Error('Invalid user role');
      }

      console.log('Login successful:', userResponse.data);
    } catch (error) {

      console.error('Login error:', error);
      setErrorMessage(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Login failed. Please check your username and password.'
      );
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


                  {errorMessage && (
                    <div className="text-danger mb-3 text-center">
                      {errorMessage}
                    </div>
                  )}


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
