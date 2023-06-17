const moment = require("moment");
const mongoose = require("mongoose");


const JobSchema = new mongoose.Schema({
     name:{
        type:String,
        required: [true, "Pls fill name" ],
        
     },
     ResumePath:{
        type:String,
        required: [true, "Pls fill resume" ],
        
     },
     ResumeName:{
        type:String,
        required: [true, "Pls fill resume" ],
        
     },
     email:{
        type:String,
        required: [true, "Pls fill email" ],
        
     },
     id:{
        type:String,
        required: [true, "id not provided" ],
        
     },
})


module.exports = mongoose.model("JobApplication", JobSchema)