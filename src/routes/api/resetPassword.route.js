const express = require('express');
import { requestReset, processReset } from '../../controllers/resetPasswordController';

const router = express.Router();

// Handle password reset request
router.post('/requestReset', requestReset);

// Handle password reset form submission
router.post('/resetpassword/:token', processReset);

module.exports = router;
