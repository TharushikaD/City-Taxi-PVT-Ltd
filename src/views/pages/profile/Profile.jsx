import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilPhone } from '@coreui/icons';
import './style.css';
import instance from '../../../components/service/Service';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName') || '';
    const storedProfileData = JSON.parse(localStorage.getItem('profileData')) || {};

    setUserName(storedUserName);
    setProfileData({
      username: storedProfileData.username || '',
      email: storedProfileData.email || '',
      contact: storedProfileData.contact || '',
      password: '',
      confirmPassword: '',
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');
    const { username, email, contact, password, confirmPassword } = profileData;

    if (password && password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await instance.put(`/users/${userId}`,
        {
          username,
          email,
          contact,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully!");
        setErrorMessage('');
        localStorage.setItem('profileData', JSON.stringify({ username, email, contact }));
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the profile.");
      console.error(error);
    }
  };

  return (
    <div className='pro'>
      <CCard className="profile-form shadow-lg">
        <CCardBody>
          <h5 className="text-center mb-4">{`Hello, ${userName || 'User'}`}</h5>
          <h3 className="text-center mb-4">Update Profile</h3>
          {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
          {successMessage && <CAlert color="success">{successMessage}</CAlert>}

          <CForm onSubmit={handleSubmit}>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                placeholder="Username"
                required
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilPhone} />
              </CInputGroupText>
              <CFormInput
                type="text"
                name="contact"
                value={profileData.contact}
                onChange={handleInputChange}
                placeholder="Contact Number"
                required
              />
            </CInputGroup>

            <CButton type="submit" color="primary" className="w-100 rounded-pill">
              Update Profile
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Profile;
