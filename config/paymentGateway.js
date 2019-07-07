const razorpay = require('razorpay');
require('dotenv').config();

let rzp = new razorpay({
	key_id: process.env.RZP_KEY_ID,
	key_secret: process.env.RZP_KEY_SECRET
});

module.exports.createOrder = async (amt, id) => {
	let options = {
		// amount in paise
		amount: amt * 100,
		currency: 'INR',
		receipt: id,
		payment_capture: '1',
		notes: {
			message: `Payment for order id ${id}.`
		}
  }
	try {
    let orders = await rzp.orders.all({ receipt: id });
    if (orders.items.length === 0) {
        let order = await rzp.orders.create(options);
        return order;
    }
    else {
        return orders.items[0];
    }
}
catch (err) {
    return err;
}
}
