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
import { cilUser, cilLockLocked } from '@coreui/icons';
import instance from '../../../components/service/Service';
import './style.css'

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const fetchUserData = async () => {
      try {
        const response = await instance.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('User data response:', response.data);

        const { name, email, contact } = response.data;

        setProfileData({
          name: name || '',
          email: email || '',
          contact: contact || '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (profileData.password !== profileData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      await instance.put(`/users/${userId}`, {
        name: profileData.name,
        email: profileData.email,
        contact: profileData.contact,
        password: profileData.password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="pro">
      <CCard className="profile-form">
        <CCardBody>
          <h3 className="text-center mb-4">Update Profile</h3>
          <h5 className="text-center mb-4">{`Hello, ${profileData.name || 'User'}`}</h5>
          <CForm onSubmit={handleSubmit}>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
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
              <CInputGroupText>📞</CInputGroupText>
              <CFormInput
                type="text"
                name="contact"
                value={profileData.contact}
                onChange={handleInputChange}
                placeholder="Contact Number"
                required
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </CInputGroup>

            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                name="confirmPassword"
                value={profileData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
              />
            </CInputGroup>

            {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}

            <CButton type="submit" color="primary" className="w-100">
              Update Profile
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>

  );
};

export default Profile;
