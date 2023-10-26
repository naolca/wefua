const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const auth = require('../Controllers/authController');
// login user
router.post('/login', auth.signIn);
router.post('/register', auth.register);
router.post('/logout', auth.signOut);
router.get('/me',auth.checkSignInStatus,  userController.getUserById);
router.post('/delete', auth.checkSignInStatus, userController.deleteUserById);
router.post('/update', auth.checkSignInStatus, userController.updateUserById);



module.exports = router;
