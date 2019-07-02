const express = require('express');
const router = express.Router();

//load controller file
const { index, order, success } = require('../controllers/index_controller');

//index route
router.get('/', index);

router.post('/rzp-order', order);

router.get('/payment-success', success);

//export router
module.exports = router;