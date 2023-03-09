const express = require('express');
const router = express.Router();
const {register, verifyEmail} = require('../controllers/userController');

router.post('/', register);
router.get('/verify/:id/:token', verifyEmail);

module.exports = router;