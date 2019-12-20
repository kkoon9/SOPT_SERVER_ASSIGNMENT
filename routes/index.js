const express = require('express');
const router = express.Router();

router.use('/groups', require('./groups'));
router.use('/auth', require('./auth'));
router.use('/blogs', require('./blogs'));
module.exports = router;