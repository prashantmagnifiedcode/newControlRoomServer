const router = require("express").Router();
const Event = require("../models/Event");
const handleError = require("../utils/eventErrors")
const xlsx = require("xlsx");
const multer = require("multer");
const AdmZip = require("adm-zip");
const fs =require("fs")
const path= require("path")
router.get("/calendars", async(req, res)=>{

    const events = await Event.find({});
 
    try{
       
       res.status(200).json(events)

      
    }catch(err){
        handleError(err, res)
    }
});

router.get("/calendars/:id/show", async(req, res)=>{
    const id =   req.params.id
    const event = await Event.findById(id);
 
    try{
       res.status(200).json(event)

      
    }catch(err){
        handleError(err, res)
    }
});



router.post("/calendars", async(req, res)=>{
   
        const newEvent = await new Event(req.body)
     
        try{
           await newEvent.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
            })
        }catch(err){
            handleError(err, res)
        }
    }
)



router.put("/calendars/:id/update", async (req, res)=>{
    const id = req.params.id
    console.log("get",req.body)
     try{
        const event = await Event.findOne({_id : id})
        console.log("bssign",event)
        if(event){
            Object.assign(event, req.body);
            console.log("ssign",event)
             event.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
        })
    }   
        if(!event){
            res.status(404).json({error: "event is not found"})
        }
     }catch (err){
       console.log(err)
       handleError(err,res)
     }
 



//   const result = await Event.findOneAndUpdate(req.params.id,
//         {
//         $set: req.body,
//     }
//     , {new: true, runValidators: true}).clone()

//     try{
//         res.status(200).json(result)
//     }catch(err){
//         // res.status(500).json(Object.keys(result.errors)[0])
//         console.log(err)
//         res.status(400).json(err)
//     }
    // .then((docs, err)=>{
    //     if(docs){
    //         res.status(200).json(docs)
    //     }else{
    //         console.log(err.errors.path)
    //         handleError(err, res)
    //     }
    // })
})

router.delete("/calendars/:id/delete", async(req, res)=>{
    const id = req.params.id;
    try{
        console.log("delect")
        await Event.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    }catch(err){
        handleError(err, res)
    }

})
// const storage1 = multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, "../PartDekho-Frontend/public/products");
//     },
//     filename: (req, file, callback) => {
//       callback(null, file.originalname);
//     },
//   });
  
//   const upload1 = multer({
//     storage: storage1,
//     fileFilter: (req, file, cb) => {
  
//       if (
//         file.mimetype == "image/png" ||
//         file.mimetype == "image/jpg" ||
//         file.mimetype == "image/jpeg"
//       ) {
//         cb(null, true);
//       } else {
//         cb(null, false);
//         return cb(new Error(" Only .png, .jpg and .jpeg format allowed! "));
//       }
  
