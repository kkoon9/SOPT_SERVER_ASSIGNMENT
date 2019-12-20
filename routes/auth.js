const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/middlewares');
const AuthController = require('../controllers/authController');

router.post('/join', isNotLoggedIn, AuthController.join);
router.post('/login', isNotLoggedIn, AuthController.login);
router.get('/logout', isLoggedIn, AuthController.logout);

module.exports = router;