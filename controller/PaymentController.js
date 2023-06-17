require('dotenv').config();

const Razorpay = require('razorpay');
const crypto = require('crypto');
const paymentshema = require("../models/PaymentShema")
module.exports={

  Order:async (req, res) => {
        try {
          const instance = new Razorpay({
            key_id: process.env.RAZOR_PAY_KEY, // YOUR RAZORPAY KEY
            key_secret: process.env.RAZOR_PAY_SECRET_KEY, // YOUR RAZORPAY SECRET
          });
          
          console.log("hi")
          const options = {
            amount: 50000,
            currency: 'INR',
            receipt: 'receipt_order_74394',
          };
          
      
          const order = await instance.orders.create(options);
      
          if (!order) return res.status(500).send('Some error occured');
           console.log(order)
          res.json(order);
      
      
        } catch (error) {
          res.status(500).send(error);
        }
      },
      
      Success: async (req, res) => {
        try {
          const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
          } = req.body;
      
          const shasum = crypto.createHmac('sha256', process.env.RAZOR_PAY_SECRET_KEY);
          shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
          const digest = shasum.digest('hex');
      
          if (digest !== razorpaySignature)
            return res.status(400).json({ msg: 'Transaction not legit!' });
      
          const newPayment = PaymentDetails({
            razorpayDetails: {
              orderId: razorpayOrderId,
              paymentId: razorpayPaymentId,
              signature: razorpaySignature,
            },
            success: true,
          });
      
          await paymentshema.save();
        console.log({ msg: 'success',
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,})
          res.json({
            msg: 'success',
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
          });
        } catch (error) {
          res.status(500).send(error);
        }
      }

}