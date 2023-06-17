const JobSchema =require("../models/jobSchema")
const createError = require("http-errors");
const fs = require('fs')

module.exports={
    Apply:async(req,res,next)=>{
        try {
            console.log("reum",req.body)
            console.log("reum",req.file)
            const{name,email,id}=req.body;
            const{path,originalname}=req.file;

            // const result = await JobSchema.validateAsync(req.body);
            const doesExits = await JobSchema.findOne({id});
            if (doesExits){
                  
                                
                fs.unlink(path, (err) => {
                  if (err) {
                    console.error(err)
                    return
                  }
                  console.log("removed")
                 
                  //file removed
                })
                res.status(403).send({msg:"You already Applied"});
            next()
            }



            const resumedata= new JobSchema({name,email,id,ResumePath:path,ResumeName:originalname})
            const done= await resumedata.save()
         
            if (!done) throw createError(404, "Application not Applied");
            res.status(200).send({msg:"Applied Successfully",record:resumedata});
         

        }catch(e){
            console.log("erro",e)
            res.status(400).send()
        }
    }
}