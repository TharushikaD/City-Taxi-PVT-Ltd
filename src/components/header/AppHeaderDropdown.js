import React from 'react';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CAvatar,
} from '@coreui/react';
import { cilUser, cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../alert/Alert';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    Alert('Log Out', 'Are you sure you want to log out?', 'warning')
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          
          navigate('/home');
        }
      });
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src="path-to-your-avatar" size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => navigate('/profile')}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem onClick={handleLogOut}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
