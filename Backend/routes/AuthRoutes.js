const {Router} = require('express');
const {registerUser,upload, loginUser,forgot,reset,updateProfile,verifyEmail} = require('../controllers/AuthController');
const { verify } = require('jsonwebtoken');



const router = Router();

router.post('/register', upload.fields([{ name: 'profilePicture' }, { name: 'ID' }]), registerUser);
router.post('/login', loginUser);
router.post('/forgot-password',forgot);
router.post('/reset-password/:id/:token',reset);
router.put('/updateProfile/:id',upload.single('profilePicture'),verify,updateProfile);
router.get('/users/:id/verify/:token',verifyEmail)

module.exports = router;