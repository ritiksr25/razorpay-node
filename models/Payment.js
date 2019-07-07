const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema(
	{
		amount: { type: Number },
		id: { type: String },
		orderId: { type: String },
		paymentId: { type: String },
		signature: { type: String }
	},
	{ timestamps: true }
)

module.exports = Payment = mongoose.model('Payment', PaymentSchema)
