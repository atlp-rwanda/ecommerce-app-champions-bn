const express = require('express');
import { requestReset } from '../../controllers/resetPasswordController';

const router = express.Router();

// Handle password reset request
router.post('/requestReset', requestReset);

// Handle password reset form submission
// router.post('/reset-password/:token', processReset);

module.exports = router;
