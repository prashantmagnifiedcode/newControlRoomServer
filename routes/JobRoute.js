const router = require("express").Router();
const {Apply } = require("../controller/JobRouter");
const multer = require("multer");
const path = require('path');
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Resume/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var  upload= multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf" ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf format allowed!'));
        }
    }
});

router.post("/apply",upload.single('resume'), Apply);


module.exports = router;
