import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BsGrid1X2Fill,
  BsFillPlusSquareFill,
  BsFileEarmarkPlusFill,
  BsFileEarmarkText,
  BsFileEarmarkCheck,
  BsBoxArrowLeft,
  BsPeopleFill
} from 'react-icons/bs';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../tooltip/tooltip';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();
  const closeSidebar = () => {
    if (openSidebarToggle) {
      OpenSidebar();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');

    navigate('/');

  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src={logo} alt="" /> Zidyia
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
      <NavLink to="/superadmin" onClick={closeSidebar}>
        <li className='sidebar-list-item'>
          <Tooltip  margin={15} text="Dashboard">
            <BsGrid1X2Fill id='first-svg' className='icon' /> 
          </Tooltip>
        </li>   
        </NavLink>
        <NavLink to="/superadmin/CreateInstitutionForm" onClick={closeSidebar}>
        <li className='sidebar-list-item'>
        <Tooltip margin={15} text="Institution">
            <BsFillPlusSquareFill className='icon' /> 
            </Tooltip>
        </li>
        </NavLink>
        <NavLink to="/superadmin/CreateSubscription" onClick={closeSidebar}>
        <li className='sidebar-list-item'>
          <Tooltip margin={15} text="Subscription">
            <BsFileEarmarkPlusFill className='icon' /> 
          </Tooltip>
        </li>
        </NavLink>
        <NavLink to="/superadmin/RequestedCertificate" onClick={closeSidebar}>
        <li className='sidebar-list-item'>
          <Tooltip margin={15} text="Requests">
            <BsFileEarmarkText className='icon' />
            </Tooltip>
        </li>
        </NavLink>
        <NavLink to="/superadmin/UploadedCertificate" onClick={closeSidebar}>
        <li className='sidebar-list-item'>
        <Tooltip margin={15} text="Uploads">
            <BsFileEarmarkCheck className='icon' /> 
            </Tooltip>
        </li>
        </NavLink>
        <NavLink to="/superadmin/ViewAllUsers" onClick={closeSidebar}>
        <li className='sidebar-list-item'>
        <Tooltip margin={15} text="Users">
            <BsPeopleFill className='icon' /> 
            </Tooltip>
        </li>
        </NavLink>
        
        <li className='sidebar-list-item' onClick={handleLogout}>
        <Tooltip margin={15} text="Logout">
          <a href="" onClick={closeSidebar}>
            <BsBoxArrowLeft className='icon' /> 
          </a>
          </Tooltip>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
