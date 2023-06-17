const router = require("express").Router();
const {Usertask} = require("../controller/UserController")
 router.get("/task",Usertask)



module.exports= router