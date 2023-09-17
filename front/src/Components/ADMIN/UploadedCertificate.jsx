import React ,{ useState,useEffect } from 'react'
import axios from "axios"
import './UploadedCertificate.css'
import image from "../../images/image1.png"

function UploadedCertificate() {
  const [certificates, setCertificates] = useState([]);
  const [firstshowModal, firstsetShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectReasonRequired, setRejectReasonRequired] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCertificateId, setSelectedCertificateId] = useState(null);

  const api= "http://localhost:3001";
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(`${api}/getUploadRequestsByStatusAndInstitution/All`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
      }
        ); // Replace with your API endpoint
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, []); // Empty dependency array to run the effect only once

  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  const firstopenModal = () => {
    firstsetShowModal(true);
  };

  // Function to close the modal
  const firstcloseModal = () => {
    firstsetShowModal(false);
  };

 

  const acceptCertificate = async (certificateId) => {
    try {
      // Make a PUT request to update the certificate status
      const response = await axios.put(
        `${api}/updateuploadCertificateStatusToVerified/${certificateId}`,
        {},
        {
          headers: {
            token: `Bearer ${token}`,
          },
      }
      );
      if (response.status === 200) {
        // If the request was successful (status code 200), refresh the page
        window.location.reload();
      }
    } catch (error) {
      console.error('Error accepting certificate:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const rejectCertificate = async (certificateId, reason) => {
    try {
      // Make a PUT request to update the certificate status with a reason
      const response = await axios.put(
        `${api}/updateuploadCertificateStatusToRejected/${certificateId}`,
        { reason }, // Pass the reason in the request body
        {
          headers: {
            token: `Bearer ${token}`,
          },
      }
      );
  
      if (response.status === 200) {
        // If the request was successful (status code 200), refresh the page
        window.location.reload();
      }
    } catch (error) {
      console.error('Error rejecting certificate:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  

  return (
    <>
        <div className='uploaded-certificate-container'>
          {certificates.map((certificate) => (
            <div className="uploaded-ceritificate-card" key={certificate._id}>
              <div className="uploadedimg-box">
                <img src={`${api}/certificateUploadPhoto/${certificate._id}/photo`} alt="Certificate" />
              </div>
              <div className="uploaded-content">
                <h3>{certificate.name}</h3>
                <div className="uploaded-list">
                  <li>
                    <strong>Requested By:</strong> {certificate.studentID.firstname}
                  </li>
                  <li>
                    <strong>Student email:</strong> {certificate.studentID.email}
                  </li>
                  <li>
                    <strong>Status:</strong> <span className={`status-${certificate.status}`}>{certificate.status}</span>
                  </li>
                </div>
                <button className='uploaded-first-button'  onClick={() => {
    setSelectedCertificateId(certificate._id);
    firstopenModal();
  }}>Accept</button>
                <button className='uploaded-second-button' onClick={() => {
    setSelectedCertificateId(certificate._id);
    openModal();
  }}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      {firstshowModal && (
        <div className="modal">
          <span className="close" title="Close Modal" onClick={firstcloseModal}>
            x
          </span>
          <form className="modal-content">
            <div className="container">
              <h1>Accept Certificate</h1>
              <p>Are you sure you want to accept this certificate?</p>

              <div className="clearfix">
                <button type="button" className="cancelbtn" onClick={firstcloseModal}>
                  Cancel
                </button>
                <button type="button" className="acceptbtn"   onClick={() => {
        if (selectedCertificateId) {
          acceptCertificate(selectedCertificateId);
        }
        firstcloseModal();
      }}>
                  Accept
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <span className="close" title="Close Modal" onClick={closeModal}>
            x
          </span>
          <form className="modal-content">
            <div className="container">
              <h1>Reject Certificate</h1>
              <p>Are you sure you want to reject this certificate?</p>
              <textarea placeholder='reason' className='reject-textarea'  value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}/>
{rejectReasonRequired && (
  <div className="error-message">The reason is required.</div>
)}
              <div className="clearfix">
                <button type="button" className="cancelbtn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" className="deletebtn"  onClick={() => {
              if (rejectReason) {
                rejectCertificate(selectedCertificateId, rejectReason);
                closeModal();
              }else {
                // Show the "reason is required" message
                setRejectReasonRequired(true);
              }
             
            }}>
                  Reject
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default UploadedCertificate