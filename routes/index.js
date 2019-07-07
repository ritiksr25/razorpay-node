const express = require('express')
const router = express.Router()

//load controller file
const {
	index,
	order,
	success,
	all
} = require('../controllers/index_controller')

// index route
router.get('/', index)
// confirm and create rzp order
router.post('/rzp-order', order)
// success redirect show payment id
router.get('/payment-success', success)
// view all transactions
router.get('/all', all)
//export router
module.exports = router
