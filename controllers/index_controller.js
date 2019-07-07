let { createOrder } = require('../config/paymentGateway');
require('dotenv').config();

module.exports.index = (req, res) => {
	res.render('index');
};

module.exports.order = async (req, res) => {
	let { amount, id } = req.body;
	if (!amount || !id) {
		res.redirect('/');
	}
	try {
		let order = await createOrder(amount, id);
		let data = {
			key: process.env.RZP_KEY_ID,
			amount,
			orderid: order.id
		};
		await Payment.create({ amount, id, orderId: order.id });
		res.render('confirm', { data });
	} catch (err) {
		console.log(err);
	}
};

module.exports.success = async (req, res) => {
	let {
		razorpay_payment_id,
		razorpay_order_id,
		razorpay_signature
	} = req.query;
	if (!razorpay_payment_id) {
        console.log(razorpay_order_id);
		res.redirect('/');
	} else {
		let order = await Payment.findOne({ orderId: razorpay_order_id });
		order.paymentId = razorpay_payment_id;
		order.signature = razorpay_signature;
		await order.save();
		res.render('success', { data: req.query });
	}
};

module.exports.all = async (req, res) => {
	let payments = await Payment.find().sort({ updatedAt: 'desc' });
	res.render('view', { payments });
};
