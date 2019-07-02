let { createOrder } = require('../config/paymentGateway');

module.exports.index = (req, res) => {
    res.render('index');
}

module.exports.order = async (req, res) => {
    let { amount, id } = req.body;
    let order = await createOrder(amount, id);
    console.log(order);
    let data = {
        key: 'rzp_test_5cYHgNa8c7IUBg',
        amount: order.amount,
        orderid: order.id
    } 
    console.log(data);
    res.render('confirm', { data });
}

module.exports.success = (req, res) => {
    let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.query;
    console.log(req.query);
    res.send(req.query);
}