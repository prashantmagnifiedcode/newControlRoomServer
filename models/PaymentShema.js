const mongoose = require("mongoose")
const paymentshema= new mongoose.Schema({
    razorpayDetails: {
        orderId: String,
        paymentId: String,
        signature: String,
      },
      success: Boolean,
})
const paymentmode= mongoose.model("payment",paymentshema)
module.exports=paymentmode