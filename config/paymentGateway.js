const razorpay = require('razorpay');

let rzp = new razorpay({
    key_id: 'rzp_test_5cYHgNa8c7IUBg',
    key_secret: 'Fmll8ETi6fVvM08E5Cn0LFd4'
});

module.exports.createOrder = async (amt, id) => {
    let options = {
    // amount in pase
    amount: amt,
    currency: "INR",
    receipt: id,
    payment_capture: '1',
    notes: {
        message: `Payment for order id ${id} at Angrybaaz.`
    }
  };
  try{
    let order = await rzp.orders.create(options);
    return order;
  }
  catch(err){
    return err;
  }
}