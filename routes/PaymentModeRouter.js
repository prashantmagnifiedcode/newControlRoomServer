const router = require("express").Router();
const {Order,Success} = require("../controller/PaymentController")
 router.post("/orders",Order)
 router.post("/success",Success)


module.exports= router