const express = require("express");
const app = express();
require("./helper/init_mongodb.js")
const eventRoute = require("./routes/eventRoute")
const adminRoute = require("./routes/adminRoute")
const ProductRoute= require('./routes/ProductRoute')
const PaymentModeRouter= require('./routes/PaymentModeRouter')
const Mynotes=require('./routes/MynoteRouter.js')
const Usertask=require('./routes/UserRouter.js')
const ApplyRoute=require('./routes/JobRoute.js')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");


app.use(express.json({limit: '50mb'}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  })) 
  app.use(cookieParser());
app.use("/api/events", eventRoute)
app.use("/api/auth/admin", adminRoute);
app.use("/api", ProductRoute);
app.use("/api/paymentmode/Razorpay", PaymentModeRouter);
app.use("/api/Register/",Mynotes)
app.use("/api/Assigned/",Usertask)
app.use("/api/job/",ApplyRoute)
// http://localhost:3000/api/paymentmode/Razorpay/orders
app.listen(process.env.PORT||5000, _=> console.log("backend server is running on port: "+ process.env.PORT))


