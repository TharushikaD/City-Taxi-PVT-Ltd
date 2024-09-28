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
import { cilLockLocked, cilUser, cilCamera, cilLowVision } from '@coreui/icons';
import instance from '../../../components/service/Service';
import { Alert } from '../../../components/alert/Alert';

const Register = () => {

  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: '',
  //   email: '',
  //   userType: '',
  //   profileImage: null,
  // });
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [showPassword, setShowPassword] = useState(false);
  // const [errors, setErrors] = useState({});

  // const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // const regexName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
  // const regexPassword = /^(?=.*[A-Z])(?=.*\W)(?=.*\d).{8,}$/;
  // const allowedImageTypes = ['image/jpeg', 'image/png'];
  // const maxImageSize = 2 * 1024 * 1024; //2mb

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (!allowedImageTypes.includes(file.type)) {
  //       setErrors({ ...errors, profileImage: 'Only JPEG or PNG images are allowed.' });
  //     } else if (file.size > maxImageSize) {
  //       setErrors({ ...errors, profileImage: 'Image size must be less than 2MB.' });
  //     } else {
  //       setFormData({
  //         ...formData,
  //         profileImage: file,
  //       });
  //       setSelectedImage(URL.createObjectURL(file));
  //     }
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const validationErrors = validateFormData();
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {
  //     try {
  //       const formDataToSubmit = new FormData();
  //       formDataToSubmit.append('username', formData.username);
  //       formDataToSubmit.append('password', formData.password);
  //       formDataToSubmit.append('email', formData.email);
  //       formDataToSubmit.append('userType', formData.userType);

  //       if (formData.profileImage) {
  //         formDataToSubmit.append('profileImage', formData.profileImage);
  //       }

  //       console.log('Submitting form data:', formDataToSubmit);

  //       const response = await instance.post('/register', formDataToSubmit, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       Alert('Registration Successful', 'You have registered successfully!', 'success');
  //       console.log('Registration successful:', response.data);
  //       clearForm();
  //     } catch (error) {
  //       console.error('Registration error:', error);

  //       if (error.response && error.response.data) {
  //         setErrors({ server: error.response.data.message });
  //       }

  //       Alert('Registration Failed', 'There was an error during registration.', 'error');
  //     }
  //   } else {
  //     console.error('Validation errors:', validationErrors);
  //   }

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    userType: '',
    profileImage:'',
    // profileImage: null,  // Removed profile image
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
          profileImage: formData.profileImage,
        };

        console.log('Submitting form data:', formDataToSubmit);

        const response = await instance.post('/register', formDataToSubmit, {
          headers: {
            'Content-Type': 'application/json',  
          },
        });

        Alert('Registration Successful', 'You have registered successfully!', 'success');
        console.log('Registration successful:', response.data);
        // clearForm();
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



    return validationErrors;
  };

  // const clearForm = () => {
  //   setFormData({
  //     username: '',
  //     password: '',
  //     email: '',
  //     userType: '',
  //     profileImage: null,
  //   });
  //   setSelectedImage(null);
  //   setErrors({});
  // };


  return (
    <div className="d-flex align-items-center min-vh-100" style={{ backgroundColor: '#2a303d' }}>
      <CContainer>
        <CRow className="justify-content-between">
          <CCol lg={6} className="d-flex flex-column justify-content-center text-center p-5">
            <h1 className="text-white" style={{ fontSize: '30px' }}>
              Join City Taxi today and enjoy fast, reliable service at your fingertips
            </h1>
            <p className="text-white lead">Sign up to get started!</p>
          </CCol>

          <CCol lg={4} md={6} className="d-flex justify-content-center align-items-center">
            <CCard className="p-4 shadow-lg" style={{ backgroundColor: '#e0b506', maxHeight: '700px' }}>
              <CCardBody className="p-4">
                <div className="text-center mb-4">
                  <img
                    src="src/assets/resources/logo.jpeg"
                    alt="City Taxis Logo"
                    className="logo img-fluid"
                    style={{ width: '70px', marginBottom: '1rem' }}
                  />
                </div>
                <CForm onSubmit={handleSubmit}>
                  <h3 className="text-center mb-3">Register</h3>
                  <p className="text-body-secondary text-center mb-4">Create your account</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="username"
                      placeholder="Username"
                      autoComplete="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </CInputGroup>
                  {errors.username && <p className="text-danger">{errors.username}</p>}

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <CInputGroupText onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                      <CIcon icon={showPassword ? cilLowVision : cilLowVision} />
                    </CInputGroupText>
                  </CInputGroup>
                  {errors.password && <p className="text-danger">{errors.password}</p>}

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </CInputGroup>
                  {errors.email && <p className="text-danger">{errors.email}</p>}

                  <CInputGroup className="mb-3">
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
                      <option value="Admin">Admin</option>
                    </select>
                  </CInputGroup>

                  {/* <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCamera} />
                    </CInputGroupText>
                    <CFormInput type="file" name="profileImage" onChange={handleImageChange} />
                  </CInputGroup>

                  {selectedImage && (
                    <div className="text-center mb-3">
                      <img
                        src={selectedImage}
                        alt="Profile Preview"
                        style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                      />
                    </div>
                  )} */}
                  <CInputGroup className="mb-3">
                    <CFormInput
                      name="profileImage"
                      placeholder="Email"
                      value={formData.profileImage}
                      onChange={handleInputChange}
                    />
                  </CInputGroup>


                  <CRow className="mb-3">
                    <CCol xs={12}>
                      <CButton type="submit" className="w-100 text-white" style={{ backgroundColor: '#2a303d' }}>
                        Register
                      </CButton>
                    </CCol>
                    <CCol xs={12} className="text-center">
                      <CButton color="link" className="px-0" href="http://localhost:3000/#/login">
                        Already have an account!
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

export default Register;
