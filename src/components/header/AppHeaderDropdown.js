import React, { useState } from 'react';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CAvatar,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react';
import { cilUser, cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../alert/Alert';
import Profile from '../../views/pages/profile/Profile'; // Update this path

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const handleLogOut = () => {
    Alert('Log Out', 'Are you sure you want to log out?', 'warning')
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          navigate('/home');
        }
      });
  };

  const toggleProfileModal = () => {
    setIsProfileModalVisible(!isProfileModalVisible);
  };

  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src="path-to-your-avatar" size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem onClick={toggleProfileModal}>
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem onClick={handleLogOut}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>

      {/* Profile Modal */}
      <CModal visible={isProfileModalVisible} onClose={toggleProfileModal} size="lg">
        <CModalHeader onClose={toggleProfileModal}>Profile</CModalHeader>
        <CModalBody>
          <Profile /> {/* Render the Profile component inside the modal */}
        </CModalBody>
      </CModal>

    </>
  );
};

export default AppHeaderDropdown;
