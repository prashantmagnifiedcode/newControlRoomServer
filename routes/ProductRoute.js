const router = require("express").Router();
const multer = require('multer')

const { v4: uuidv4 } = require('uuid')
const {ProductAdd,FetchUnApprovedProduct,UpdateProduct,DeleteProduct,ApprovedFilter,UserFilter, FetchallApprovedProduct} = require("../controller/ProductRouter")
const {isAdminAuthenticated } = require('../middleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var uploadsProduct = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post("/AddProduct",uploadsProduct.array("images", 2), ProductAdd);
router.get("/get/allUnApprovedProduct", FetchUnApprovedProduct);
router.get("/get/allApprovedProduct",  FetchallApprovedProduct);
router.patch("/edit/Status/Productitem", UpdateProduct);
router.delete("/DeleteProductitem/:id", DeleteProduct);
router.get("/get_product/processesApprovedData", ApprovedFilter);
router.get("/get_product/processes", UserFilter);


module.exports = router;









