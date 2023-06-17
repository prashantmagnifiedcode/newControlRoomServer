const router = require("express").Router();

const {
  
  login,
  getAdmin,
  logout,
  getAllUser
} = require("../controller/adminRouter");
const {ProductAdd,FetchProduct} = require("../controller/ProductRouter")
const {isAdminAuthenticated } = require('../middleware')

router.post("/login", login);

router.get("/user",isAdminAuthenticated, getAdmin);

router.delete("/logout", logout);
router.get("/getAllUser", getAllUser);
// router.post("/AddProduct",ProductAdd);


module.exports = router;
