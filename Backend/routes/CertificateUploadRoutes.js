const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer
const CertificateUploadController = require('../controllers/CertificateUploadController');
const verify = require('../Controllers/verifytoken');
const {upload} = require('../controllers/CertificateUploadController');


// Create a new certificate upload
router.post('/certificateUploadRoute/:institutionID', verify, upload.single('certificateFile'), CertificateUploadController.createCertificateUpload);

// Get a list of all certificate uploads
router.get('/certificateUploadRoute',verify, CertificateUploadController.getCertificateUploadsByInstitution);

router.get('/certificateUploadRoute/count',verify, CertificateUploadController.getCertificateUploadsByInstitutionCount);

router.get('/certificateUploadRoute/totalcount',verify, CertificateUploadController.getCertificateUploadsTotal);

// Get a single certificate upload by ID
router.get('/certificateUploadRoute/:id', CertificateUploadController.getCertificateUploadById);

// Update a certificate upload by ID
router.put('/certificateUploadRoute/:id', CertificateUploadController.updateCertificateUploadById);

// Delete a certificate upload by ID
router.delete('/certificateUploadRoute/:id', CertificateUploadController.deleteCertificateUploadById);

//Get certificate Upload Photo
router.get("/certificateUploadPhoto/:certificateUploadID/photo", CertificateUploadController.getCertificateUploadPhoto);


module.exports = router;
