// Header.jsx

import React, { useEffect, useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle,  BsJustify } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

function Header({ OpenSidebar, onStatusChange }) {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const location = useLocation();
  const isRequestedUploadedCertificateRoute = location.pathname === '/superadmin/RequestedCertificate' || location.pathname === '/superadmin/UploadedCertificate';
  const isRequestedRoute = location.pathname  === '/superadmin/RequestedCertificate';
  const iseUploadedRoute = location.pathname === '/superadmin/UploadedCertificate';
  const isHeaderRoute = location.pathname === '/superadmin';
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    // Call the callback function to pass the selected status
    onStatusChange(event.target.value);
  };

  return (
    <header className="header-super">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      {isRequestedRoute && (<h2 style={{color:'#5DD3B3',fontFamily:'Core-Heavy'}}>Requested Certificate</h2>)}
      {iseUploadedRoute && (<h2 style={{color:'#5DD3B3',fontFamily:'Core-Heavy'}}>Uploaded Certificate</h2>)}
      {isHeaderRoute && (<h2 style={{color:'#5DD3B3',fontFamily:'Core-Heavy'}}>Super Admin Dashboard</h2>)}

      <div className="header-left">
        {isRequestedUploadedCertificateRoute && (
          <>
              <select name="" id="" value={selectedStatus} onChange={handleStatusChange}>
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              
            
          </>
        )}
      </div>
      
    </header>
  );
}

export default Header;