//     },
//   });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/product/xlsx", upload.single("xlsxfile"),
  async (req, res) => {
    try {
      const { createdBy } = req.body;
       console.log(req.body,"file",req.file)
      const workbook = xlsx.readFile(`public/${req.file.originalname}`);
      console.log("workbook",workbook)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      console.log("worksheet",worksheet)
    //   for (let cell in worksheet) {
    //     const cellAsString = cell.toString();
    //       console.log("cell",cellAsString)
    //   }
    //   const products = [];
    //   let product = {};
      for (let cell in worksheet) {
        const cellAsString = cell.toString();
        console.log(" cellAsString[1] ", cellAsString[1] )
        console.log(" cellAsString ", cellAsString)
        console.log(" cellAsString[0] ", cellAsString[0] )
        if (
          cellAsString[1] !== "r" &&cellAsString !== "m" &&
          cellAsString[1] > 1
        ) {
          if (cellAsString[0] === "A") {
            product.name = worksheet[cell].v;
            product.slug = lowerCaseSlug(worksheet[cell].v);
            product.createdBy = createdBy;
          }
          if (cellAsString[0] === "B") {
            product.originalPrice = worksheet[cell].v;
          }
          if (cellAsString[0] === "C") {
            product.quantity = worksheet[cell].v;
            product.originalquantity = worksheet[cell].v;
          }
          if (cellAsString[0] === "D") {
            product.gst = worksheet[cell].v;
            product.price = Math.round(
              parseInt(product.originalPrice) *
                (1 + parseInt(product.gst) / 100)
            );
          }
          if (cellAsString[0] === "E") {
            product.partNo = worksheet[cell].v;
          }
          if (cellAsString[0] === "F") {
            product.variant = worksheet[cell].v;
          }
          if (cellAsString[0] === "G") {
            product.fuelType = worksheet[cell].v;
          }
          if (cellAsString[0] === "H") {
            product.description = worksheet[cell].v;
          }
          if (cellAsString[0] === "I") {
            product.oem = worksheet[cell].v
              .toLowerCase()
              .trim()
              .replace(/\s+/g, " ");
            product.oem_slug = lowerCaseSlug(worksheet[cell].v);
          }
          if (cellAsString[0] === "J") {
            product.producttype = worksheet[cell].v;
          }
          if (cellAsString[0] === "K") {
            product.category = worksheet[cell].v
              .toLowerCase()
              .trim()
              .replace(/\s+/g, " ");
            product.category_slug = lowerCaseSlug(worksheet[cell].v);
          }
          if (cellAsString[0] === "L") {
            product.subcategory = worksheet[cell].v
              .toLowerCase()
              .trim()
              .replace(/\s+/g, " ");
            product.subcategory_slug = lowerCaseSlug(worksheet[cell].v);
          }
          if (cellAsString[0] === "M") {
            product.inside_ncr = worksheet[cell].v;
          }
          if (cellAsString[0] === "N") {
            product.outside_ncr = worksheet[cell].v;
          }
          if (cellAsString[0] === "O") {
            product.images = await Promise.all(
              worksheet[cell].v.split(",").map(async (file) => {
                const data = fs.readFileSync(`public/images/${file}`);
                const params = {
                  Bucket: "partdekho",
                  Key: `${shortid.generate()}${file}`,
                  ACL: "public-read",
                  Body: data,
                };
                const res = await s3.upload(params).promise();
                return { name: res.Location };
              })
            );
            products.push(product);
            product = {};
          }
        }
    }
    //   }
    //   const results = await Product.create(products);
    //   if (!results) {
    //     res
    //       .status(500)
    //       .send({ status: "failed", msg: "products not inserted" });
    //   }
    //   res
    //     .status(200)
    //     .send({ status: "success", msg: "products inserted successfully" });
   
} catch (err) {
    //   res.status(200).send({
    //     status: "failed",
        
    //   });
      console.log(err);
    }
  }

)

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload1 = multer({ storage: storage1 });
router.post("/product/imagezip",upload1.single("imagefile"),async(req,res)=>{
   const folderPath="../public/images/";
   try{
       /// reading directory syncronously
      fs.readdirSync(folderpath,(err,files)=>{
          if(err) throw errr;
           for(const file of files){
          if(file!=req.file.originalname){
              //reomving file which doesn't match within files in zip
              fs.unlinkSync(path.join('public/images'),(error)=>{
                  if(err) throw err;
              })
          }
             }
      })

  // console.log(req.file)
      // if(req.file){
      //     //provide the path name of file
      //     const zip= new AdmZip(`${folderpath}${req.file.originalname}`)
      //     await zip.extractAllTo(folderpath,true);

          
      // }
      // fs.readdirSync(folderPath, (err, files) => {

      //   if (err) throw err;
      //   console.log(files)
         
      //   for (const file of files) {
      //      console.log("file",file,req.file.originalname)
      //     if (file !== req.file.originalname) {
      //       fs.unlinkSync(path.join("public/images", file), (err) => {
      //         if (err) throw err;
      //       });
      //     }
      //   }


      // });
      if (req.file) {
        const zip = new AdmZip(`${folderPath}${req.file.originalname}`);
        await zip.extractAllTo(folderPath, true);

        fs.unlink(path.join(folderPath, req.file.originalname), (err) => {
          if (err) throw err;
        });

        res.status(200)
          .send({ status: "success", message: "zip file upload successfully" });
      } else {
        res
          .status(500)
          .send({ status: "failed", message: "error while uploading" });
      }


   }catch(e){console.log("err",e)}
     
})










module.exports = router